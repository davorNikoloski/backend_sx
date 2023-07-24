from Models.Models import Products
from Config.Config import app, db

from flask import jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity, jwt_required
from Config import Constants, Common
from Config.Common import custom_abort, crud_routes, build_params, get_user_from_jwt, convertor, hash_query_results, get_hash_info, get_random_alphanumerical, get_extension

#MODEL
class Product():
    def __init__(self): 
        self.table_keys = {
            "pid": "Integer",
            "name": "String",
            "info": "String",
            "price": "Integer",
            "productNo": "String",
            
            "cid": "Integer",
            "scid": "Integer",
    }
        
#-----------------CRUD---------------------------
    #-----------CREATE------------------------------
    def create(self , request):
        data = request.form
        print(data)
        # print(data["type_id"])
        required_keys = ["name","info","price","productNo"]
        optional_keys = ["cid","scid"]
        for key in required_keys:
            if key not in data:
                return custom_abort(400, "Недостасува компулсивен клуч - " + key)
                
            product = Products() 
            #event = Events(banner_photo = "")
            [setattr(product, key, data[key]) for key in required_keys]
            db.session.add(product)
            db.session.commit()
            product = Products.query.filter_by(pid=product.pid).first()

            ret = convertor(product)

            return jsonify({
                "product" : ret
            })
        
    #-----------READ------------------------------

    def read(self , request):
        hash_info = get_hash_info(request.args)
        params = build_params(self.table_keys, request.args)
        
        product = Products.query.filter_by(**params).all()
        ret = convertor(product, ["password", "reset_code"], True)

        if hash_info["enable_hash"] == True:
            ret = hash_query_results(ret, hash_info["hash_key"], hash_info["hash_type"])

        return jsonify({ "product" : ret, "hash_info" : hash_info }) 
    
    
    #-----------UPDATE------------------------------

    # @jwt_required()
    def update(self , request):
        data = request.form
        if "pid" not in data:
            return custom_abort(400, "Required key is missing from request - id")
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

        # Delete the product from the database
        db.session.delete(product)
        db.session.commit()

        return jsonify({
            "message": "Product deleted successfully"
        })

ProductCrud = Product()