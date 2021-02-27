#!/bin/bash

dockerContainerName='dynamo-local'


exitfn() {
  trap SIGINT

  docker stop $dockerContainerName
  kill -9 $(lsof -t -i:8080)  # frontend
  kill -9 $(lsof -t -i:8001)  # dynamo web ui
  kill -9 $(pidof node)  # clean up zombie processes if necessary

  exit
}

trap "exitfn" INT


# local dynamo
echo "[start-offline] starting dynamodb docker image... Port: 8000"
docker run -d --rm --name $dockerContainerName -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
echo "[start-offline] seeding calendar table..."
echo $(aws --profile=msc dynamodb create-table --cli-input-json file://backend/infrastructure/local/dynamodb/calendarTable.json --endpoint-url http://localhost:8000 --region eu-central-1 --output text)

# local dynamo web ui
echo "[start-offline] starting dynamodb web ui... http://localhost:8001"
nohup npx dynamodb-admin < /dev/null &

# frontend
echo "[start-offline] starting frontend... http://localhost:8080"
cd frontend && nohup npm run serve < /dev/null &

# serverless-offline
cd backend && AUTHORIZER_BODY=abc IS_LOCAL=true NODE_ENV=dev sls offline start --stage dev --noAuth

