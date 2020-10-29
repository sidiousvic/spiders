#!/bin/bash
cd spiders.nginx

git pull

sudo nginx -s reload
