#!/bin/bash
export MONGO_URL='mongodb://admin:admin@localhost:27017/syncdp'
export ROOT_URL='http://darkpool.profitlock.io'
export MAIL_URL='smtp://admin:admin@localhost:9999/'
node main.js