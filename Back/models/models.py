from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(50))
    date_added = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return "<Users %r>" % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            # do not serialize the password, its a security breach
        }
