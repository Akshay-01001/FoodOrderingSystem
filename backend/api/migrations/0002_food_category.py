# Generated by Django 5.1 on 2024-09-21 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='food',
            name='category',
            field=models.CharField(default='default', max_length=255),
            preserve_default=False,
        ),
    ]
