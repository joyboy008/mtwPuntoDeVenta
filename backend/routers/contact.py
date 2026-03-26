from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from db.crud import create_contact, get_all_contacts
from db.database import get_db
from db.schemas.contact import ContactCreate, ContactResponse
from utils.auth import JWTValidator

router = APIRouter(
    prefix="/contact",
    tags=["Contacto"],
)


@router.post("/", response_model=ContactResponse, status_code=201)
def send_message(payload: ContactCreate, db: Session = Depends(get_db)):
    return create_contact(db, payload)


@router.get(
    "/",
    response_model=list[ContactResponse],
    dependencies=[Depends(JWTValidator())],
)
def list_messages(db: Session = Depends(get_db)):
    return get_all_contacts(db)