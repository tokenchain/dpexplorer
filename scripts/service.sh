#!/bin/bash
export MONGO_URL='mongodb://admin:admin@localhost:27017/syncdp'
export ROOT_URL='http://darkpool.profitlock.io'
export METEOR_SETTINGS=$(jq -c . settings_local.json)
node main.js