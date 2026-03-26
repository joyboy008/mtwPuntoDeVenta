from typing import Optional

from pydantic import BaseModel
 
 
class UserBase(BaseModel):
    name: str
    username: str
    role: str = "admin"
 
 
class UserCreate(UserBase):
    password: str
 
 
class UserUpdate(BaseModel):
    id: int
    name: str
    username: str
    role: str
    password: Optional[str] = None
    is_active: bool | None = None
 
 
class UserResponse(UserBase):
    id: int
    is_active: bool
 
    model_config = {"from_attributes": True}