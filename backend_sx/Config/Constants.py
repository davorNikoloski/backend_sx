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
    "selector" : "local"
}
SECRET_KEY = "tajna_golema"
constants = constants[constants["selector"]]