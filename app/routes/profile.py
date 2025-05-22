from flask import Blueprint, render_template
from flask_login import login_required, current_user
from datetime import datetime

bp = Blueprint("profile", __name__)

@bp.route("/profile")
@login_required
def profile():
    saved_recipes = current_user.favorite_recipes.all()

    day_number = None
    if current_user.fermentation_start:
        delta = datetime.utcnow() - current_user.fermentation_start
        day_number = delta.days + 1

    return render_template(
        "profile.html",
        recipes=saved_recipes,
        day_number=day_number
    )
