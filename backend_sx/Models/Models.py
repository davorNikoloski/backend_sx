from Config.Config import db
from flask_login import UserMixin

#USERS-----------------------------------------------------------
class Users(db.Model):
    __tablename__ = 'Users'
    uid = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(256), nullable=False, unique=True)
    password = db.Column(db.String(512), nullable=False)
    profile_path = db.Column(db.String(256), nullable=True)


#CATEGORIES-----------------------------------------------------------
    #CATEGORY-----------------------------------------------------------
class Categories(db.Model):
    __tablename__ = 'Categories'
    cid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    info = db.Column(db.String(128), nullable=False)
    
    #SUBCATEGORY-----------------------------------------------------------
class Subcategories(db.Model):
    __tablename__ = 'Subcategories'
    scid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    info = db.Column(db.String(128), nullable=False)

    cid = db.Column(db.Integer, db.ForeignKey('Categories.cid'), nullable=True)

    Categories = db.relationship('Categories', backref=db.backref('Subcategories', lazy=True))


#PRODUCTS-----------------------------------------------------------
class Products(db.Model):
    __tablename__ = 'Products'
    pid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    info = db.Column(db.String(256), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    productNo = db.Column(db.String(128), nullable=True)
    product_path = db.Column(db.String(256), nullable=True, default='default_path.jpg')
    
    cid = db.Column(db.Integer, db.ForeignKey('Categories.cid'), nullable=True)
    scid = db.Column(db.Integer, db.ForeignKey('Subcategories.scid'), nullable=True)

    Categories = db.relationship('Categories', backref=db.backref('Products', lazy=True))
    Subcategories = db.relationship('Subcategories', backref=db.backref('Products', lazy=True))


#PRODUCTS-----------------------------------------------------------
class Auth(db.Model, UserMixin):
    __tablename__ = 'auth'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(128), nullable=False)

    def get_id(self):
        return str(self.id)