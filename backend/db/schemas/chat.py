from pydantic import BaseModel
from typing import List, Optional

class ChatInteraccionSchema(BaseModel):
    mensaje_client: str
    respuesta_chatbot: str

class ChatSchema(BaseModel):
    id: int
    client_id: int
    interacciones: List[ChatInteraccionSchema] = []

    class Config:
        orm_mode = True

class ChatCreateSchema(BaseModel):
    client_id: int
    mensaje_client: str