#!/bin/bash
NODEID_1=b0bef5cc39fad55319dd0bedf9068b69a9a79a2b
IP_1=8.210.117.181
#SETTING=settings.json
#cat $SETTING|jq '.remote.lcd = "http://'$BOND_DID'"' -c $SETTING | sponge $SETTING
echo "==========================="
echo "Starting the server now..."
echo "==========================="
meteor --settings settings.json