from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    name: str
    username: str
    password: str 
    role: str
    image: str
    cash_register: float

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
        from_attributes = True

class UserCreate(UserBase):
    pass


class UsuarioPut(BaseModel):
    name: str
    username: str
    password: str 
    role: str
    image: str
    cash_register: float
    is_active: Optional[bool]

