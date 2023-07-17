from flask import Blueprint, render_template, request
from Routes.index_crud import userCrud

index_tp = Blueprint('index', __name__)


@index_tp.route('/', methods=["GET", "PUT", "POST"])
def index():
    users = userCrud.display(request)
    return render_template('index.html', users=users)
