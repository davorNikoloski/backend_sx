from flask import Blueprint, render_template, request, jsonify, redirect, url_for, flash
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import check_password_hash

from Routes.Products.ProductCRUD import ProductCrud
from Routes.Categories.CategoryCRUD import CategoryCrud
from Routes.Categories.SubcategoryCRUD import SubcategoryCrud

from Config.Common import crud_routes, convertor
from Models.Models import Products, Categories, Subcategories, Auth

admin_api = Blueprint('Auth', __name__)

from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user

from Config.Config import app, db, login_manager


#MODEL
class AuthConfig():
    def __init__(self): 
        self.table_keys = {
            "id": "Integer",
            "username": "String",
            "password": "String",
    }
    

@login_manager.user_loader
def load_user(user_id):
    return Auth.query.get(int(user_id))


@admin_api.route('/adminAuth', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        print("Attempting login with username:", username)
        
        admin = Auth.query.filter_by(username=username).first()

        if admin and admin.password == password:  # Compare passwords without hashing
            print("Login successful for user:", username)
            login_user(admin)
            return redirect(url_for('products.read_products'))

        print("Invalid login attempt for user:", username)
        flash('Invalid username or password', 'danger')

    return render_template('adminAuth.html')

@admin_api.route('/logoutAdmin', methods=['GET'])
@login_required
def logout():
    logout_user()
    return redirect(url_for('Auth.login'))  # Change 'auth.login' to 'Auth.login'










#ADD----------------------------------------------------
@admin_api.route('/add_product', methods=['GET'])
def add_product():
    categories = Categories.query.all()
    subcategories = Subcategories.query.all()


    return render_template('add_product.html', categories = categories, subcategories = subcategories)

@admin_api.route('/create_product', methods=['POST'])
def create_product():
    response = ProductCrud.create(request)
    return response


#READ----------------------------------------------------
@admin_api.route('/read_products', methods=['GET'])
@login_required
def read_products():
    #response = ProductCrud.read(request)
    response = crud_routes(request, ProductCrud)
    return render_template('read_products.html', product_list=response.get_json()['products'], category_list=response.get_json()['category'], subcategory_list=response.get_json()['subcategory'])
    #return crud_routes(request, ProductCrud)


#UPDATE----------------------------------------------------
@admin_api.route('/update_products/<int:pid>', methods=['GET'])
def update_product(pid):
    product = Products.query.filter_by(pid=pid).first()
    if not product:
        return "Product not found", 404
    return render_template('update_products.html', product=product)

@admin_api.route('/update_products', methods=['POST'])
def save_updated_product():
    response = ProductCrud.update(request)
    return response


#------------SUBCATEGORIES--------------------------------
#ADD----------------------------------------------------
@admin_api.route('/add_subcategory', methods=['GET'])
def add_subcategory():
    categories = Categories.query.all()
    return render_template('add_subcategory.html', categories = categories)

@admin_api.route('/create_subcategory', methods=['POST'])
def create_subcategory():
    response = SubcategoryCrud.create(request)
    return response


#READ----------------------------------------------------
@admin_api.route('/read_subcategories', methods=['GET'])
def read_subcategories():
    response = crud_routes(request, SubcategoryCrud)
    return render_template('read_subcategories.html', subcategory_list=response.get_json()['subcategory'], category_list=response.get_json()['category'])



#UPDATE----------------------------------------------------
@admin_api.route('/update_subcategory/<int:scid>', methods=['GET', 'POST'])
def update_subcategory(scid):
    subcategory = Subcategories.query.filter_by(scid=scid).first()
    category_list = Categories.query.all()

    if not subcategory:
        return "Subcategory not found", 404

    return render_template('update_subcategory.html', subcategory=subcategory, category_list=category_list)

@admin_api.route('/update_subcategory', methods=['GET', 'POST'])
def save_updated_subcategory():
    response = SubcategoryCrud.update(request)

    if response.status_code == 200 :
        flash('Subcategory updated successfully!', 'success')
        return redirect(url_for('subcategories.read_subcategories'))
    else:
        return response
    
#DELETE----------------------------------------------------
@admin_api.route('/delete_subcategory/<int:scid>', methods=['GET', 'POST'])
def delete_subcategory(scid):
    subcategory = Subcategories.query.filter_by(scid=scid).first()
    if not subcategory:
        return "Subcategory not found", 404

    if request.method == 'POST':
        response = SubcategoryCrud.delete(scid)
        return response

    return render_template('delete_subcategory.html', subcategory=subcategory)



#-------------------CATEGORIES--------------------------


