import enum

from sqlalchemy import Column, Enum, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from db.database import Base


class ServiceCategory(str, enum.Enum):
    MAKEUP = "makeup"
    NAILS = "nails"
    LASHES = "lashes"
    OTRO = "otro"


class QuotationItem(Base):
    __tablename__ = "quotation_items"

    id = Column(Integer, primary_key=True, index=True)
    quotation_id = Column(Integer, ForeignKey("quotations.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    category = Column(Enum(ServiceCategory), nullable=False)

    quotation = relationship("Quotation", back_populates="items")