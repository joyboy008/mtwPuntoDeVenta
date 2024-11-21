import openai
from utils.constants import OPENAI_API_KEY
from sqlalchemy.orm import Session
from db.models.Chat import Chat, ChatInteraccion

openai_api_key = OPENAI_API_KEY

def crear_nuevo_chat(chat, db):
    nuevo_chat = Chat(client_id=chat.client_id)
    db.add(nuevo_chat)
    db.commit()
    db.refresh(nuevo_chat)
    return nuevo_chat

def respuesta(client_input):
    personalidad = (
            "Eres un asistente personal experto en el primer tema que se te mencione, con sentido del humor "
            "pero sin iniciar bromas. No menciones que eres un bot y trata de dar a entender que eres humano."
        )
    messages = [
            {"role": "system", "content": personalidad},
            {"role": "user", "content": client_input}
        ]
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=messages,
        api_key=openai_api_key
    )
    respuesta_generada = response.choices[0].message['content'].strip()
    return respuesta_generada

def newInteraccion(id, message_client, response_chatbot):
    return ChatInteraccion(
        chat_id=id,
        mensaje_client=message_client,
        respuesta_chatbot=response_chatbot
    )

def conversar(ingreso_usuario, preguntas_anteriores, respuestas_anteriores):
        conversacion_historica = ""
        for preg, resp in zip(preguntas_anteriores, respuestas_anteriores):
            conversacion_historica += f"Usuario: {preg}\n"
            conversacion_historica += f"Asistente: {resp}\n"

        pregunta = f"Usuario: {ingreso_usuario}\n"
        conversacion_historica += pregunta
        respuesta_gpt = respuesta(conversacion_historica)

        return respuesta_gpt

def messages_client_chatbot(chat_id: int, db: Session):
    # Consulta los campos `mensaje_usuario` y `mensaje_chatbot` de las interacciones con el `chat_id` especificado
    interacciones = db.query(ChatInteraccion.mensaje_client, ChatInteraccion.respuesta_chatbot).filter(ChatInteraccion.chat_id == chat_id).all()
    
    # Extrae el contenido de `mensaje_usuario` y `mensaje_chatbot`
    mensajes_usuario = [interaccion[0] for interaccion in interacciones]
    mensajes_chatbot = [interaccion[1] for interaccion in interacciones]
    
    return mensajes_usuario, mensajes_chatbot