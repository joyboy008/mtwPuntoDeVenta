from datetime import datetime

from pydantic import BaseModel, field_validator
from db.models.QuotationItem import ServiceCategory


class QuotationItemCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    category: ServiceCategory

    @field_validator("price")
    @classmethod
    def price_must_be_positive(cls, value: float) -> float:
        if value <= 0:
            raise ValueError("El precio debe ser mayor a cero")
        return value


class QuotationItemResponse(QuotationItemCreate):
    id: int

    model_config = {"from_attributes": True}


class QuotationCreate(BaseModel):
    appointment_id: int
    notes: str | None = None
    items: list[QuotationItemCreate]


class QuotationResponse(BaseModel):
    id: int
    appointment_id: int
    total: float
    notes: str | None
    created_at: datetime
    items: list[QuotationItemResponse]

    model_config = {"from_attributes": True}