from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.crud import (
    create_user,
    deactivate_user,
    get_active_users,
    get_users,
    get_user_by_id,
    update_user,
)
from db.database import get_db
from db.schemas.user import UserCreate, UserResponse, UserUpdate
from utils.auth import JWTValidator

router = APIRouter(
    prefix="/users",
    tags=["Usuarios"],
    dependencies=[Depends(JWTValidator())],
)


def _get_user_or_404(db: Session, user_id: int):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user


@router.get("/", response_model=list[UserResponse])
def list_users(db: Session = Depends(get_db)):
    return get_users(db)


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return _get_user_or_404(db, user_id)


@router.post("/", response_model=UserResponse, status_code=201)
def add_user(payload: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, payload)


@router.put("/{user_id}", response_model=UserResponse)
def edit_user(user_id: int, payload: UserUpdate, db: Session = Depends(get_db)):
    user = _get_user_or_404(db, user_id)
    return update_user(db, user, payload)


@router.patch("/{user_id}/desactivar", response_model=UserResponse)
def disable_user(user_id: int, db: Session = Depends(get_db)):
    user = _get_user_or_404(db, user_id)
    return deactivate_user(db, user)