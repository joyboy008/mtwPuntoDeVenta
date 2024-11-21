from sqlalchemy.orm import Session
from .models import Products, User, Client, Sale
from .models.Contact import Contact
from .schemas import products, user, client
from .schemas.contact import ContactCreate
from utils.auth import Hasher

def create_product(db: Session, product: products.ProductCreate):
    db_product = Products.Products(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def create_contact(db: Session, contact: ContactCreate):
    db_contact = Contact(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

def create_user(db: Session, user: user.UserCreate):
    db_user = User.User(**user.dict())
    db_user.password = Hasher.get_password_hash(db_user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_product(db: Session, product_id: int):
    return db.query(Products.Products).filter(Products.Products.id == product_id).first()

def update_product(db: Session, db_product: Products.Products, product: products.PutProduct):
    db_product.name = product.name
    db_product.code = product.code
    db_product.description = product.description
    db_product.category = product.category
    db_product.stock = product.stock
    db_product.price = product.price
    db_product.image = product.image
    db.commit()  # Guarda los cambios
    db.refresh(db_product)  # Refresca el objeto con los nuevos valores
    return db_product

# Función para obtener un User por su ID
def get_user(db: Session, user_id: int):
    return db.query(User.User).filter(User.User.id == user_id).first()

def update_user(db: Session, db_user: User, usuario: user.UsuarioPut):
    db_user.name = usuario.name
    db_user.username = usuario.username
    db_user.role = usuario.role
    db_user.image = usuario.image
    db_user.cash_register = usuario.cash_register
    if usuario.password:
        db_user.password = Hasher.get_password_hash(usuario.password)
    db.commit()  # Guarda los cambios
    db.refresh(db_user)  # Refresca el objeto con los nuevos valores
    return db_user


def create_client(db: Session, client: client.ClientCreate):
    db_client = Client.Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def get_client(db: Session, client_id: int):
    return db.query(Client.Client).filter(Client.Client.id == client_id).first()

def update_client(db: Session, db_client: User, client: client.ClientPut):
    db_client.name = client.name
    db_client.nit = client.nit
    db_client.address = client.address
    db_client.phone = client.phone
    db_client.email = client.email
    db.commit()
    db.refresh(db_client)
    return db_client

def get_sale(db: Session, sale_id: int):
    return db.query(Sale.Sale).filter(Sale.Sale.id == sale_id).first()


def get_sale_details(db: Session, sale_id: int):
    sale = get_sale(db, sale_id)

    if not sale:
        return None

    # Obtener el nombre del usuario y del cliente
    user = get_user(db, sale.user_id)
    client = get_client(db, sale.client_id)
    
    # Obtener los productos
    sale_products = []
    sale_quantity = []
    for sale_product in sale.products:
        sale_products.append(sale_product.product_id)
        sale_quantity.append(sale_product.quantity)

    products = []
    for product in sale_products:
        products.append(get_product(db, product).name)
        products.append(get_product(db, product).price)

    # Formatear la respuesta
    sale_details = {
        "id": sale.id,
    "client_name": client.name if client else "Cliente no encontrado",
    "user_name": user.name if user else "Usuario no encontrado",
    "products": [
        {
            "product_name": products[i],
            "price": products[i + 1],
            "quantity": sale_quantity[i // 2]  # Usa i//2 para que cada producto tenga su cantidad correspondiente
        }
        for i in range(0, len(products), 2)
    ],
    "sale_details": sale.sale_details,
    "total": sale.total,
}
    return sale_details