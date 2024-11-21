from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from datetime import datetime
from ..database import Base
from zoneinfo import ZoneInfo


class Sale(Base):
    __tablename__ = 'sales'

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"))  # ID del cliente, clave foránea a la tabla de Clientes
    user_id = Column(Integer, ForeignKey("users.id"))  # ID del usuario, clave foránea a la tabla de Usuarios
    sale_details = Column(String)
    total = Column(Float)
    date = Column(DateTime, default=lambda: datetime.now(ZoneInfo.utc))

    # Relación de muchos a muchos con productos a través de la tabla intermedia SaleProduct
    products = relationship("SaleProduct", back_populates="sale")


class SaleProduct(Base):
    __tablename__ = 'sale_products'

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id"))  # Clave foránea a la tabla de Ventas
    product_id = Column(Integer, ForeignKey("products.id"))  # Clave foránea a la tabla de Productos
    quantity = Column(Integer)  # Cantidad de este producto en la venta
    unit_price = Column(Float)  # Precio unitario del producto al momento de la venta

    # Relación para acceder a la venta y al producto
    sale = relationship("Sale", back_populates="products")
    product = relationship("Products", back_populates="sales")
