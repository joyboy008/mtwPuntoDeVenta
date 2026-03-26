from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.crud import (
    create_service,
    get_active_services,
    get_service_by_id,
    search_services,
    soft_delete_service,
    update_service,
)
from db.database import get_db
from db.models.QuotationItem import ServiceCategory
from db.models.ServiceCatalog import ServiceCatalog
from db.schemas.servicecatalog import (
    ServiceCatalogCreate,
    ServiceCatalogResponse,
    ServiceCatalogUpdate,
)
from utils.auth import JWTValidator

router = APIRouter(
    prefix="/catalog",
    tags=["Catálogo"],
    dependencies=[Depends(JWTValidator())],
)


def _get_service_or_404(db: Session, service_id: int) -> ServiceCatalog:
    service = get_service_by_id(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Servicio no encontrado")
    return service


@router.get("/", response_model=list[ServiceCatalogResponse])
def list_services(
    category: ServiceCategory | None = None,
    db: Session = Depends(get_db),
):
    return get_active_services(db, category)


@router.get("/search", response_model=list[ServiceCatalogResponse])
def search_catalog(q: str, db: Session = Depends(get_db)):
    return search_services(db, q)


@router.get("/{service_id}", response_model=ServiceCatalogResponse)
def get_service(service_id: int, db: Session = Depends(get_db)):
    return _get_service_or_404(db, service_id)


@router.post("/", response_model=ServiceCatalogResponse, status_code=201)
def create_new_service(
    payload: ServiceCatalogCreate, db: Session = Depends(get_db)
):
    return create_service(db, payload)


@router.put("/{service_id}", response_model=ServiceCatalogResponse)
def edit_service(
    service_id: int,
    payload: ServiceCatalogUpdate,
    db: Session = Depends(get_db),
):
    service = _get_service_or_404(db, service_id)
    return update_service(db, service, payload)


@router.delete("/{service_id}", status_code=204)
def remove_service(service_id: int, db: Session = Depends(get_db)):
    service = _get_service_or_404(db, service_id)
    soft_delete_service(db, service)