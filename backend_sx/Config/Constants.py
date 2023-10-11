constants = {
    "local": {
        "mysql": {
            "db_name": "Ecomm",
            "host": "localhost",
            "user": "root",
            "password": "admin11",
        },
        "static_root": r"C:\Users\Davor\Desktop\Shopex\backend_sx\Static\img\products"
    },
    "remote": {
        "mysql": {
            "db_name": "Ecomm",
            "host": "142.93.109.181",
            "user": "root",
            "password": "!123ShopexPass",
        },
        "static_root": "/usr/share/nginx/html/shopex/"
    },
}

SECRET_KEY = "420420420420420"
selector = "local"
constants = constants[selector]