#!/bin/bash

dockerContainerName='dynamo-local'


exitfn() {
  trap SIGINT

  docker stop $dockerContainerName

  exit
}

trap "exitfn" INT


# local dynamo
echo "[start-offline] starting dynamodb docker image... Port: 8000"
docker run -d --rm --name $dockerContainerName -p 8000:8000 amazon/dynamodb-local

# local dynamo web ui
echo "[start-offline] starting dynamodb web ui... http://localhost:8001"
nohup npx dynamodb-admin < /dev/null &

# frontend
echo "[start-offline] starting frontend... http://localhost:8080"
cd frontend && nohup npm run serve < /dev/null &

# serverless-offline
cd backend && AUTHORIZER_BODY=abc IS_LOCAL=true NODE_ENV=dev sls offline start --stage dev --noAuth

