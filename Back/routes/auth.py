from models.models import Users, db
from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
routes_auth = Blueprint("routes_auth", __name__)


@routes_auth.route("/login", methods=["POST"])
def login():
    request_body_user = request.get_json()

    if not request_body_user:
        return jsonify({"message": "Missing fields"})

    user = Users.query.filter(Users.username == request_body_user["username"]).first()

    if not user:
        return jsonify({"message": "Invalid username or password"}), 403

    if bcrypt.check_password_hash(user.password, request_body_user["password"]):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)


@routes_auth.route("/register", methods=["POST"])
def add_user():
    request_body_user = request.get_json()

    userCheck = Users.query.filter(
        Users.username == request_body_user["username"]
    ).first()
    if userCheck:
        return jsonify({"message": "Username already in use."}), 403

    userEmail = Users.query.filter(Users.email == request_body_user["email"]).first()
    if userEmail:
        return jsonify({"message": "Email already in use."}), 403

    pw_hash = bcrypt.generate_password_hash(request_body_user["password"]).decode(
        "utf-8"
    )

    user = Users(
        username=request_body_user["username"],
        email=request_body_user["email"],
        password=pw_hash,
    )

    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User added"}), 201


@routes_auth.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    id = get_jwt_identity()
    user = db.get_or_404(Users, id).serialize()
    return jsonify(user), 200
