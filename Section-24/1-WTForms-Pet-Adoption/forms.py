from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, Optional


class AddPetForm(FlaskForm):

    name = StringField("Pet Name", validators=[InputRequired()])
    species = StringField("Species", validators=[InputRequired()])
    photo_url = StringField("URL for photo (optional)",
                            validators=[Optional()])
    age = IntegerField("Age (Optional)", validators=[Optional()])
    notes = TextAreaField("Any special notes? (Optional)",
                          validators=[Optional()])
