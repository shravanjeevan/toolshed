# Generated by Django 3.0 on 2020-08-10 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20200809_0216'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='knowledgebasetag',
            name='blog_post_id',
        ),
        migrations.AddField(
            model_name='knowledgebaseitem',
            name='tags',
            field=models.ManyToManyField(related_name='knowledge_base_tag', to='api.KnowledgeBaseTag'),
        ),
    ]
