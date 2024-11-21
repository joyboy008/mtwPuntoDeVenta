import time
from fastapi.exceptions import HTTPException
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.models.User import User  # Asegúrate de que estás importando tu modelo SQLAlchemy
from utils.constants import JWT_ALGORITHM, JWT_SECRET
from utils.auth import Hasher, Credentials
from db.database import get_db 
import jwt

router = APIRouter(
    prefix="/auth", tags=["Auth"], responses={404: {"message": "Not Found"}}
)

@router.post("/login")
async def login(credenciales: Credentials, db: Session = Depends(get_db)) -> dict:
    # Obtener y validar el usuario
    usuario_guardado = db.query(User).filter(User.username == credenciales.username).first()
    if not usuario_guardado:
        raise HTTPException(status_code=400, detail="Usuario o password incorrecto")
    
    if usuario_guardado.is_active == False:
        raise HTTPException(status_code=400, detail="Usuario inactivo")

    # Verificar la contraseña
    password_valido = Hasher.verify_password(credenciales.password, usuario_guardado.password)
    if not password_valido:
        raise HTTPException(status_code=400, detail="Usuario o password incorrecto")

    # Generar el JWT token
    payload = {"user_id": str(usuario_guardado.id), "expires": time.time() + 600}
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return {
        "id": usuario_guardado.id,
        "username": usuario_guardado.username,
        "password": usuario_guardado.password,
        "role": usuario_guardado.role,
        "token": token,
    }