from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.crud import (
    create_quotation,
    get_appointment_by_id,
    get_quotation_by_appointment,
    get_quotation_by_id,
    update_quotation,
)
from db.database import get_db
from db.models.Appointment import Appointment, AppointmentStatus
from db.models.Quotation import Quotation
from db.schemas.quotation import QuotationCreate, QuotationResponse
from utils.auth import JWTValidator

router = APIRouter(
    prefix="/quotations",
    tags=["Cotizaciones"],
    dependencies=[Depends(JWTValidator())],
)

STATUSES_ALLOWED_FOR_QUOTATION = {
    AppointmentStatus.AGENDADA,
    AppointmentStatus.EN_PROCESO,
}


def _get_quotation_or_404(db: Session, quotation_id: int) -> Quotation:
    quotation = get_quotation_by_id(db, quotation_id)
    if not quotation:
        raise HTTPException(status_code=404, detail="Cotización no encontrada")
    return quotation


def _get_appointment_or_404(db: Session, appointment_id: int) -> Appointment:
    appointment = get_appointment_by_id(db, appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    return appointment


def _validate_appointment_allows_quotation(appointment: Appointment) -> None:
    if appointment.status not in STATUSES_ALLOWED_FOR_QUOTATION:
        raise HTTPException(
            status_code=400,
            detail="Solo se puede cotizar una cita agendada o en proceso",
        )


@router.get("/{quotation_id}", response_model=QuotationResponse)
def get_quotation(quotation_id: int, db: Session = Depends(get_db)):
    return _get_quotation_or_404(db, quotation_id)


@router.get("/appointment/{appointment_id}", response_model=QuotationResponse)
def get_quotation_by_appointment_id(
    appointment_id: int, db: Session = Depends(get_db)
):
    quotation = get_quotation_by_appointment(db, appointment_id)
    if not quotation:
        raise HTTPException(
            status_code=404, detail="Esta cita aún no tiene cotización"
        )
    return quotation


@router.post("/", response_model=QuotationResponse, status_code=201)
def create_new_quotation(payload: QuotationCreate, db: Session = Depends(get_db)):
    appointment = _get_appointment_or_404(db, payload.appointment_id)
    _validate_appointment_allows_quotation(appointment)

    existing = get_quotation_by_appointment(db, payload.appointment_id)
    if existing:
        raise HTTPException(
            status_code=400, detail="Esta cita ya tiene una cotización"
        )

    return create_quotation(db, payload)


@router.put("/{quotation_id}", response_model=QuotationResponse)
def edit_quotation(
    quotation_id: int, payload: QuotationCreate, db: Session = Depends(get_db)
):
    quotation = _get_quotation_or_404(db, quotation_id)
    appointment = _get_appointment_or_404(db, quotation.appointment_id)
    _validate_appointment_allows_quotation(appointment)

    return update_quotation(db, quotation, payload)