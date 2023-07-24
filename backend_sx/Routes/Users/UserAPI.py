from flask import Blueprint, render_template, request, jsonify,redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, InputRequired, Length, ValidationError, EqualTo
from flask_jwt_extended import get_jwt_identity, jwt_required


from Routes.Users.UserCRUD import userCrud
from Routes.Users.UserAUTH import UserAuth

from Config.Common import crud_routes
index_tp = Blueprint('index', __name__)

#-----------------------FORMS------------------

#---------LOGIN FORM---------------
class loginForm(FlaskForm):
    email=StringField(validators=[InputRequired(), Email(), Length(min=4, max=20)],
    render_kw={"placeholder": "Email"})

    password=PasswordField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "Password"})

    submit = SubmitField("Login")

#---------REGISTER FORM---------------
class registerForm(FlaskForm):

    firstName=StringField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "First Name"})

    lastName=StringField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "Last Name"})

    email = StringField('Email', validators=[InputRequired(), Email()],
    render_kw={"placeholder": "Email"})

    password=PasswordField(validators=[InputRequired(), Length(min=4, max=20)],
    render_kw={"placeholder": "Password"})

    confirm_password = PasswordField('Confirm Password', validators=[InputRequired(), Length(min=4, max=20), EqualTo('password', message='Passwords must match')],
    render_kw={"placeholder": "Confirm"})

    submit = SubmitField("Register")

    #def validate_user(self, username, email):
        #existing_user_email = User.query.filter_by(email=email.data).first()
        #if existing_user_email:
            #raise ValidationError(
             #   "That Email already exists, please choose another one."
            #)



#ROUTES-----------------------
@index_tp.route('/', methods=["GET", "UPDATE"])
def index():
    #current_user = get_jwt_identity()  # Get the user information from the JWT token


    response = crud_routes(request, userCrud)
    return render_template('index.html', users=response.get_json()['user'])


#-------------------LOGIN--------------------------------

@index_tp.route('/login', methods=["GET", "POST"])
def login():
    form=loginForm()

    if request.method == "POST" and form.validate_on_submit():
        # Handle form submission and authentication here
        # Assuming UserAuth().login(request) returns a tuple (response, status_code)
        response, status_code = UserAuth().login(request)
        if status_code == 200:  # Replace 200 with the appropriate status code for successful login
            access_token = response.get("access")
            #if access_token:
                # Set the JWT token in the cookies (optional)
                #response.set_cookie("access_token_cookie", value=access_token)
            # Redirect to the 'index' route after successful login
            return redirect(url_for('index.index'))
        else:
            # Handle unsuccessful login here, maybe show an error message to the user
            error_message = response
            return render_template('login.html', form=form, error_message=error_message)

    return render_template('login.html', form=form)


@index_tp.route('/register', methods=["GET", "POST"])
def register():
    form=registerForm()

    if request.method == "POST" and form.validate_on_submit():
        # Handle form submission and authentication here
        # Assuming UserAuth().login(request) returns a tuple (response, status_code)
        response, status_code = UserAuth().login(request)
        if status_code == 200:  # Replace 200 with the appropriate status code for successful login
            access_token = response.get("access")
            #if access_token:
                # Set the JWT token in the cookies (optional)
                #response.set_cookie("access_token_cookie", value=access_token)
            # Redirect to the 'index' route after successful login
            return redirect(url_for('index.index'))
        else:
            # Handle unsuccessful login here, maybe show an error message to the user
            error_message = response
            return render_template('register.html', form=form, error_message=error_message)

    return render_template('register.html', form=form)

@index_tp.route('/users', methods=["GET", "UPDATE"])
def users():
    #current_user = get_jwt_identity()  # Get the user information from the JWT token
    return {"users": ["User1", "User2", "User3"]}