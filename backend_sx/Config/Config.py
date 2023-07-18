from Config.Constants import constants, SECRET_KEY
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, template_folder='../templates')

uri = "mysql+pymysql://"+constants["mysql"]["user"]+":"+constants["mysql"]["password"]+"@"+constants["mysql"]["host"]+"/"+constants["mysql"]["db_name"]+"?&autocommit=false"
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = SECRET_KEY
db = SQLAlchemy(app)

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

