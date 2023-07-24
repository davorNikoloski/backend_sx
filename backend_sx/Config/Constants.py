constants = {
    "local" : {
        "mysql": {
            "db_name": "Ecomm",
            "host": "localhost",
            "user": "root",
            "password": "admin11",
        },
        #"static_root": "/usr/share/nginx/html/zelenaoaza/"
    },
}
SECRET_KEY = "420420420420420"
selector = "local"
constants = constants[selector]