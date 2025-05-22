from flask import Blueprint, render_template, jsonify, request
from flask_login import login_required, current_user
from datetime import datetime
from ..models import Recipe
from .. import db

bp = Blueprint("main", __name__)

@bp.route("/")
@bp.route("/about")
def about():
    return render_template("about.html")

@bp.route("/recipes")
def recipes():
    all_recipes = Recipe.query.all()
    return render_template("recipes.html", recipes=all_recipes)

@bp.route("/toggle_favorite/<int:recipe_id>", methods=["POST"])
@login_required
def toggle_favorite(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    if current_user.favorite_recipes.filter_by(id=recipe_id).first():
        current_user.favorite_recipes.remove(recipe)
        db.session.commit()
        return jsonify({"status": "removed"})
    else:
        current_user.favorite_recipes.append(recipe)
        db.session.commit()
        return jsonify({"status": "added"})

@bp.route("/countdown")
def countdown():
    current_day = 1
    if current_user.is_authenticated and current_user.fermentation_start:
        current_day = (datetime.utcnow() - current_user.fermentation_start).days + 1
        if current_day > 7:
            current_day = 7
    return render_template("countdown.html", datetime=datetime, current_day=current_day)

@bp.route('/start_fermentation', methods=['POST'])
@login_required
def start_fermentation():
    current_user.fermentation_start = datetime.utcnow()
    db.session.commit()
    return jsonify({
        "status": "success",
        "start_date": current_user.fermentation_start.isoformat(),
        "day": 1
    })

@bp.route('/stop_fermentation', methods=['POST'])
@login_required
def stop_fermentation():
    current_user.fermentation_start = None
    db.session.commit()
    return jsonify({"status": "stopped"})
