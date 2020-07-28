#!/bin/bash


#testnet:
#sh build.sh testnet u

#production:
#sh build.sh dx1 u



help() {
    local usage=" Explorer builder autoscript -h\n
	 Please try select any of these cmd - testnet,dx1\n

	 example\n

	 	testnet: sh build.sh testnet\n
	 production: sh build.sh dx1\n

	 skip upload: sh build.sh testnet -test\n
	 skip upload: sh build.sh dx1  -test\n
	 	try to help it out
	 "
    echo $usage
}

abort_program() {
    cd $BUILD_DIR
    rm -f $FILE
    exit
}

if [[ $1 == "testnet" ]]; then

    LOCAL=8.210.117.181
    TARGET_LOC=/www/wwwdp

elif [[ $1 == "dx1" ]]; then

    LOCAL=8.210.227.164
    TARGET_LOC=/www/dpexplorer

elif [[ $1 == "dx2" ]]; then

    LOCAL=8.210.227.164
    TARGET_LOC=/www/dpexplorer

elif [[ $1 == "dx3" ]]; then

    LOCAL=8.210.227.164
    TARGET_LOC=/www/dpexplorer

else
    help;
    exit
fi


mod_setting() {
    param_hk="$1 = \"$2\""
    #echo "$param_hk"
    cat $EXPLORER_SETTINGS | jq "$param_hk" -c $EXPLORER_SETTINGS | sponge $EXPLORER_SETTINGS
}


echo "Define setting file"
echo "================================================="

EXPLORER_SETTINGS="settings_centos.json"
GENESIS_FILE_URL="https://gitee.com/jjhoc/b-explorer-settings/raw/master/v1.3/mainnet/genesis.json"
NATIVE_TOKEN="mdap"
NATIVE_TOKEN_NAME="DAP"
MARKET_SYMBOL="dap"
RPC=http://127.0.0.1:26657
LCD=http://127.0.0.1:1317

echo "Define the system location"
echo "================================================="
FILE="dpexplorer.tar.gz"
WORK_SPACE=$HOME/Documents/ixo/dpexplorer
echo "Generate genesis configuration file"
echo "================================================="
GENESIS_FILE="$HOME/Documents/ixo/b-explorer-settings/v1.3/mainnet/genesis.json"
CHAIN_ID=$(jq '.chain_id' $GENESIS_FILE -r)
CHAIN_NAME="Darkpool mainnet"


cd $WORK_SPACE
sh update.sh
VERSION=$(cat version)
BUILD_DIR="$WORK_SPACE/build"
NEW_NAME="bundle-v$VERSION-explorer.tar.gz"
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


#exit
cd $BUILD_DIR
touch $FILE
echo "=========================="
echo "| Building for production |"
echo "=========================="
cd $WORK_SPACE
#meteor build ./build/ --architecture os.linux.x86_64 --server-only --allow-superuser
#meteor build --architecture=os.linux.x86_64 $BUILD_DIR
#EXTRACT="cd /www/wwwdp;bash tar -xvf dpexplorer.tar.gz -C /www/wwwdp"
#cd bundle/programs/server && npm install

cd $BUILD_DIR

if [[ ! -f $NEW_NAME ]]; then
    mv $FILE $NEW_NAME
fi

EXTRACT="cd $TARGET_LOC; tar -xvf $NEW_NAME;bash"


if [ $USER == "hesk" ]
then

    echo "==================================================="
    echo "It will be uploading to the specific node network"
    echo "==================================================="

    file_size_kb=`du -k "$BUILD_DIR/$NEW_NAME" | cut -f1`

    if [ $file_size_kb -eq 0 ]; then
        echo "⛔️ file is zero bytes..."
        abort_program
    fi

    scp $BUILD_DIR/$NEW_NAME root@$LOCAL:$TARGET_LOC

    if [ $? -eq 0 ]; then
        echo "✅ ==== upload successfully"
    else
        echo "⛔️ Error from uploading..."
        abort_program
    fi

    ssh -t root@$LOCAL $EXTRACT

    if [ $? -eq 0 ]; then
        echo "✅  - complete uploading"
    else
        echo "⛔️ Remote command got some problems...."
        abort_program
    fi

fi


abort_program
