#!/bin/bash
# curl http://121.40.211.82:10000/meteor.install.sh | sh
#NODEID_1=b0bef5cc39fad55319dd0bedf9068b69a9a79a2b
#IP_1=8.210.117.181
#SETTING=settings.json
#cat $SETTING|jq '.remote.lcd = "http://'$BOND_DID'"' -c $SETTING | sponge $SETTING

. ./_needle.sh


CLI_PATH="$HOME/.dpcli"
DEMON_PATH="$HOME/.dpd"
JSONFile=$DEMON_PATH/config/genesis.json
RPC=http://127.0.0.1:26657
LCD=http://127.0.0.1:1317

JSON_TARGET="https://gitee.com/jjhoc/b-explorer-settings/raw/master/v1.3/$(env_segment)/genesis.json"
JSON_GIT_PATH="$HOME/Documents/ixo/b-explorer-settings/v1.3/$(env_segment)/genesis.json"
EXPLORER_SETTINGS=$(env_setting_file)
CHAIN_ID=$(jq '.chain_id' $JSONFile -r)
CHAIN_NAME="Darkpool testnet"
NATIVE_TOKEN="mdap"
NATIVE_TOKEN_NAME="DAP"
MARKET_SYMBOL="dap"

echo "========================================================="
echo "version genesis update - $JSON_TARGET, $JSON_GIT_PATH"
echo "========================================================="
cp $JSONFile $JSON_GIT_PATH
cd $HOME/Documents/ixo/b-explorer-settings
sh update.sh
cd $HOME/Documents/ixo/dpexplorer

echo "====================================="
echo "if do not have sponge please install. MacOS please run [brew install moreutil]. Now editing the setting json file."
echo "====================================="

mod_setting ".genesisFile" $JSON_TARGET
mod_setting ".public.chainId" $CHAIN_ID
mod_setting ".public.chainName" $CHAIN_NAME
mod_setting ".public.coins[0].denom" $NATIVE_TOKEN
mod_setting ".public.coins[0].displayName" $NATIVE_TOKEN_NAME
mod_setting ".public.coins[0].fraction" 1000
mod_setting ".public.coins[1].denom" "cdollar"
mod_setting ".public.coins[1].displayName" "DOLLAR"
mod_setting ".public.coins[1].fraction" 1000
mod_setting ".public.coins[2].denom" "mdita"
mod_setting ".public.coins[2].displayName" "DITA"
mod_setting ".public.coins[2].fraction" 1000
mod_setting ".public.bondDenom" $NATIVE_TOKEN
mod_setting ".public.coingeckoId" $MARKET_SYMBOL
mod_setting ".remote.rpc" $RPC
mod_setting ".remote.lcd" $LCD


echo "==========================="
echo "Starting the server now..."
echo "==========================="

meteor --settings $EXPLORER_SETTINGS
