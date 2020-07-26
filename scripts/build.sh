#!/bin/bash

help(){
	 local usage=" Explorer builder autoscript -h\n
	 Please try select any of these cmd - testnet,dx1\n

	 example\n

	 	testnet: sh build.sh testnet u\n
	 production: sh build.sh dx1 u\n



	 	try to help it out
	 "
	echo $usage
}
#testnet:
#sh build.sh testnet u

#production:
#sh build.sh dx1 u

LOCAL=8.210.117.181
TARGET_LOC=/www/wwwdp

if [[ $1 == "testnet" ]]; then

LOCAL=8.210.117.181
TARGET_LOC=/www/wwwdp

elif [[ $1 == "dx1" ]]; then

LOCAL=8.210.227.164
TARGET_LOC=/www/dpexplorer

elif [[ $1 == "dx2" ]]; then

LOCAL=----
TARGET_LOC=/www/dpexplorer

elif [[ $1 == "dx3" ]]; then

LOCAL=----
TARGET_LOC=/www/dpexplorer

else

 help;
 exit
fi



WORK_SPACE="$HOME/Documents/ixo/dpexplorer"
FILE="dpexplorer.tar.gz"
cd $WORK_SPACE
VERSION=$(cat version)
BUILD_DIR="$WORK_SPACE/build"
NEW_NAME="bundle-v$VERSION-explorer.tar.gz"

cd $BUILD_DIR
touch $FILE


echo "=========================="
echo "| Builing for production |"
echo "=========================="
cd $WORK_SPACE
#meteor build ./build/ --architecture os.linux.x86_64 --server-only --allow-superuser
meteor build --architecture=os.linux.x86_64 $BUILD_DIR
#EXTRACT="cd /www/wwwdp;bash tar -xvf dpexplorer.tar.gz -C /www/wwwdp"
cd $BUILD_DIR
mv $FILE $NEW_NAME
EXTRACT="cd $TARGET_LOC; tar -xvf $NEW_NAME;bash"

ANDUPLOAD=$2

if [[ $ANDUPLOAD == "u" ]]
then

    if [ $USER  == "hesk" ]
    then
        scp $BUILD_DIR/$NEW_NAME root@$LOCAL:$TARGET_LOC
        ssh -t root@$LOCAL $EXTRACT
        echo "local"
    fi
    #cd bundle/programs/server && npm install

fi
