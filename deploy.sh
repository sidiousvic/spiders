#!/bin/bash

git pull

npm run deploy

sudo nginx -s reload
