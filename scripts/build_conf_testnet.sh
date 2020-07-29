#!/usr/bin/env bash

. ./_needle.sh


NETWORK_TYPE=testnet
echo "Define setting file"
echo "================================================="


EXPLORER_SETTINGS="settings_testnet.json"
GENESIS_FILE_URL="https://gitee.com/jjhoc/b-explorer-settings/raw/master/v1.3/$NETWORK_TYPE/genesis.json"
NATIVE_TOKEN="mdap"
NATIVE_TOKEN_NAME="DAP"
MARKET_SYMBOL="dap"
RPC=http://127.0.0.1:26657
LCD=http://127.0.0.1:1317

echo "Define the system location"
echo "================================================="
echo "Generate genesis configuration file"
echo "================================================="

GENESIS_FILE="$HOME/Documents/ixo/b-explorer-settings/v1.3/$NETWORK_TYPE/genesis.json"
CHAIN_ID=$(jq '.chain_id' $GENESIS_FILE -r)

CHAIN_NAME="Darkpool Testnet"


cd $HOME/Documents/ixo/dpexplorer
#works on the setting file
cp "settings_local.json" $EXPLORER_SETTINGS

mod_setting ".genesisFile" $GENESIS_FILE_URL
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


FINAL_VERSION=$(cat $EXPLORER_SETTINGS)

if [ $(echo $FINAL_VERSION | jq empty > /dev/null 2>&1; echo $?) -eq 0 ]; then
    echo "✅  JSON is valid -$EXPLORER_SETTINGS"
    echo "================================================="
else
    echo "⛔️  JSON is invalid -$EXPLORER_SETTINGS"
    echo "================================================="
    exit
fi
