from django.db import models

# Create your models here.

class District(models.Model):
    name=models.CharField(max_length=128, null=False)

    def __str__(self) -> str:
        return super().__str__()




