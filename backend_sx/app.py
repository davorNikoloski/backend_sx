from Config.Config import app, db
from Routes.index import index_tp

#from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
#from flask_wtf import FlaskForm
#from wtforms import StringField, PasswordField, SubmitField, validators
#from wtforms.validators import InputRequired, Length, ValidationError, Email, EqualTo
#from flask_bcrypt import Bcrypt
#from datetime import datetime
#import calendar

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

app.register_blueprint(index_tp)
if __name__ == "__main__":
    app.run(debug=True) 

#--------------------TODO-------------------------------
