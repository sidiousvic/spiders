#!/bin/bash
git pull

git submodule update --init --recursive

npm run deploy


