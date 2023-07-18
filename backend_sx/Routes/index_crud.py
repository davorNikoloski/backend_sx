from Models.Models import Users
from Config.Config import app, db
from flask import jsonify

from Config import Constants, Common
from Config.Common import custom_abort, crud_routes, build_params, get_user_from_jwt, convertor, hash_query_results, get_hash_info, get_random_alphanumerical, get_extension


class User():
    def __init__(self):
        self.table_keys = {
            "id": "Integer",
            "first_name": "String",
            "last_name": "String",
            "email": "String",
            "password": "String",
            "profile_path": "String",
        }
    
    user = Users()
    def display(self, request):
        params = build_params(self.table_keys, request.args)
        user = Users.query.filter_by(**params).all()
       
        #user = Users.query.all()
        ret = convertor(user)

        return ret
        #return jsonify({
        #    "User" : ret
        #})
        

userCrud = User()