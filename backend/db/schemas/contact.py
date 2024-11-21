from pydantic import BaseModel

class ContactBase(BaseModel):
    name: str
    email: str
    message: str

class Contact(ContactBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True

class ContactCreate(ContactBase):
    pass


class ContactPut(BaseModel):
    name: str
    email: str 
    message: str
