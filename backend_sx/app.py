from Config.Config import app, db
from Routes.Users.UserAPI import user
from Routes.Products.ProductAPI import products_api
from Routes.Categories.CategoryAPI import categories_api
from Routes.Categories.SubcategoryAPI import subcategories_api
from Routes.Contact.ContactAPI import contact_api
from Routes.Order.Order import order_api

from Routes.Admin.AdminAPI import admin_api



with app.app_context():
    try:
        print('buidling db')
        # Establish a connection to the database
        db.create_all()
        # The connection is valid
        print("Connection to database is valid.")

    except Exception as e:
        # An exception was raised, indicating a problem with the connection
        print("Error: Could not essk rutablish a connection to the database.")
        print("Error message:", e)

app.register_blueprint(user, url_prefix='/auth')
app.register_blueprint(products_api, url_prefix='/products')
app.register_blueprint(categories_api, url_prefix='/categories')
app.register_blueprint(subcategories_api, url_prefix='/subcategories')
app.register_blueprint(contact_api, url_prefix='/contact')
app.register_blueprint(order_api, url_prefix='/order')

app.register_blueprint(admin_api, url_prefix='/secret')




if __name__ == "__main__":
    app.run(debug=True) 

#--------------------TODO-------------------------------
    #- Fix the Sidebar design and functionality
                    #DONE, Just the design
    
    #- Add when subcategory is selected a new route with that 
        # subcategory name and render products only with that   
        # scid like in the similar products card
                   # DONE
    
    #- Add a shopping card functionality
        # (When clicked add to cart it adds the item in that session
        # and when you go to check out if logged in the form
        # is already pre-filled with the data available
        # also everything that is chosen in the form
        # gets sent as an email "Order" to the mail for orders
        # with all the data filled in "name, adress, email, 
        # product, quantity, and also the price of the
        # product is displayed in the mail and some other info 
        # from the product")
                    #DONE

    #- Imorove the admin panel so as everything is in one place

    #- Add auth to the admin panel
                    #DONE
    #- Improve the overall design of the website

    #- Get a domain and publish the website


            ####Navbar is fucked