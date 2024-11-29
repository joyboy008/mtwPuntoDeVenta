from pydantic import BaseModel
from typing import List, Optional


class SaleProductCreate(BaseModel):
    product_id: int
    quantity: int

class SaleCreate(BaseModel):
    client_id: int
    user_id: int
    products: List[SaleProductCreate]
    sale_details: Optional[str] = None

class SaleProductResponse(BaseModel):
    product_id: int
    quantity: int

class SaleResponse(BaseModel):
    id: int
    client_id: int
    user_id: int
    total: float
    products: List[SaleProductResponse]
    date: str
    sale_details: Optional[str] = None
    is_active: Optional[bool]

    class Config:
        orm_mode = True
        from_atributs = True


class SaleDetailResponse(BaseModel):
    id: int
    client_id: int
    client_name: str
    client_address: str
    user_id: int
    user_username: str
    total: float
    date: str
    sale_details: Optional[str] = None
    is_active: Optional[bool]
    # products: List[SaleProductResponse]  # Ajusta según la estructura de tus productos.

    class Config:
        orm_mode = True
        from_atributs = True