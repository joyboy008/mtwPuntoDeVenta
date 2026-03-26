from datetime import date
from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from db.crud import (
    create_appointment,
    get_all_appointments,
    get_appointment_by_id,
    get_appointments_by_status,
    get_appointments_for_date,
    soft_delete_appointment,
    update_appointment,
    update_appointment_status,
)
from db.database import get_db
from db.models.Appointment import Appointment, AppointmentStatus
from db.schemas.appointment import (
    AppointmentCreate,
    AppointmentResponse,
    AppointmentUpdateStatus,
    AppointmentResponseByDate
)
from utils.auth import JWTValidator
from utils.get_current_user import get_current_user
from db.models.User import User

router = APIRouter(
    prefix="/appointments",
    tags=["Citas"],
    dependencies=[Depends(JWTValidator())],
)

STATUSES_ALLOWED_FOR_QUOTATION = {
    AppointmentStatus.AGENDADA,
    AppointmentStatus.EN_PROCESO,
}

STATUSES_ALLOWED_FOR_DELETION = {
    AppointmentStatus.AGENDADA,
    AppointmentStatus.CANCELADA,
}


def _get_appointment_or_404(db: Session, appointment_id: int) -> Appointment:
    appointment = get_appointment_by_id(db, appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    return appointment


@router.get("/", response_model=list[AppointmentResponse])
def list_appointments(
    status: List[AppointmentStatus] = Query(None),
    db: Session = Depends(get_db),
):
    if status:
        return get_appointments_by_status(db, status)
    return get_all_appointments(db)


@router.get("/by-date", response_model=list[AppointmentResponseByDate])
def get_appointments_by_date(
    date: Annotated[date, Query()],
    db: Session = Depends(get_db)
):
    return get_appointments_for_date(db, date)


@router.get("/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    return _get_appointment_or_404(db, appointment_id)


@router.post("/", response_model=AppointmentResponse, status_code=201)
def create_new_appointment(
    payload: AppointmentCreate, db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_appointment(db, payload, current_user.id)


@router.patch("/{appointment_id}/status", response_model=AppointmentResponse)
def change_appointment_status(
    appointment_id: int,
    payload: AppointmentUpdateStatus,
    db: Session = Depends(get_db),
):
    appointment = _get_appointment_or_404(db, appointment_id)
    return update_appointment_status(db, appointment, payload)

@router.put("/{appointment_id}", response_model=AppointmentResponse)
def edit_appointment(
    appointment_id: int,
    payload: AppointmentCreate,
    db: Session = Depends(get_db),
):
    appointment = _get_appointment_or_404(db, appointment_id)

    if appointment.status in {AppointmentStatus.FINALIZADA, AppointmentStatus.CANCELADA}:
        raise HTTPException(
            status_code=400,
            detail="No se puede editar una cita finalizada o cancelada",
        )

    return update_appointment(db, appointment, payload)


@router.delete("/{appointment_id}", status_code=204)
def remove_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = _get_appointment_or_404(db, appointment_id)

    if appointment.status not in STATUSES_ALLOWED_FOR_DELETION:
        raise HTTPException(
            status_code=400,
            detail="Solo se pueden eliminar citas agendadas o canceladas",
        )

    soft_delete_appointment(db, appointment)