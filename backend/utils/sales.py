from zoneinfo import ZoneInfo

def get_sale_display_date(sale):
    # Convertir a la zona horaria de Guatemala para mostrar
    if sale.date is None:
        return "Fecha no disponible"
        # Asegúrate de que sale.date sea un objeto datetime naive
    if sale.date.tzinfo is None:  # Verifica si la fecha no tiene información de zona horaria
        sale.date = sale.date.replace(tzinfo=ZoneInfo('UTC'))  # Asigna una zona horaria inicial

    # Convierte a la zona horaria de Guatemala
    guatemala_tz = ZoneInfo('America/Guatemala')
    sale_date_guatemala = sale.date.astimezone(guatemala_tz)

    # Formatea la fecha y hora
    return sale_date_guatemala.strftime("%d/%m/%Y %H:%M")