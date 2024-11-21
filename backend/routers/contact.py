from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from db.crud import create_contact
from db.schemas.contact import ContactCreate, Contact

router = APIRouter(
    prefix="/contact", tags=["Contacto"], responses={404: {"Message": "No Encontrado"}}
)

@router.post("/", response_model=Contact,
             )
def add_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    return create_contact(db=db, contact=contact)