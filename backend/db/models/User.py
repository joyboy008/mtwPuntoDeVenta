from sqlalchemy import Column, Integer, String, Float, Boolean
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)
    image = Column(String)
    cash_register = Column(Float)
    is_active = Column(Boolean, default=True)


