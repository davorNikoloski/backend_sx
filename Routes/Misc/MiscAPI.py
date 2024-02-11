from flask import Blueprint, render_template, request, jsonify
from Config.Common import crud_routes, convertor
from Routes.Misc.MiscCRUD import MiscCrud
from Models.Models import Misc  # Import the Misc model

misc_api = Blueprint('misc', __name__)



@misc_api.route('/update_banner', methods=['POST'])
def update_banner():
    response = MiscCrud().update_banner()
    return response

@misc_api.route('/change_banner', methods=['GET'])
def change_banner():
        return render_template('change_banner.html')

@misc_api.route('/get_miscs', methods=['GET'])
def get_miscs():
    
    miscs = Misc.query.all()
    ret_misc = [{"banner_url": misc.banner_url } for misc in miscs]

    return jsonify({"miscs": ret_misc})
