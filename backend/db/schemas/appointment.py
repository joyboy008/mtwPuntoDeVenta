from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from db.models.Appointment import AppointmentStatus


class AppointmentCreate(BaseModel):
    client_name: str
    client_phone: str
    client_advance: float
    reason: str
    scheduled_at: datetime


class AppointmentUpdateStatus(BaseModel):
    status: AppointmentStatus


class AppointmentResponse(BaseModel):
    id: int
    client_name: str
    client_phone: str
    client_advance: Optional[float] = None
    reason: str
    status: AppointmentStatus
    scheduled_at: datetime
    created_at: datetime
    created_by: int

    model_config = {"from_attributes": True}


class AppointmentResponseByDate(BaseModel):
    id: int
    client_name: str
    scheduled_at: datetime
    reason: str
    