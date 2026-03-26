from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from db.models.User import User
from utils.auth import JWTValidator

def get_current_user(
    token: str = Depends(JWTValidator()),
    db: Session = Depends(get_db),
) -> User:

    payload = JWTValidator.decode_token(token)

    user_id = payload.get("user_id")

    if not user_id:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")

    if not user.is_active:
        raise HTTPException(status_code=403, detail="Usuario inactivo")

    return user