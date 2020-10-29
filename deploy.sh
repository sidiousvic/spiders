#!/bin/bash

git pull

npm run deploy

cp spiders.nginx  /etc/nginx/sites-available/spiders.conf

nginx -s reload
