#!/bin/bash
echo "=========================="
echo "| Builing for production |"
echo "=========================="
cd $HOME/Documents/ixo/dpexplorer
BUILD_DIR=$HOME/Documents/ixo/dpexplorer/build
#meteor build ./build/ --architecture os.linux.x86_64 --server-only --allow-superuser
meteor build --architecture=os.linux.x86_64 ../build
LOCAL=8.210.117.181
#EXTRACT="cd /www/wwwdp;bash tar -xvf dpexplorer.tar.gz -C /www/wwwdp"
EXTRACT="cd /www/wwwdp; tar -xvf dpexplorer.tar.gz;bash"

ANDUPLOAD=$1

if [[ $ANDUPLOAD == "u" ]]
then

    if [ $USER  == 'hesk' ]
    then
        scp $BUILD_DIR/dpexplorer.tar.gz root@$LOCAL:/www/wwwdp
        ssh -t root@$LOCAL $EXTRACT
        echo "local"
    fi
    #cd bundle/programs/server && npm install

fi
