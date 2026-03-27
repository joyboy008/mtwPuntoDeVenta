from datetime import date, datetime, timezone

from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from db.models.Appointment import Appointment, AppointmentStatus
from db.models.Contact import Contact
from db.models.Quotation import Quotation
from db.models.QuotationItem import QuotationItem
from db.models.User import User
from db.schemas.appointment import AppointmentCreate, AppointmentUpdateStatus
from db.schemas.contact import ContactCreate
from db.schemas.quotation import QuotationCreate
from db.schemas.user import UserCreate, UserUpdate
from utils.auth import Hasher


def _now() -> datetime:
    return datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------

def get_user_by_id(db: Session, user_id: int) -> User | None:
    return (
        db.query(User)
        .filter(User.id == user_id, User.deleted_at.is_(None))
        .first()
    )


def get_user_by_username(db: Session, username: str) -> User | None:
    return (
        db.query(User)
        .filter(User.username == username, User.deleted_at.is_(None))
        .first()
    )

def get_users(db: Session) -> list[User]:
    return (
        db.query(User)
        .filter(User.deleted_at.is_(None))
        .all()
    )


def get_active_users(db: Session) -> list[User]:
    return (
        db.query(User)
        .filter(User.is_active == True, User.deleted_at.is_(None))
        .all()
    )


