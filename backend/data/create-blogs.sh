#!/usr/bin/env bash

curl -d "@1.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/

curl -d "@2.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/

curl -d "@3.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/

curl -d "@4.json" -H "Content-Type: application/json" -X POST localhost:8000/posts/



