export PORT=9122
export SERVICE_NAME=jellyfish-local
export SERVE_STATIC=dist
export API_SECRET="This is a local API secret for everyone. BsscSHqSHiwrBMJsEGqbvXiuIUPAjQXU"
export SERVER_SECRET="This needs to be the same secret everywhere. YaHut75NsK1f9UKUXuWqxNN0RUwHFBCy"
export LONGTERM_KEY="abcdefghijklmnopqrstuvwxyz"
export DISCOVERY_HOST=localhost:8000
export PUBLISH_HOST=localhost
export METRICS_SERVICE="{ \"type\": \"static\", \"hosts\": [{ \"protocol\": \"http\", \"host\": \"localhost:9191\" }] }"
export USER_API_SERVICE="{ \"type\": \"static\", \"hosts\": [{ \"protocol\": \"http\", \"host\": \"localhost:9107\" }] }"
export SEAGULL_SERVICE="{ \"type\": \"static\", \"hosts\": [{ \"protocol\": \"http\", \"host\": \"localhost:9120\" }] }"
export GATEKEEPER_SERVICE="{ \"type\": \"static\", \"hosts\": [{ \"protocol\": \"http\", \"host\": \"localhost:9123\" }] }"
export MINIMUM_UPLOADER_VERSION="0.99.0"
export SCHEMA_VERSION=3
