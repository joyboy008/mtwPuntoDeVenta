from decouple import config

DATABASE_URL = config("DATABASE_URL")
JWT_SECRET = config("JWT_SECRET")
JWT_ALGORITHM = config("JWT_ALGORITHM")
OPENAI_API_KEY = config("OPENAI_API_KEY")


