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
            "host": "143.198.153.179",
            "user": "root",
            "password": "!Jakpasvord123",
        },
        "static_root": "/usr/share/nginx/html/shopex/"
    },
}

SECRET_KEY = "420420420420420"
selector = "remote"
constants = constants[selector]
