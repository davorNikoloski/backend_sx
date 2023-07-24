from Models.Models import Users
from Config.Config import app, db
from Config.Common import custom_abort, get_user_from_jwt, convertor, get_hash_info, build_params
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity
import datetime, random
from flask import jsonify

class UserAuth():
    def __init__(self):
        self.table_keys = {
            "uid": "Integer",
            "first_name": "String",
            "last_name": "String",
            "email": "String",
            "password": "String",
            "profile_path": "String",
        }
        pass

    def register(self, request):
        data = request.form
        required = ["first_name", "last_name", "email", "password"]
        for key in required:
            if key not in data:
                return custom_abort(400, "Недостасува компулсивен клуч - " + key)

        # confirm = ""
        # for character in random.sample(range(0, 9), 5):
        #     confirm = confirm + str(character)

        existing_email = Users.query.filter_by(email=data["email"]).first()
        if existing_email is not None:
            return custom_abort(409, "Оваа е-пошта веќе е во базата на податоци.")

        if int(data["type_id"]) in [2, 3]:
            return custom_abort(409, "Не смеете да креирате корисник од овој тип.")
        
        user = Users()
        [setattr(user, key, data[key]) for key in required]
        db.session.add(user)
        db.session.commit()
        user = Users.query.filter_by(id = user.uid).first()

        ret = convertor(user, ["password", "confirmed"])
        access = create_access_token(ret, expires_delta=datetime.timedelta(days = 1))
        refresh = create_refresh_token(ret, expires_delta=datetime.timedelta(days = 30))
        return jsonify({
            "user": ret,
            "access": access,
            "refresh" : refresh
        })


    def login(self, request):
        data = request.form
        required = ["email", "password"]

        for key in required:
            if key not in data:
                return "Missing required key: " + key, 400

        user = Users.query.filter_by(email=data["email"], password=data["password"]).first()

        if user is None:
            return "Invalid email or password", 401

        ret = convertor(user, ["password", "confirmed"])
        access = create_access_token(ret, expires_delta=datetime.timedelta(days=1))
        refresh = create_refresh_token(ret, expires_delta=datetime.timedelta(days=30))

        # Return the response data as a dictionary
        return {
            "user": ret,
            "access": access,
            "refresh": refresh
        }, 200
        
    def resend_email_code(self, reqeust):
        pass

    def verify_email(self, reqeust):
        pass

user_auth = UserAuth()