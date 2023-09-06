# Generated by Django 4.2.4 on 2023-09-05 19:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('App', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NutritionPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.TextField(default='')),
                ('goal', models.CharField(max_length=255)),
                ('duration', models.PositiveIntegerField()),
                ('guideline', models.TextField()),
                ('trainerId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='App.trainer')),
            ],
            options={
                'db_table': 'nutritionplan_table',
            },
        ),
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.TextField(default='')),
                ('calories', models.PositiveIntegerField()),
                ('protein', models.FloatField()),
                ('carbs', models.FloatField()),
                ('fats', models.FloatField()),
                ('description', models.TextField(default='')),
                ('nutritionId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='App.nutritionplan')),
            ],
            options={
                'db_table': 'food_table',
            },
        ),
    ]
