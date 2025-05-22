from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Length, EqualTo

class RegistrationForm(FlaskForm):
    username = StringField("Імʼя", validators=[DataRequired(), Length(min=4, max=20)])
    password = PasswordField("Пароль", validators=[DataRequired(), Length(min=6, max=20)])
    confirm_password = PasswordField("Підтвердити пароль", validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField("Реєстрація")

class LoginForm(FlaskForm):
    username = StringField("Імʼя", validators=[DataRequired()])
    password = PasswordField("Пароль", validators=[DataRequired()])
    submit = SubmitField("Залогінитись")
