from Config.Config import app, db
from Routes.Users.UserAPI import index_tp
from Routes.Products.ProductAPI import products_api
from Routes.Categories.CategoryAPI import categories_api
from Routes.Categories.SubcategoryAPI import subcategories_api




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

app.register_blueprint(index_tp, url_prefix='/user')
app.register_blueprint(products_api, url_prefix='/products')
app.register_blueprint(categories_api, url_prefix='/categories')
app.register_blueprint(subcategories_api, url_prefix='/subcategories')



if __name__ == "__main__":
    app.run(debug=True) 

#--------------------TODO-------------------------------
