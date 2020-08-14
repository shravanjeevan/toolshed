# The Toolshed

## Quick Start Guide

### 1. Installing Docker
Navigate to the Docker download [page](https://www.docker.com/products/docker-desktop) and install the Docker Desktop version that is comptabile with your machine. Verify the installation by running:
```bash
$ docker --version
```
### 2. Clone repository
Clone this repository to a directory of choice by running:
```bash
$ git clone https://github.com/shravanjeevan/toolshed.git
```

### 3. Running the application
To fire up the application for the first time, you will need to fetch fresh Docker images. Navigate to the directory in which you have just cloned the repository and run:
```bash
$ docker-compose up --build
```
This will take several minutes to complete.

Navigate to http://localhost:3000 or http://0.0.0.0:3000 to access the UI.

Navigate to http://localhost:8000 or http://0.0.0.0:8000 to access the backend and API.

#### Quick Start Troubleshooting Guide

If this does not work the first time, please do not panic. Docker is always difficult to get working on the first try.

**Common Windows Issues**

If you are a Windows user, you may need to manually enable Hyper-V for virtualisation. 
You will also need to allow running of Linux containers. For more information, please refer to the documentation [here](https://docs.microsoft.com/en-us/virtualization/windowscontainers/quick-start/quick-start-windows-10-linux) from Microsoft.

#### Other Useful Docker Commands
To shutdown the application, run:
```bash
$ docker-compose-down
```
To fire up the application in the future, you can just use:
```bash
$ docker-compose up
```
In the event, you would like to build fresh images again, run:
```bash
$ docker-compose up --force-recreate
```
To rebuild an individual Docker image from scratch, just run:
```bash
$ docker-compose build --no-cache <ui|backend>
```
Ensure that docker services are running by:
```bash
$ docker ps
```
You should see four different services for The Toolshed with Image names resembling:
- elasticsearch
- toolshed_backend
- toolshed_ui
- postgres

### 4. Adding Sample Data to the Database
If you would like to test the app and play around with the different features, it is advisable that you enter some sample data into it. This can easily be done using a script that has been written. Once the app is running and responsive to search (ElasticSearch takes a couple of minutes to get up and running), we can load test data like so:
```bash
$ cd backend/data
$ sh load-data.sh
```
----------
<br>

## Performing Management Tasks
### Technologies Used
The Toolshed makes use of many powerful open source libraries and software. They include:
- Docker
- Python 3.8
- Django
- PostgreSQLz
- ElasticSearch
- React


### Running a database migration
Database migrations are the method through changes to the database are defined in code and executed onto the database serivce. A database migration will happen as soon as the app starts up using docker-compose.
To run your own after making changes any changes, run:

```bash
$ docker-compose exec backend python manage.py makemigrations

$ docker-compose exec backend python manage.py migrate
```

### Connecting to the database directly
Ensure that all services are running on Docker. Then run:
```bash
$ psql -h 0.0.0.0 -p5432 -U app_user toolbox
```
At the password prompt, type in:
```
app_password
```
The `psql` prompt should then pop up allowing you to run SQL commands and perform other changes to the database. It is however, strongly advised that you only make schema and model changes using the Django migrations. Getting the database out-of-sync with the migrations is difficult to fix.

### Creating a superuser account for Django (Backend service)
Once the containers are running, run:
```bash
$ docker-compose exec backend python manage.py createsuperuser
```
Follow the prompts to define a username, email and password for this user.

### API Reference
The ToolShed has robust REST API. Please refer to the [API_REFERENCE](https://github.com/shravanjeevan/toolshed/blob/master/API_REFERENCE.md) if you wish to access it.