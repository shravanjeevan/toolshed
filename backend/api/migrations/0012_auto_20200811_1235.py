# Generated by Django 3.0 on 2020-08-11 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20200811_0916'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpostcomment',
            name='created_on',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
