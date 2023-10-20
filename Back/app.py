from flask import Flask, jsonify
from flask_cors import CORS
from models.models import db
from routes.auth import routes_auth
from routes.users import routes_users
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")

jwt = JWTManager(app)

db.init_app(app)

app.register_blueprint(routes_auth, url_prefix="/api")
app.register_blueprint(routes_users, url_prefix="/api")


@app.route("/")
def home():
    return "API running"


if __name__ == "__main__":
    app.run(debug=True, port="4000", host="0.0.0.0")