def create_user(db: Session, payload: UserCreate) -> User:
    user = User(
        name=payload.name,
        username=payload.username,
        password=Hasher.get_password_hash(payload.password),
        role=payload.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(db: Session, user: User, payload: UserUpdate) -> User:
    user.name = payload.name
    user.username = payload.username
    user.role = payload.role
    if payload.password:
        user.password = Hasher.get_password_hash(payload.password)
    if payload.is_active is not None:
        user.is_active = payload.is_active

    db.commit()
    db.refresh(user)
    return user


def deactivate_user(db: Session, user: User) -> User:
    user.is_active = False
    user.deleted_at = _now()
    db.commit()
    db.refresh(user)
    return user


# ---------------------------------------------------------------------------
# Appointments
# ---------------------------------------------------------------------------

def get_appointment_by_id(db: Session, appointment_id: int) -> Appointment | None:
    return (
        db.query(Appointment)
        .filter(Appointment.id == appointment_id, Appointment.deleted_at.is_(None))
        .first()
    )


def get_all_appointments(db: Session) -> list[Appointment]:
    return (
        db.query(Appointment)
        .filter(Appointment.deleted_at.is_(None))
        .order_by(Appointment.scheduled_at)
        .all()
    )

def get_appointments_for_date(db: Session, target_date: date) -> list[Appointment]:
    return (
        db.query(Appointment)
        .filter(
            func.date(func.timezone('America/Guatemala', Appointment.scheduled_at)) == target_date,
            Appointment.deleted_at.is_(None),
            Appointment.status == AppointmentStatus.AGENDADA,
        )
        .order_by(Appointment.scheduled_at)
        .all()
    )

def get_appointments_by_status(
    db: Session, statuses: list[AppointmentStatus]
) -> list[Appointment]:
    order = (
        Appointment.scheduled_at.desc()
        if AppointmentStatus.FINALIZADA in statuses
        else Appointment.scheduled_at
    )
    return (
        db.query(Appointment)
        .filter(Appointment.status.in_(statuses), Appointment.deleted_at.is_(None))
        .order_by(order)
        .all()
    )


def get_appointment(db: Session, id: int):
    return (
        db.query(Appointment)
        .options(joinedload(Appointment.quotation))
        .filter(Appointment.id == id, Appointment.deleted_at.is_(None))
        .first()
    )


def create_appointment(db: Session, payload: AppointmentCreate, user_id) -> Appointment:
    appointment = Appointment(
        client_name=payload.client_name,
        client_phone=payload.client_phone,
        client_advance=payload.client_advance,
        reason=payload.reason,
        scheduled_at=payload.scheduled_at,
        created_by=user_id,
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment


def update_appointment_status(
    db: Session, appointment: Appointment, payload: AppointmentUpdateStatus
) -> Appointment:
    appointment.status = payload.status
    db.commit()
    db.refresh(appointment)
    return appointment


def soft_delete_appointment(db: Session, appointment: Appointment) -> None:
    appointment.is_active = False
    appointment.deleted_at = _now()
    db.commit()


# ---------------------------------------------------------------------------
# Quotations
# ---------------------------------------------------------------------------

def get_quotation_by_id(db: Session, quotation_id: int) -> Quotation | None:
    return db.query(Quotation).filter(Quotation.id == quotation_id).first()


def get_quotation_by_appointment(
    db: Session, appointment_id: int
) -> Quotation | None:
    return (
        db.query(Quotation)
        .filter(Quotation.appointment_id == appointment_id)
        .first()
    )


def create_quotation(db: Session, payload: QuotationCreate) -> Quotation:
    items = [
        QuotationItem(
            name=item.name,
            description=item.description,
            price=item.price,
            category=item.category,
        )
        for item in payload.items
    ]

    total = sum(item.price for item in payload.items)

    quotation = Quotation(
        appointment_id=payload.appointment_id,
        notes=payload.notes,
        total=total,
        items=items,
    )

    db.add(quotation)
    db.commit()
    db.refresh(quotation)
    return quotation

def update_appointment(db: Session, appointment: Appointment, payload: AppointmentCreate) -> Appointment:
    appointment.client_name = payload.client_name
    appointment.client_phone = payload.client_phone
    appointment.client_advance = payload.client_advance
    appointment.reason = payload.reason
    appointment.scheduled_at = payload.scheduled_at

    db.commit()
    db.refresh(appointment)
    return appointment

def update_quotation(
    db: Session, quotation: Quotation, payload: QuotationCreate
) -> Quotation:
    quotation.notes = payload.notes

    for item in quotation.items:
        db.delete(item)

    quotation.items = [
        QuotationItem(
            name=item.name,
            description=item.description,
            price=item.price,
            category=item.category,
        )
        for item in payload.items
    ]

    quotation.total = sum(item.price for item in payload.items)

    db.commit()
    db.refresh(quotation)
    return quotation


# ---------------------------------------------------------------------------
# Contact
# ---------------------------------------------------------------------------

def get_all_contacts(db: Session) -> list[Contact]:
    return db.query(Contact).order_by(Contact.created_at.desc()).all()


def create_contact(db: Session, payload: ContactCreate) -> Contact:
    contact = Contact(
        name=payload.name,
        email=payload.email,
        message=payload.message,
    )
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact


# ---------------------------------------------------------------------------
# Service Catalog
# ---------------------------------------------------------------------------
 
def get_service_by_id(db: Session, service_id: int) -> "ServiceCatalog | None":
    from db.models.ServiceCatalog import ServiceCatalog
    return (
        db.query(ServiceCatalog)
        .filter(ServiceCatalog.id == service_id, ServiceCatalog.deleted_at.is_(None))
        .first()
    )
 
 
def get_active_services(db: Session, category=None) -> list:
    from db.models.ServiceCatalog import ServiceCatalog
    query = db.query(ServiceCatalog).filter(
        ServiceCatalog.is_active == True,
        ServiceCatalog.deleted_at.is_(None),
    )
    if category:
        query = query.filter(ServiceCatalog.category == category)
    return query.order_by(ServiceCatalog.category, ServiceCatalog.name).all()
 
 
def search_services(db: Session, term: str) -> list:
    from db.models.ServiceCatalog import ServiceCatalog
    return (
        db.query(ServiceCatalog)
        .filter(
            ServiceCatalog.is_active == True,
            ServiceCatalog.deleted_at.is_(None),
            ServiceCatalog.name.ilike(f"%{term}%"),
        )
        .order_by(ServiceCatalog.name)
        .all()
    )
 
 
def create_service(db: Session, payload) -> "ServiceCatalog":
    from db.models.ServiceCatalog import ServiceCatalog
    service = ServiceCatalog(
        name=payload.name,
        description=payload.description,
        price=payload.price,
        category=payload.category,
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service
 
 
def update_service(db: Session, service, payload) -> "ServiceCatalog":
    service.name = payload.name
    service.description = payload.description
    service.price = payload.price
    service.category = payload.category
    db.commit()
    db.refresh(service)
    return service
 
 
def soft_delete_service(db: Session, service) -> None:
    service.is_active = False
    service.deleted_at = _now()
    db.commit()