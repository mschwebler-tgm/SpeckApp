#!/bin/bash

dockerContainerName='dynamo-local'


exitfn() {
  trap SIGINT

  docker stop $dockerContainerName

  exit
}

trap "exitfn" INT


# local dynamo
docker run -d --rm --name $dockerContainerName -p 8000:8000 amazon/dynamodb-local

# local dynamo web ui
nohup npx dynamodb-admin < /dev/null &

# serverless-offline
AUTHORIZER_BODY=abc IS_LOCAL=true NODE_ENV=dev sls offline start --stage dev --noAuth

