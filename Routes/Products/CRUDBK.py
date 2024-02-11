from Models.Models import Products, Categories, Subcategories, Specification
from Config.Config import app, db
from werkzeug.utils import secure_filename
import os
from flask import jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from Config import Constants, Common
from Config.Common import custom_abort, crud_routes, build_params, get_user_from_jwt, convertor, hash_query_results, get_hash_info, get_random_alphanumerical

#MODEL
class Product():

    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

    def __init__(self): 
        self.table_keys = {
            "pid": "Integer",
            "name": "String",
            "info": "String",
            "description": "String",
            "brand": "String",
            "price": "Integer",
            "price_Discount": "Integer",
            "productNo": "String",
            "product_path": "String",
            "product_paths": "String",
            "available": "Boolean", 
            "deliveryCost": "Integer", 

            "cid": "Integer",
            "scid": "Integer",
    }
        
#-----------------CRUD---------------------------
    #-----------CREATE------------------------------
    
    
    def allowed_file(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    

    def create(self , request):
        data = request.form
        print(data)
        product_path = None
        product_paths = []

        # MULTIPLE IMAGES
        if 'product_images[]' in request.files:
            product_images = request.files.getlist('product_images[]')
            print(product_images[0])
            for product_image in product_images:
                print("Uploaded file name:", product_image.filename)

                if self.allowed_file(product_image.filename):
                    random_title = get_random_alphanumerical()

                    # Extract the original file extension
                    original_extension = os.path.splitext(product_image.filename)[1]
                    print(original_extension)
                    # Create the new filename with the random title and original extension
                    filename = f"{random_title}{original_extension}"
                    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

                    if not os.path.exists(image_path):
                        print("Saving file to:", image_path)
                        product_image.save(image_path)
                        product_paths.append(filename)
                    else:
                        print(f"File '{filename}' already exists in the upload folder. Skipping upload.")
                        product_paths.append(filename)

                else:
                    return custom_abort(400, "Invalid file format. Allowed formats: jpg, jpeg, png, gif")

        #------------------------------_ONE IMAGE
        
        if 'product_path' in request.files:
            product_image = request.files['product_path']
            print(request.form)
            print("Uploaded file name:", product_image.filename)

            if self.allowed_file(product_image.filename):
                random_title = get_random_alphanumerical()

                # Extract the original file extension
                original_extension = os.path.splitext(product_image.filename)[1]
                print(original_extension)
                # Create the new filename with the random title and original extension
                filename = f"{random_title}{original_extension}"
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

                if not os.path.exists(image_path):
                    print("Saving file to:", image_path)
                    product_image.save(image_path)
                    product_path = filename
                else:
                    print(f"File '{filename}' already exists in the upload folder. Skipping upload.")
                    product_path = filename

            else:
                return custom_abort(400, "Invalid file format. Allowed formats: jpg, jpeg, png, gif")

        
        product_paths_str = ','.join(product_paths)
        price_discount = request.form.get('price_Discount', None)

        # Set a default value of 0 if "price_Discount" is not provided
        if price_discount is None:
            price_discount = 0
        
        

        required_keys = ["name", "info", "price", "productNo", "cid", "scid", "price_Discount"]
        for key in required_keys:
            if key not in data:
                return custom_abort(400, "Required key is missing - " + key + "-----")
        
        secondary_keys = ["description", "brand", "available", "deliveryCost"]

        for u_key in secondary_keys:
            if u_key not in data:
                return print("Недостасува : " + u_key)


        product = Products()

        delivery_cost = request.form.get('deliveryCost')

        # Check if the delivery_cost is 'custom'
        if delivery_cost == 'custom':
            # Handle custom delivery cost logic here
            # For example, you might retrieve the custom value from another form field
            custom_delivery_cost = request.form.get('customDeliveryCost')
            try:
                # Convert custom_delivery_cost to an integer
                custom_delivery_cost = int(custom_delivery_cost)
                # Assign the converted value to delivery_cost
                delivery_cost = custom_delivery_cost
            except ValueError:
                # Handle the case where the custom delivery cost is not a valid integer
                return jsonify({'error': 'Invalid custom delivery cost'}), 400

        [setattr(product, key, data[key]) for key in required_keys]
        [setattr(product, u_key, data[u_key]) for u_key in secondary_keys]
        if 'available' in data:
            available = data['available']  # Convert to lowercase
            if available == '1':
                product.available = 1
            elif available == '0':
                product.available = 0
            else:
                # Handle invalid input (if needed)
                return custom_abort(400, "Invalid value for 'available' field")

        product.product_path = product_path #PRIVREMENO VAKA TREBA DA BIDI URL
        product.product_paths = product_paths_str

        db.session.add(product)

        # Commit the product transaction
        
        db.session.commit()

        # Get the product ID generated during the commit
        product_id = product.pid
        
        #print('EVE GOOOOO PID ---------------' + str(product.pid))
        # Create Specifications
        try:
            specification_counter = int(request.form.get('specificationCounter'))
            print (str(specification_counter) + 'test1')
            for i in range(specification_counter-1):
                print (str(i) + 'test2')

                color = request.form.get(f'spec_color[{i+1}]')
                size = request.form.get(f'spec_size[{i+1}]')
                new_price = request.form.get(f'spec_new_price[{i+1}]')

                specification = Specification()
                specification.pid = product_id
                specification.color = color
                specification.size = size
                specification.new_price = new_price

                db.session.add(specification)

            # Commit the specifications transaction
            db.session.commit()

        except Exception as e:
            # Handle the exception, rollback the session, and return an error response
            db.session.rollback()
            return jsonify({"error": str(e)}), 500


        product = Products.query.filter_by(pid=product.pid).first()

        ret = convertor(product)

        return jsonify({"product": ret})

    
    #-----------READ------------------------------

    def read(self , request):
        hash_info = get_hash_info(request.args)
        params = build_params(self.table_keys, request.args)
        
        product = Products.query.filter_by(**params).all()
        category = Categories.query.filter_by(**params).all()
        subcategory = Subcategories.query.filter_by(**params).all()
        specification = Specification.query.filter_by(**params).all()


        ret_product = convertor(product, ["password", "reset_code"], True)
        ret_category = convertor(category, ["password", "reset_code"], True)
        ret_subcategory = convertor(subcategory, ["password", "reset_code"], True)
        ret_specification = convertor(specification, ["password", "reset_code"], True)


        if hash_info["enable_hash"] == True:
            ret_product = hash_query_results(ret_product, hash_info["hash_key"], hash_info["hash_type"])

        return jsonify({ "products" : ret_product,"specifications" : ret_specification, "category" : ret_category, "subcategory" : ret_subcategory,"hash_info" : hash_info })
    #-----------UPDATE------------------------------

    def update(self, request):
        data = request.form
        print(data)
        product_path = None
        product_paths = []
        product_images = []

        product_path = request.files.get('product_path')
        product_images = request.files.getlist('product_images[]')

        if "pid" not in data:
            return custom_abort(400, "Required key is missing from the request - pid")

        for product_image in product_images:
            if product_image.filename:
                print(product_image.filename + 'product_image.filename')
                if self.allowed_file(product_image.filename):
                    random_title = get_random_alphanumerical()

                    # Extract the original file extension
                    original_extension = os.path.splitext(product_image.filename)[1]
                    print(original_extension)
                    # Create the new filename with the random title and original extension
                    filename = f"{random_title}{original_extension}"
                    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

                    if not os.path.exists(image_path):
                        print("Saving file to:", image_path)
                        product_image.save(image_path)
                    else:
                        print(f"File '{filename}' already exists in the upload folder. Skipping upload.")

                    # Always add filename to product_paths list
                    product_paths.append(filename)
                else:
                    return custom_abort(400, "Invalid file format. Allowed formats: jpg, jpeg, png, gif multiple")

        product = Products.query.filter_by(pid=data["pid"]).first()

        if product is None:
                    return custom_abort(404, "Product not found")
    

        for product_image in product_images:
            if product_image.filename:
                # Join new paths if there are new images
                product_paths_str = ','.join(product_paths)
                product.product_paths = product_paths_str


        if 'product_path' in request.files:
            product_image = request.files['product_path']
            if product_image.filename:
                print(product_image.filename + 'kraen product_path')
                if self.allowed_file(product_image.filename):
                    random_title = get_random_alphanumerical()

                    # Extract the original file extension
                    original_extension = os.path.splitext(product_image.filename)[1]
                    print(original_extension)

                    # Create the new filename with the random title and original extension
                    filename = f"{random_title}{original_extension}"
                    image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

                    if not os.path.exists(image_path):
                        print("Saving file to:", image_path)
                        product_image.save(image_path)
                        product.product_path = filename
                    else:
                        print(f"File '{filename}' already exists in the upload folder. Skipping upload.")
                        # Still update product object with the filename
                        product.product_path = filename
                else:
                    return custom_abort(400, "Invalid file format. Allowed formats: jpg, jpeg, png, gif")
                

                # Update product specifications

        # Delete existing specifications associated with the product
        Specification.query.filter_by(pid=product.pid).delete()

        product_id = product.pid

        try:
            specification_counter = int(request.form.get('specificationCounter', 0))
            print(str(specification_counter) + ' test1')

            for i in range(specification_counter):
                print(str(i) + ' test2')

                # Check if the specification should be removed
                if request.form.get(f'remove_specification[{i+1}]') == '1':
                    continue  # Skip this iteration for removal

                color = request.form.get(f'spec_color[{i+1}]')
                size = request.form.get(f'spec_size[{i+1}]')
                new_price = request.form.get(f'spec_new_price[{i+1}]')

                specification = Specification()
                specification.pid = product_id
                specification.color = color
                specification.size = size
                specification.new_price = new_price

                db.session.add(specification)

            # Commit the specifications transaction
            db.session.commit()

        except Exception as e:
            # Handle the exception, rollback the session, and return an error response
            db.session.rollback()
            return jsonify({"error": str(e)}), 500

        # After setting other attributes, handle 'available' checkbox input
        delivery_cost = request.form.get('deliveryCost')

        # Check if the delivery_cost is 'custom'
        if delivery_cost == 'custom':
            # Handle custom delivery cost logic here
            # For example, you might retrieve the custom value from another form field
            custom_delivery_cost = request.form.get('customDeliveryCost')
            try:
                # Convert custom_delivery_cost to an integer
                custom_delivery_cost = int(custom_delivery_cost)
                # Assign the converted value to delivery_cost
                delivery_cost = custom_delivery_cost
            except ValueError:
                # Handle the case where the custom delivery cost is not a valid integer
                return jsonify({'error': 'Invalid custom delivery cost'}), 400
    
        [setattr(product, key, data[key]) for key in self.table_keys if key in data]
        if 'available' in data:
            available = data['available']  # Convert to lowercase
            if available == '1':
                product.available = 1
            elif available == '0':
                product.available = 0
            else:
                # Handle invalid input (if needed)
                return custom_abort(400, "Invalid value for 'available' field")
        db.session.commit()
        product = Products.query.filter_by(pid=product.pid).first()
 
        ret = convertor(product)

        return jsonify({
            "product": ret
        })


    
    #-----------DELETE------------------------------

    def delete(self, pid):
        product = Products.query.filter_by(pid=pid).first()

        if product is None:
            return custom_abort(404, "Product not found")

        db.session.delete(product)
        db.session.commit()

        return jsonify({
            "message": "Product deleted successfully"
        })
    
    def get_product_by_id(self, pid):
        products = Products.query.filter_by(pid=pid).first()
        print(products)
        if products is None:
            return custom_abort(404, "Product not found")

        ret = convertor(products)
        return jsonify({"products": ret})

ProductCrud = Product()
