from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from db.crud import create_client, get_client, update_client
from db.models.Client import Client as ClientModel
from db.schemas.client import Client, ClientCreate, ClientPut
from utils.auth import JWTValidator

router = APIRouter(
    prefix="/clientes", tags=["Clientes"], responses={404: {"Message": "No Encontrado"}}
)

@router.post("/", response_model=Client, 
             dependencies={Depends(JWTValidator())}
             )
def add_client(client: ClientCreate, db: Session = Depends(get_db)):
    return create_client(db=db, client=client)

@router.get("/", 
            dependencies={Depends(JWTValidator())}
            )
async def list_clients(db: Session = Depends(get_db)):
    clients = db.query(ClientModel).filter(ClientModel.is_active == True).all()
    return [Client.from_orm(client) for client in clients]

@router.get("/{client_id}",
            dependencies={Depends(JWTValidator())},
            response_model=Client)
def read_client(client_id: int, db: Session = Depends(get_db)):
    db_client = get_client(db=db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Cliente no Encontrado")
    return db_client


@router.put("/{client_id}", 
            dependencies={Depends(JWTValidator())}
            )
async def actualizar_cliente(client: ClientPut, client_id: int, db: Session = Depends(get_db)):
    db_client = get_client(db=db, client_id=client_id)
    if not db_client:
        raise HTTPException(status_code=404, detail="Cliente no existe")
    return update_client(db=db, db_client=db_client, client=client)


@router.put("/{client_id}/desactivar", 
            dependencies={Depends(JWTValidator())},
            )
async def desactivar_cliente(client_id: int, db: Session = Depends(get_db)):
    db_client = get_client(db=db, client_id=client_id)
    if not db_client:
        raise HTTPException(status_code=404, detail="Cliente no existe")
    
    db_client.is_active = False
    db.commit()
    db.refresh(db_client)
    return db_client


@router.delete("/{client_id}",
            dependencies={Depends(JWTValidator())},
            response_model=dict)
def read_client(client_id: int, db: Session = Depends(get_db)):
    db_client = get_client(db=db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Cliente no Encontrado")
    db.delete(db_client)
    db.commit()
    return {'message': "Cliente eliminado"}