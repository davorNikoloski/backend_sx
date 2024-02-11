from flask import Blueprint, Flask, request, jsonify
from flask_redmail import RedMail
from Config.Config import app
import traceback, time
from Models.Models import Users

from Routes.Products.ProductCRUD import ProductCrud

order_api = Blueprint('order', __name__)

redmail = RedMail(app)

@order_api.route('/order', methods=["POST"])
def process_order():
    try:
        data = request.json

        print(data)
        shipping_info = data.get('shippingInfo')
        products = data.get('products')  # Use 'products' key to access the array of products
        costDetails = data.get('costDetails')  # Use 'products' key to access the array of products

        products_in_cart = []
        for product_item in products:
            product_id = product_item['productId']
            product_quantity = product_item['quantity']
            product_color = product_item['color']
            product_size = product_item['size']
            product_response = ProductCrud.get_product_by_id(product_id)  # Get the JSON response

            if 'products' in product_response.json:
                product_data = product_response.json['products']
                product_data['quantity'] = product_quantity
                product_data['color'] = product_color
                product_data['size'] = product_size  # Add the 'quantity' field to the product data
                products_in_cart.append(product_data)
            else:
                return jsonify({'error': 'Product not found'}), 404

        # Extract fields from shipping_info
        firstName = shipping_info.get('firstName')
        lastName = shipping_info.get('lastName')

        # Process the order data as needed
        # You can also send an email confirmation to the user

        if not firstName or not lastName:
            return jsonify({'error': 'Недостасуваат задолжителни полиња'}), 400

        subject = f'Нова порачка од:{firstName}'

        email_html = f"<h1 style='font-size: 120%;'>{subject}</h1>"

        # Main Container with increased font size
        email_html += "<div style='display: flex; margin-bottom: 20px; padding: 20px; font-size: 120%;'>"

        # Products Section
        email_html += "<div style='flex: 1; background-color: #f5f5f5; padding: 20px; border-radius: 10px;'>"
        email_html += "<h2><strong>Производи:</strong></h2>"

        for product in products_in_cart:
            email_html += "<div style='border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px;'>"
            email_html += f"<p><strong>Производ:</strong> {product['name']}</p>"
            email_html += f"<p><strong>Боја:</strong> {product['color']}</p>"
            email_html += f"<p><strong>Големина:</strong> {product['size']}</p>"
            email_html += f"<p><strong>Опис:</strong> {product['description']}</p>"
            email_html += f"<p><strong>Количина:</strong> {product['quantity']}</p>"
            email_html += f"<p><strong>Цена на производот:</strong> {product['price']}</p>"
            email_html += "</div>"

        email_html += "</div>"

        # Shipping Information Section
        email_html += "<div style='flex: 1; background-color: #eaeaea; padding: 20px; border-radius: 10px; margin-left: 20px;'>"
        email_html += "<h2><strong>Информации за испорака:</strong></h2>"
        email_html += f"<p><strong>Име:</strong> {shipping_info['firstName']} {shipping_info['lastName']}</p>"
        email_html += f"<p><strong>Емаил:</strong> {shipping_info['email']}</p>"
        email_html += f"<p><strong>Телефонски број:</strong> {shipping_info['phoneNumber']}</p>"
        email_html += f"<p><strong>Град:</strong> {shipping_info['city']}</p>"
        email_html += f"<p><strong>Поштенски код:</strong> {shipping_info['postCode']}</p>"
        email_html += f"<p><strong>Улица:</strong> {shipping_info['street']} бр: {shipping_info['houseNumber']}</p>"

        email_html += "<div style='margin-top: 50px;'>"
        email_html += "<h2><strong>Износ на нарачката:</strong></h2>"
        email_html += f"<p><strong>Износ за нарачка:</strong> {costDetails['totalZbir']} ден.</p>"
        email_html += f"<p><strong>Трошоци за испорака:</strong> {costDetails['deliveryCost']} ден.</p>"
        email_html += f"<p><strong>Вкупно:</strong> {costDetails['finalTotal']} ден.</p>"
        email_html += "</div>"
        # Include more shipping information fields as needed
        email_html += "</div>"
        # Close the Main Container
        email_html += "</div>"


        # Using redmail.send to send the email
        redmail.send(
            subject=subject,
            receivers=['nikoloski.davorr@gmail.com', 'shopexmk1@gmail.com'],
            html=email_html,
            sender='pyFlaskDBTest@hotmail.com'
        )

        # Additional email template for the customer
        customer_email_subject = 'Вашата нарачка е примена'
        customer_email_body = f"""
        Почитувани,

        Вашата нарачка е примена.
        Нарачката содржи:

        """

        # Iterate over each product and add details to the email body
        for product in products_in_cart:
            customer_email_body += f"""
        Производ: {product['name']}
        Боја: {product['color']}
        Големина: {product['size']}
        Количина: {product['quantity']}
        Цена на производот: {product['price']} ден.

        """

        # Add the remaining content of the email
        customer_email_body += f"""
        Со вкупна вредност од {costDetails['finalTotal']} ден. со вклучена достава до вашата адреса
        
        Ви благодариме што купувате од нас.

        За сите дополнителни прашања и
        консултации слободно контактирајте не.

        Со почит,
        Shopex.mk
        Customer Support Department
        Phone: +389 79 390 752
        www.shopex.mk
        E-mail: Shopexmk1@gmail.com
        """

        # Using redmail.send to send the customer email
        customer_email_body = customer_email_body.replace('\n', '<br>')

        redmail.send(
            subject=customer_email_subject,
            receivers=[shipping_info['email']],  # Send to customer's email only
            html=customer_email_body,
            sender='pyFlaskDBTest@hotmail.com'
        )



        return jsonify({'message': 'Email sent successfully'}), 200

    except Exception as e:
        traceback.print_exc()  # Print the full traceback
        return jsonify({'error': str(e)}), 500






@order_api.route('/send_message', methods=['POST'])
def send_message():
    try:
        message = request.form['message']
        print(f"Message: {message}")
        users = Users.query.all()

        for user in users:
            print(f"Sending to: {user.email}")
            try:
                send_email_redmail(user, 'Message from your app', message)
                print("Email sent successfully")
            except Exception as e:
                print(f"Error sending email to {user.email}: {str(e)}")

        return 'Message sent successfully!'
    except Exception as e:
        return str(e)


def send_email_redmail(user, subject, body):
    # Using redmail.send to send the email
    to = user.email
    print(to)
    redmail.send(
        subject=subject,
        receivers=[to],
        html=body,
        sender='pyFlaskDBTest@hotmail.com'
    )
