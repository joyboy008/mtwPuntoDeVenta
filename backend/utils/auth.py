from fastapi import Request, HTTPException
from pydantic import BaseModel
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from utils.constants import JWT_SECRET, JWT_ALGORITHM
from passlib.context import CryptContext
import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class Hasher:
    @staticmethod
    def verify_password(password, hashed_password):
        return pwd_context.verify(password, hashed_password)

    @staticmethod
    def get_password_hash(password):
        return pwd_context.hash(password)


class Credentials(BaseModel):
    username: str
    password: str


class JWTValidator(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTValidator, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(
            JWTValidator, self
        ).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="No tiene el esquema correcto"
                )
            if not self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Token invalido")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Credenciales sin enviar")

    def verify_jwt(self, jwtoken: str) -> bool:
        token_valido = False
        try:
            payload = jwt.decode(jwtoken, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="El token ha expirado")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="El token no es válido")
        if payload:
            token_valido = True

        return token_valido
