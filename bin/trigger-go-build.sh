#!/bin/bash

curl -v -X POST \
https://api.travis-ci.com/repo/mysteriumnetwork%2Fgo-dvpn-web/requests \
-H 'authorization: token "'"$1"'"' \
-H 'cache-control: no-cache' \
-H 'content-type: application/json' \
-H 'travis-api-version: 3' \
-d '{ "request": {
        "config": {
            "env": {
                "GIT_TAG_VERSION": "'"$2"'"
            }
        }
      }
}'
