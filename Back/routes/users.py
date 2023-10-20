from models.models import Users, db
from flask import jsonify, Blueprint


routes_users = Blueprint("routes_users", __name__)


@routes_users.route("/user/<int:id>")
def get_user(id):
    user = db.get_or_404(Users, id).serialize()
    return jsonify(user)


@routes_users.route("/user/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = db.get_or_404(Users, id)
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "deleted"}), 200
