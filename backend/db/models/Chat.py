from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base

class Chat(Base):
    __tablename__ = 'chats'
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey('clients.id'))
    interacciones = relationship('ChatInteraccion', back_populates='chat')

class ChatInteraccion(Base):
    __tablename__ = 'chat_interacciones'
    
    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey('chats.id'))
    mensaje_client = Column(String)
    respuesta_chatbot = Column(String)

    chat = relationship('Chat', back_populates='interacciones')
