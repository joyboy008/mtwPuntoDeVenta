import enum

from sqlalchemy import Boolean, Column, DateTime, Enum, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from db.database import Base


class AppointmentStatus(str, enum.Enum):
    AGENDADA = "agendada"
    EN_PROCESO = "en_proceso"
    FINALIZADA = "finalizada"
    CANCELADA = "cancelada"


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, nullable=False)
    client_phone = Column(String, nullable=False)
    client_advance = Column(Float, nullable=False)
    reason = Column(String, nullable=False)
    status = Column(
        Enum(AppointmentStatus),
        default=AppointmentStatus.AGENDADA,
        nullable=False,
    )
    scheduled_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    created_by_user = relationship("User", back_populates="appointments")
    quotation = relationship("Quotation", back_populates="appointment", uselist=False)