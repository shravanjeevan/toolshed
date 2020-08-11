#!/usr/bin/env bash

curl -X POST -F "username=jdean" -F "password=aStrongPassword" -F "email=jdean@cse.unsw.edu.au" -F "first_name=Jeff" -F "last_name=Dean" localhost:8000/auth/register/

curl -X POST -F "username=morty" -F "password=aStrongPassword" -F "email=morty@cse.unsw.edu.au" -F "first_name=Mortada" -F "last_name=Al-Banna" localhost:8000/auth/register/

curl -X POST -F "username=boualem" -F "password=aStrongPassword" -F "email=bb@cse.unsw.edu.au" -F "first_name=Boualem" -F "last_name=Benatallah" localhost:8000/auth/register/

curl -d "@1.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/

curl -d "@2.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/

curl -d "@3.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/

curl -d "@4.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/



