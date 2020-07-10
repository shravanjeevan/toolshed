# toolshed
COMP9323 20T2 Group 8

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