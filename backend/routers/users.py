from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from db.crud import create_user, get_user, update_user
from db.models.User import User as UserModel
from db.schemas.user import UserCreate, User, UsuarioPut
from utils.auth import JWTValidator

router = APIRouter(
    prefix="/users", tags=["Usuarios"], responses={404: {"Message": "No Encontrado"}}
)

@router.post("/", response_model=User, 
            #  dependencies={Depends(JWTValidator())}
             )
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, user=user)


@router.get("/{user_id}",
            dependencies={Depends(JWTValidator())},
            response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no Encontrado")
    user_data = db_user.__dict__.copy()  
    user_data['password'] = ""  
    return user_data


@router.get("/", 
            dependencies={Depends(JWTValidator())}
            )
async def listar_usuarios(db: Session = Depends(get_db)):
    usuarios = db.query(UserModel).filter(UserModel.is_active == True).all()  
    return [User.from_orm(usuario) for usuario in usuarios]  


@router.put("/{user_id}", 
            dependencies={Depends(JWTValidator())}
            )
async def actualizar_usuario(usuario: UsuarioPut, user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db=db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no existe")
    return update_user(db=db, db_user=db_user, usuario=usuario)


@router.put("/{user_id}/desactivar", 
            dependencies={Depends(JWTValidator())},
            )
async def desactivar_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db=db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Cliente no existe")
    
    db_user.is_active = False
    db.commit()
    db.refresh(db_user)
    return db_user


@router.delete("/{user_id}",
            dependencies={Depends(JWTValidator())},
            response_model=dict)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db=db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Usuario no Encontrado")
    db.delete(db_user)
    db.commit()
    return {'message': "Usuario eliminado"}