from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base, get_db
from routers import inventory, users, auth, clients, sales, chat, contact


# pip install "fastapi[all]"
# este comando es para instalar todas las dependencias

# Iniciar el Server: uvicorn main:app --reload
# Detener el server: ctrl+c

# Url local: http://127.0.0.1:8000

Base.metadata.create_all(bind=engine)

app = FastAPI()
# origins = ["https://mtw.marlonralda.dev", "http://mtw.marlonralda.dev"]
origins = ["http://localhost:3000", "https://mtw.marlonralda.dev", "http://mtw.marlonralda.dev"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(sales.router)
app.include_router(clients.router)
app.include_router(inventory.router)
app.include_router(contact.router)
app.include_router(users.router)  


@app.on_event("startup")
def startup_event():
    get_db()