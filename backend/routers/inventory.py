from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import crud
from db.models.Products import Products
from db.schemas import products
from db.database import get_db
from utils.auth import JWTValidator

router = APIRouter(
    prefix="/productos", tags=["Inventory"], responses={404: {"Message": "No Encontrado"}}
)

@router.get("/", 
            dependencies={Depends(JWTValidator())}
            )
async def list_products(db: Session = Depends(get_db)):
    products = db.query(Products).filter(Products.is_active == True).all()
    return products


@router.post("/", dependencies={Depends(JWTValidator())}, response_model=products.Product)
def create_product(product: products.ProductCreate, db: Session = Depends(get_db)):
    return crud.create_product(db=db, product=product)

@router.get("/{product_id}",
            dependencies={Depends(JWTValidator())},
            response_model=products.Product)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db=db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Producto no Encontrado")
    return db_product


@router.put("/{product_id}", 
            dependencies={Depends(JWTValidator())}
            )
async def update_product(product: products.PutProduct, product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db=db, product_id=product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no existe")
    return crud.update_product(db=db, db_product=db_product, product=product)

@router.put("/{product_id}/desactivar", 
            dependencies={Depends(JWTValidator())},
            )
async def desactivar_product(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db=db, product_id=product_id)

    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no existe")
    
    db_product.is_active = False
    db.commit()
    db.refresh(db_product)
    return db_product


@router.delete("/{product_id}",
            dependencies={Depends(JWTValidator())},
            response_model=dict)
def read_user(product_id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db=db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Producto no Encontrado")
    db.delete(db_product)
    db.commit()
    return {'message': "Producto eliminado"}