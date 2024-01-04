from datetime import datetime


def calculate_total_price(start_date, end_date, price):
    # Calculate the difference in days
    days_difference = (end_date - start_date).days
    print(days_difference)

    # Calculate the total price by multiplying the price with the number of days
    total_price = price * days_difference

    return total_price
