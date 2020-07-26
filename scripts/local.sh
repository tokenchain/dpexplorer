#!/bin/bash
# curl http://121.40.211.82:10000/meteor.install.sh | sh
#NODEID_1=b0bef5cc39fad55319dd0bedf9068b69a9a79a2b
#IP_1=8.210.117.181
#SETTING=settings.json
#cat $SETTING|jq '.remote.lcd = "http://'$BOND_DID'"' -c $SETTING | sponge $SETTING

env_segment(){
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "mainnet"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
   echo "testlocal"
elif [[ "$OSTYPE" == "cygwin" ]]; then
    echo "testlocal"
    # POSIX compatibility layer and Linux environment emulation for Windows
elif [[ "$OSTYPE" == "msys" ]]; then
    # Windows
   echo "testlocal"
elif [[ "$OSTYPE" == "freebsd"* ]]; then
    # ...
    echo "testlocal"
fi
}

env_setting_file(){
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "settings_centos.json"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
   echo "settings_local.json"
elif [[ "$OSTYPE" == "cygwin" ]]; then
    echo "settings_local.json"
    # POSIX compatibility layer and Linux environment emulation for Windows
elif [[ "$OSTYPE" == "msys" ]]; then
    # Windows
   echo "settings_local.json"
elif [[ "$OSTYPE" == "freebsd"* ]]; then
    # ...
    echo "settings_local.json"
fi
}


CLI_PATH="$HOME/.dpcli"
DEMON_PATH="$HOME/.dpd"
JSONFile=$DEMON_PATH/config/genesis.json

RPC=http://127.0.0.1:26657
LCD=http://127.0.0.1:1317

SEGMENT=$(env_segment)
JSON_TARGET="https://gitee.com/jjhoc/b-explorer-settings/raw/master/v1.3/$SEGMENT/genesis.json"
JSON_GIT_PATH="$HOME/Documents/ixo/b-explorer-settings/v1.3/$SEGMENT/genesis.json"
EXPLORER_SETTINGS=$(env_setting_file)
NATIVE_TOKEN="mdap"

echo "========================================================="
echo "version genesis update - $JSON_TARGET, $JSON_GIT_PATH"
echo "========================================================="
cp $JSONFile $JSON_GIT_PATH
cd $HOME/Documents/ixo/b-explorer-settings
sh pushcommit.sh

cd $HOME/Documents/ixo/dpexplorer

echo "====================================="
echo "if do not have sponge please install. MacOS please run [brew install moreutil]. Now editing the setting json file."
echo "====================================="
cat $EXPLORER_SETTINGS|jq '.genesisFile = "'$JSON_TARGET'"' -c $EXPLORER_SETTINGS | sponge $EXPLORER_SETTINGS
cat $EXPLORER_SETTINGS|jq '.public.coins[0].denom = "'$NATIVE_TOKEN'"' -c $EXPLORER_SETTINGS | sponge $EXPLORER_SETTINGS
cat $EXPLORER_SETTINGS|jq '.public.bondDenom = "'$NATIVE_TOKEN'"' -c $EXPLORER_SETTINGS | sponge $EXPLORER_SETTINGS
cat $EXPLORER_SETTINGS|jq '.remote.rpc = "'$RPC'"' -c $EXPLORER_SETTINGS | sponge $EXPLORER_SETTINGS
cat $EXPLORER_SETTINGS|jq '.remote.lcd = "'$LCD'"' -c $EXPLORER_SETTINGS | sponge $EXPLORER_SETTINGS

echo "==========================="
echo "Starting the server now..."
echo "==========================="

meteor --settings $EXPLORER_SETTINGS
