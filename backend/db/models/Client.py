from sqlalchemy import Column, Integer, String, Boolean
from ..database import Base

class Client(Base):
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    nit = Column(String)
    address = Column(String)
    phone = Column(String)
    email = Column(String)
    is_active = Column(Boolean, default=True)