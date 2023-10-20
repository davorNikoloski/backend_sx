constants = {
    "local": {
        "mysql": {
            "db_name": "Ecomm2",
            "host": "localhost",
            "user": "davor",
            "password": "Davornik123321",
        },
        "static_root": r"/home/davor/Pictures/Static-Sx/"
    },
    "remote": {
        "mysql": {
            "db_name": "Ecomm",
            "host": "143.198.153.179",
            "user": "root",
            "password": "!Jakpasvord123",
        },
        "static_root": "/usr/share/nginx/html/static/"
    },
}

SECRET_KEY = "420420420420420"
selector = "remote"
constants = constants[selector]
