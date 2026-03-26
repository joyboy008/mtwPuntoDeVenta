from datetime import datetime

from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactResponse(ContactCreate):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}