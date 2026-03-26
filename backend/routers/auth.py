from datetime import datetime, timedelta

import jwt
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.crud import get_user_by_username
from db.database import get_db
from utils.auth import Credentials, Hasher
from utils.constants import JWT_ALGORITHM, JWT_SECRET

router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)

TOKEN_EXPIRATION_MINUTES = 180


def _build_token(user_id: int) -> str:
    expiration = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRATION_MINUTES)
    payload = {"user_id": str(user_id), "exp": expiration}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


@router.post("/login")
def login(credentials: Credentials, db: Session = Depends(get_db)) -> dict:
    user = get_user_by_username(db, credentials.username)

    if not user:
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos")

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Usuario inactivo")

    if not Hasher.verify_password(credentials.password, user.password):
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos")

    return {
        "id": user.id,
        "username": user.username,
        "role": user.role,
        "token": _build_token(user.id),
    }