constants = {
    "local" : {
        "mysql": {
            "db_name": "Ecomm",
            "host": "localhost",
            "user": "root",
            "password": "admin11",
        },
        "static_root": "C:/Users/Davor/...."
    },
    "remote" : {
        "mysql": {
            "db_name": "Ecomm",
            "host": "localhost",
            "user": "root",
            "password": "!123ShopexPass",
        },
        "static_root": "/usr/share/nginx/html/shopex/"
    },
}
SECRET_KEY = "420420420420420"
selector = "remote"
constants = constants[selector]