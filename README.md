# toolshed
COMP9323 20T2 Group 8

## Starting up the app
```bash
$ docker-compose up

# if you need to build fresh images, do this:
$ docker-compose up --build

```

## Running a database migration

A database migration will happen as soon as the app starts up using docker-compose.
To run your own after making changes to your model, do so like this:

```bash
$ docker-compose exec backend python manage.py makemigrations

$ docker-compose exec backend python manage.py migrate
```

## Connecting to the database as a human


```
$ docker-compose up

# See that it's running:
$ docker ps


# You;ll be prompted for the password
$ psql -h 0.0.0.0 -p5432 -U app_user toolbox
```

## Accessing the Django admin panel
**Username:** admin
**Password:** password