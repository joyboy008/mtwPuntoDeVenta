from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.models.Chat import Chat, ChatInteraccion
from db.schemas.chat import ChatSchema, ChatCreateSchema
from utils.chatbot import crear_nuevo_chat, respuesta, newInteraccion, conversar, messages_client_chatbot
from db.database import get_db

router = APIRouter(
    prefix="/chat", tags=["ChatBot"], responses={404: {"mensaje": "No Encontrado"}}
)

@router.post("/", response_model=ChatSchema)
def crear_chat(chat: ChatCreateSchema, db: Session = Depends(get_db)):
    nuevo_chat = crear_nuevo_chat(chat=chat, db=db)
    response = respuesta(chat.mensaje_client)
    interaccion = newInteraccion(nuevo_chat.id, chat.mensaje_client, response)

    db.add(interaccion)
    db.commit()
    db.refresh(interaccion)
    
    return nuevo_chat

@router.get("/{chat_id}", response_model=ChatSchema)
def obtener_chat(chat_id: int, db: Session = Depends(get_db)):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if chat is None:
        raise HTTPException(status_code=404, detail="Chat no encontrado")
    return chat


@router.post("/{chat_id}/interacciones/")
async def agregar_interaccion(chat_id: int, client_input:str, db: Session = Depends(get_db)):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat no encontrado")
    
    messages_client, messages_chatbot = messages_client_chatbot(chat_id, db)
    response_chatbot = conversar(client_input, messages_client, messages_chatbot)
    nueva_interaccion = newInteraccion(chat_id, client_input, response_chatbot)
    
    db.add(nueva_interaccion)
    db.commit()
    db.refresh(nueva_interaccion)

    return nueva_interaccion


@router.get("/{chat_id}/interacciones/")
async def obtener_interacciones(chat_id: int, db: Session = Depends(get_db)):
    chat_interacciones = db.query(ChatInteraccion).filter(ChatInteraccion.chat_id == chat_id).all()
    if chat_interacciones is None:
        raise HTTPException(status_code=404, detail="Chat no encontrado")
    return chat_interacciones
