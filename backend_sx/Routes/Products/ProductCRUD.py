from Models.Models import Products, Categories, Subcategories
from Config.Config import app, db
from werkzeug.utils import secure_filename
import os
from flask import jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from Config import Constants, Common
from Config.Common import custom_abort, crud_routes, build_params, get_user_from_jwt, convertor, hash_query_results, get_hash_info, get_random_alphanumerical, get_extension

#MODEL
class Product():

    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

    def __init__(self): 
        self.table_keys = {
            "pid": "Integer",
            "name": "String",
            "info": "String",
            "price": "Integer",
            "productNo": "String",
            "product_path": "String",
            
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

        if 'product_path' in request.files:
            product_image = request.files['product_path']
            print("Uploaded file name:", product_image.filename)

            if self.allowed_file(product_image.filename):
                filename = secure_filename(product_image.filename)
                print("Saving file to:", os.path.join(app.config['UPLOAD_FOLDER'], filename))
                product_image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                product_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            else:
                return custom_abort(400, "Invalid file format. Allowed formats: jpg, jpeg, png, gif")

        required_keys = ["name", "info", "price", "productNo", "cid", "scid"]
        for key in required_keys:
            if key not in data:
                return custom_abort(400, "Required key is missing - " + key + "-----")

        product = Products()
        [setattr(product, key, data[key]) for key in required_keys]
        product.product_path = product_path
        db.session.add(product)
        db.session.commit()
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


        ret_product = convertor(product, ["password", "reset_code"], True)
        ret_category = convertor(category, ["password", "reset_code"], True)
        ret_subcategory = convertor(subcategory, ["password", "reset_code"], True)

        if hash_info["enable_hash"] == True:
            ret_product = hash_query_results(ret_product, hash_info["hash_key"], hash_info["hash_type"])
       
        return jsonify({ "product" : ret_product,"category" : ret_category, "subcategory" : ret_subcategory,"hash_info" : hash_info }) 
    
    
    #-----------UPDATE------------------------------

    # @jwt_required()
    def update(self , request):
        data = request.form
        product_path = None

        if "pid" not in data:
            return custom_abort(400, "Required key is missing from request - id")
        
        if 'product_path' in request.files:
            product_image = request.files['product_path']
            if self.allowed_file(product_image.filename):
                filename = secure_filename(product_image.filename)
                product_image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                product_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        
        
        # identity = get_jwt_identity()
        # auth_user = get_user_from_jwt(identity)
        # if auth_user.id != data["organizer_id"]:
        #     return custom_abort(403, "Forbidden")
        # if auth_user.type_id < 2:
        #     return custom_abort(401, "You are not authorized to update users.")
        product = Products.query.filter_by(pid=data["pid"]).first()
        
        if product is None:
            return custom_abort(404, "Product not found")
            
        [setattr(product, key, data[key]) for key in self.table_keys if key in data]
        product.product_path = product_path
        db.session.commit()
        product = Products.query.filter_by(pid=product.pid).first()
        ret = convertor(product)
        return jsonify({
            "product" : ret
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
        product = Products.query.filter_by(pid=pid).first()
        if product is None:
            return custom_abort(404, "Product not found")

        ret = convertor(product)
        return jsonify({"product": ret})

ProductCrud = Product()