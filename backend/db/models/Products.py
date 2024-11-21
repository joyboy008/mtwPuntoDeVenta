from sqlalchemy import Column, Integer, String, Float, Boolean
from ..database import Base
from sqlalchemy.orm import relationship

class Products(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    code = Column(String, unique=True, index=True)
    description = Column(String)
    category = Column(String)
    stock = Column(Integer)
    price = Column(Float)
    image = Column(String)
    is_active = Column(Boolean, default=True)
    sales = relationship("SaleProduct", back_populates="product")


