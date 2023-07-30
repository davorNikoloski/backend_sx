from flask import Blueprint, render_template, request, jsonify,redirect, url_for
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, InputRequired, Length, ValidationError, EqualTo
from flask_jwt_extended import get_jwt_identity, jwt_required

from Routes.Products.ProductCRUD import ProductCrud
from Config.Common import crud_routes
from Models.Models import Products, Categories, Subcategories

products_api = Blueprint('products', __name__)


#ADD----------------------------------------------------
@products_api.route('/add_product', methods=['GET'])
def add_product():
    categories = Categories.query.all()
    subcategories = Subcategories.query.all()


    return render_template('add_product.html', categories = categories, subcategories = subcategories)

@products_api.route('/create_product', methods=['POST'])
def create_product():
    response = ProductCrud.create(request)
    return response

@products_api.route('/get_subcategories', methods=['GET'])
def get_subcategories():
    cid = request.args.get('cid')
    if not cid:
        return jsonify({"subcategories": []})

    subcategories = Subcategories.query.filter_by(cid=cid).all()
    subcategories_list = [
        {"scid": subcategory.scid, "name": subcategory.name} for subcategory in subcategories
    ]
    return jsonify({"subcategories": subcategories_list})


#READ----------------------------------------------------
@products_api.route('/read_products', methods=['GET'])
def read_products():
    #response = ProductCrud.read(request)
    response = crud_routes(request, ProductCrud)
    return render_template('read_products.html', product_list=response.get_json()['product'], category_list=response.get_json()['category'], subcategory_list=response.get_json()['subcategory'])
    #return crud_routes(request, ProductCrud)


#UPDATE----------------------------------------------------
@products_api.route('/update_products/<int:pid>', methods=['GET'])
def update_product(pid):
    product = Products.query.filter_by(pid=pid).first()
    if not product:
        return "Product not found", 404
    return render_template('update_products.html', product=product)

@products_api.route('/update_products', methods=['POST'])
def save_updated_product():
    response = ProductCrud.update(request)
    return response


#DELETE----------------------------------------------------
@products_api.route('/delete_product/<int:pid>', methods=['POST'])
def delete_product(pid):
    response = ProductCrud.delete(pid)
    return response


#test
@products_api.route("/getProducts", methods=["GET", "PUT" , "POST"])
def products_crud():
    return crud_routes(request, ProductCrud)