from pydantic import BaseModel, EmailStr
from typing import Optional

class ClientBase(BaseModel):
    name: str
    nit: str
    address: str
    phone: str
    email: EmailStr

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
        from_attributes = True


class ClientPut(BaseModel):
    name: str
    nit: str
    address: str
    phone: str
    email: EmailStr
    is_active: Optional[bool]
