from pydantic import BaseModel
from typing import Optional


class ProductBase(BaseModel):
    name: str
    code: str
    description: str
    category: str
    stock: int
    price: float
    image: str

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

class PutProduct(BaseModel):
    name: str
    code: str
    description: str
    category: str
    stock: int
    price: float
    image: str
    is_active: Optional[bool] = None