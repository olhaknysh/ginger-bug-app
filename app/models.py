from . import db
from flask_login import UserMixin
from sqlalchemy.types import JSON
from sqlalchemy.ext.mutable import MutableList

favorites = db.Table(
    "favorites",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("recipe_id", db.Integer, db.ForeignKey("recipe.id"), primary_key=True)
)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    fermentation_start = db.Column(db.DateTime, nullable=True)

    favorite_recipes = db.relationship(
        "Recipe",
        secondary=favorites,
        backref=db.backref("favorited_by", lazy="dynamic"),
        lazy="dynamic"
    )

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text)
    steps = db.Column(MutableList.as_mutable(JSON))
