from sqlalchemy import Column, Integer, String, Float, Boolean
from ..database import Base

class Contact(Base):
    __tablename__ = "contact"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String)
    message = Column(String)


