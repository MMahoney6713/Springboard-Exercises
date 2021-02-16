from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Optional, AnyOf, URL, NumberRange


class AddPetForm(FlaskForm):

    name = StringField("Pet Name", validators=[InputRequired()])
    species = StringField("Species", validators=[InputRequired(), AnyOf(['Cat','cat','Dog','dog','Porcupine', 'porcupine'], 'Species must be a Cat, Dog, or Porcupine')])
    photo_url = StringField("URL for photo (optional)",
                            validators=[Optional(), URL()])
    age = IntegerField("Age (Optional)", validators=[Optional(), NumberRange(min=0,max=30,message="Age must be between 0 and 30")])
    notes = TextAreaField("Any special notes? (Optional)",
                          validators=[Optional()])


class EditPetForm(FlaskForm):

    photo_url = StringField("URL for photo (optional)",
                            validators=[Optional(), URL()])
    notes = TextAreaField("Any special notes? (Optional)",
                          validators=[Optional()])
    available = BooleanField(default="checked")