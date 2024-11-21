from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from db.crud import get_sale_details, get_sale
from db.models.Sale import Sale, SaleProduct
from db.models.Products import Products
from db.schemas.sale import SaleCreate, SaleDetailResponse
from utils.auth import JWTValidator
from datetime import datetime
from utils.sales import get_sale_display_date
from db import crud

router = APIRouter(
    prefix="/sales", tags=["Ventas"], responses={404: {"Message": "No Encontrado"}}
)

@router.get("/",
            dependencies={Depends(JWTValidator())},
            response_model=list[SaleDetailResponse])
def list_sales(db: Session = Depends(get_db)):
    sales = db.query(Sale).all()
    sales_details = []

    for sale in sales:
        sale.date = get_sale_display_date(sale)
        client = crud.get_client(db=db, client_id=sale.client_id)
        user = crud.get_user(db=db, user_id=sale.user_id)
        sale_detail = {
            "id": sale.id,
            "client_id": client.id,
            "client_name": client.name,
            "user_id": user.id,
            "user_username": user.username,
            "client_address": client.address,
            "total": sale.total,
            "date": sale.date,
            "sale_details": sale.sale_details,
        }

        sales_details.append(sale_detail)
    return sales_details

@router.post("/", response_model=SaleCreate, 
             dependencies={Depends(JWTValidator())}
             )
def create_sale(sale: SaleCreate, db: Session = Depends(get_db)):
    db_sale = Sale(client_id=sale.client_id, user_id=sale.user_id, sale_details=sale.sale_details, total=0, date=datetime.utcnow())
    db.add(db_sale)
    db.commit()
    db.refresh(db_sale)

    total_price = 0
    products_in_sale = []

    for item in sale.products:
        product = db.query(Products).filter(Products.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        unit_price = product.price
        total_price += unit_price * item.quantity

        sale_product = SaleProduct(
            sale_id=db_sale.id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=unit_price 
        )
        db.add(sale_product)

        products_in_sale.append({
            "product_id": item.product_id,
            "quantity": item.quantity,
            "unit_price": unit_price,
            "total_price": unit_price * item.quantity
        })
    db_user = crud.get_user(db=db, user_id=sale.user_id)
    db_user.cash_register += total_price
    db_sale.total = total_price
    db.commit()
    db.refresh(db_sale)
    db.refresh(db_user)
    
    message = {
        "sale_id": db_sale.id,
        "client_id": db_sale.client_id,
        "sale_details": db_sale.sale_details,
        "user_id": db_sale.user_id,
        "total": total_price,
        "products": products_in_sale
    }
    return message

@router.get("/{sale_id}",
            dependencies={Depends(JWTValidator())},
            response_model=dict)
def read_sale(sale_id: int, db: Session = Depends(get_db)):
    sale_details = get_sale_details(db, sale_id)
    
    if not sale_details:
        raise HTTPException(status_code=404, detail="Venta no encontrada")
    
    return sale_details


@router.put("/{sale_id}",
            dependencies={Depends(JWTValidator())},
            response_model=SaleCreate)
def update_sale(sale_id: int, sale: SaleCreate, db: Session = Depends(get_db)):
    db_sale = get_sale(db=db, sale_id=sale_id)
    
    if not db_sale:
        raise HTTPException(status_code=404, detail="Venta no encontrada")

    db_sale.client_id = sale.client_id
    db_sale.user_id = sale.user_id
    db_sale.date = datetime.utcnow()  
    
    total_price = 0

    db.query(SaleProduct).filter(SaleProduct.sale_id == sale_id).delete()

    for item in sale.products:
        product = db.query(Products).filter(Products.id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")


        unit_price = product.price
        total_price += unit_price * item.quantity


        sale_product = SaleProduct(
            sale_id=db_sale.id,
            product_id=item.product_id,
            quantity=item.quantity,
            unit_price=unit_price  
        )
        db.add(sale_product)

    db_sale.total = total_price
    db.commit()
    db.refresh(db_sale)
    return db_sale


@router.delete("/{sale_id}",
            dependencies={Depends(JWTValidator())},
            response_model=dict)
def delete_sale(sale_id: int, db: Session = Depends(get_db)):
    sale = get_sale(db=db, sale_id=sale_id)
    if not sale:
        raise HTTPException(status_code=404, detail="Venta no encontrada")
    
    db.delete(sale)
    db.commit()
    
    return {"message": "Venta eliminada con éxito"}