from flask import Blueprint, Flask, request, jsonify
from flask_redmail import RedMail
from Config.Config import app
import traceback

from Routes.Products.ProductCRUD import ProductCrud

order_api = Blueprint('order', __name__)

redmail = RedMail(app)

@order_api.route('/order', methods=["POST"])
def process_order():
    try:
        data = request.json

        print(data)
        shipping_info = data.get('shippingInfo')
        product_ids = data.get('productIds')  # Assuming you're sending an array of product IDs

        products_in_cart = []
        for pid in product_ids:
            product_response = ProductCrud.get_product_by_id(pid)  # Get the JSON response

            if 'products' in product_response.json:
                product_data = product_response.json['products']
                products_in_cart.append(product_data)
            else:
                return jsonify({'error': 'Product not found'}), 404

        # Extract fields from shipping_info
        firstName = shipping_info.get('firstName')
        lastName = shipping_info.get('lastName')
        street = shipping_info.get('street')
        houseNumber = shipping_info.get('houseNumber')

        # Process the order data as needed
        # You can also send an email confirmation to the user

        if not firstName or not lastName:
            return jsonify({'error': 'Missing required fields'}), 400

        subject = f'New Contact Form Submission from {firstName}'
        
        email_html = f"<h1>{subject}</h1><p>{street}/n From {lastName}</p>"
        for product in products_in_cart:
            email_html += f"<p>Product: {product['name']}</p>"  # Add more details as needed

        # Using redmail.send to send the email
        redmail.send(
    subject=subject,
    receivers=['nikoloski.davorr@gmail.com'],
    html=email_html,
    sender='pyFlaskDBTest@hotmail.com'
)

        return jsonify({'message': 'Email sent successfully'}), 200

    except Exception as e:
        traceback.print_exc()  # Print the full traceback
        return jsonify({'error': str(e)}), 500
