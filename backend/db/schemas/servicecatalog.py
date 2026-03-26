from datetime import datetime

from pydantic import BaseModel, field_validator

from db.models.QuotationItem import ServiceCategory


class ServiceCatalogCreate(BaseModel):
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


class ServiceCatalogUpdate(ServiceCatalogCreate):
    pass


class ServiceCatalogResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    category: ServiceCategory
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}