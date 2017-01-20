#!/bin/sh -x

docker run -t --rm --name docker-checker -e "NODE_ENV=$NODE_ENV" -v "$PWD":/mnt/data -w /mnt/data node:6.9.4-alpine $@