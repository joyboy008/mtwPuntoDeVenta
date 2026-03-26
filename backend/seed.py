"""
Script para crear el usuario administrador inicial.
Ejecutar una sola vez después de levantar la base de datos.

Uso:
    python seed.py
"""

from db.database import SessionLocal
from db.models.User import User
from utils.auth import Hasher


ADMIN_USER = {
    "name": "Administrador",
    "username": "sisadmin",
    "password": "Admin.00",
    "role": "admin",
}


def user_already_exists(db, username: str) -> bool:
    return db.query(User).filter(User.username == username).first() is not None


def create_admin_user(db) -> None:
    user = User(
        name=ADMIN_USER["name"],
        username=ADMIN_USER["username"],
        password=Hasher.get_password_hash(ADMIN_USER["password"]),
        role=ADMIN_USER["role"],
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    print(f"  Usuario '{user.username}' creado con ID {user.id}")


def run() -> None:
    print("Iniciando seed...")
    db = SessionLocal()

    try:
        if user_already_exists(db, ADMIN_USER["username"]):
            print(f"  El usuario '{ADMIN_USER['username']}' ya existe, no se hace nada.")
            return

        create_admin_user(db)
        print("Seed completado.")

    except Exception as error:
        db.rollback()
        print(f"Error durante el seed: {error}")
        raise

    finally:
        db.close()


if __name__ == "__main__":
    run()