from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import Base, engine
from db.models import Appointment, Contact, Quotation, QuotationItem, User
from routers import appointments, auth, contact, quotations, users, servicecatalog

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kathy Nails API",
    description="Sistema de citas y cotizaciones para Kathy Nails",
    version="1.0.0",
)

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://mtw.mralda.net",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(appointments.router)
app.include_router(quotations.router)
app.include_router(servicecatalog.router)
app.include_router(contact.router)


@app.get("/health", tags=["Health"])
def health_check() -> dict:
    return {"status": "ok"}