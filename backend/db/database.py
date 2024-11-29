from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from utils.constants import DATABASE_URL

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Eliminar Tablas
# metadata = MetaData()
# metadata.reflect(bind=engine)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# table_name = 'sale_products'
# if table_name in metadata.tables:
#     metadata.tables[table_name].drop(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
