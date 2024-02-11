# MiscCRUD.py
from flask import request, jsonify
from werkzeug.utils import secure_filename
from Models.Models import db, Misc
from Config.Common import custom_abort
import os
from Config.Config import app
from Config.Common import custom_abort, crud_routes, build_params, get_user_from_jwt, convertor, hash_query_results, get_hash_info, get_random_alphanumerical, get_extension

class MiscCrud:
    def update_banner(self):
        try:
            # Assuming you are passing the 'banner' file in the request
            banner_image = request.files.get('banner')

            if not banner_image:
                return custom_abort(400, "No banner image provided.")

            # Get the existing Misc record (assuming you have only one record)
            misc_record = Misc.query.first()

            if not misc_record:
                # If no record exists, create a new one
                misc_record = Misc()

            # Save the new banner image
            misc_record.banner_url = self.save_banner_image(banner_image)

            db.session.add(misc_record)
            db.session.commit()

            return jsonify({'message': 'Banner updated successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return custom_abort(500, str(e))
        finally:
            db.session.close()

    def save_banner_image(self, image):
        # Implement the logic to save the banner image to your desired location
        # You can use your existing logic for saving the image
        # Example:
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image.save(image_path)
        return filename

    def read(self , request):
            hash_info = get_hash_info(request.args)
            params = build_params(self.table_keys, request.args)

            misc = Misc.query.filter_by(**params).all()
            ret = convertor(misc, ["password", "reset_code"], True)
            if hash_info["enable_hash"] == True:
                ret = hash_query_results(ret, hash_info["hash_key"], hash_info["hash_type"])


            return jsonify({"misc": ret, "hash_info": hash_info})
    
