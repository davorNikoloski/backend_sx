from Config.Constants import constants, SECRET_KEY
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

app = Flask(__name__, template_folder='../templates')

uri = "mysql+pymysql://"+constants["mysql"]["user"]+":"+constants["mysql"]["password"]+"@"+constants["mysql"]["host"]+"/"+constants["mysql"]["db_name"]+"?&autocommit=false"
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = SECRET_KEY
app.config['JWT_SECRET_KEY'] = 'secret'
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'query_string']
app.config['JWT_BLACKLIST_ENABLED'] = True

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)  # This enables CORS for all routes of your Flask app

def build_db():
    with app.app_context():
        try:
            print('buidling db')
            # Establish a connection to the database
            db.create_all()
            # The connection is valid
            print("Connection to database is valid.")

        except Exception as e:
            # An exception was raised, indicating a problem with the connection
            print("Error: Could not establish a connection to the database.")
            print("Error message:", e)

