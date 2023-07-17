from flask import Flask, render_template, request, redirect, flash, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, or_

#from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
#from flask_wtf import FlaskForm
#from wtforms import StringField, PasswordField, SubmitField, validators
#from wtforms.validators import InputRequired, Length, ValidationError, Email, EqualTo
#from flask_bcrypt import Bcrypt
#from datetime import datetime
#import calendar


#------------IMPORT CONSTATNTS
from Config.Constants import constants

app = Flask(__name__)

app.config.from_object("Config.Constants")

uri = "mysql+pymysql://"+constants["mysql"]["user"]+":"+constants["mysql"]["password"]+"@"+constants["mysql"]["host"]+"/"+constants["mysql"]["db_name"]+"?&autocommit=false"
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "tajna_golema"

db = SQLAlchemy(app)

#------------------------------
if __name__ == "__main__":
    from Routes.index import index_tp
    

    #DB CONNECTION
    with app.app_context():
        try:
            # Establish a connection to the database
            db.create_all()
            # The connection is valid
            print("Connection to database is valid.")

        except Exception as e:
            # An exception was raised, indicating a problem with the connection
            print("Error: Could not establish a connection to the database.")
            print("Error message:", e)

    app.register_blueprint(index_tp)
    app.run(debug=True) 

#--------------------TODO-------------------------------
