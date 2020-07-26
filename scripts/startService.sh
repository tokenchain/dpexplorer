#!/bin/bash
INSTALL_EXPLORER_FOLDER="wwwdp"


if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        
    export MONGO_URL='mongodb://localhost:27017/darkpool'
    export ROOT_URL='http://darkpool.profitlock.io'
    export METEOR_SETTINGS=$(jq -c . settings_local.json)
    export PORT=8080

elif [[ "$OSTYPE" == "darwin"* ]]; then
        
    export MONGO_URL='mongodb://admin:admin@localhost:27017/syncdp'
    export ROOT_URL='http://darkpool.profitlock.io'
    export METEOR_SETTINGS=$(jq -c . settings_local.json)

fi

echo "====preview settings===="
#export BIND_IP=8.210.117.181
echo $METEOR_SETTINGS



if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    cd /www/$INSTALL_EXPLORER_FOLDER/bundle/programs/server
elif [[ "$OSTYPE" == "darwin"* ]]; then
    cd $HOME/Documents/ixo/dpexplorer/build/bundle/programs/server
fi

if [ ! -d node_modules ]; then
    echo "npm install;"
    npm install --production
fi

if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    cd /www/$INSTALL_EXPLORER_FOLDER/bundle
elif [[ "$OSTYPE" == "darwin"* ]]; then
    cd $HOME/Documents/ixo/dpexplorer/build/bundle
fi

echo "====check all listeners===="
netstat -an | awk '/^tcp/ {++sta[$NF]} END {for(key in sta) print key,"\t",sta[key]}'
echo "====starting service===="

#node main.js

DEDICATED_UERNAME="dpexplorerk"
DEDICATED_UERPWD="cc9934b0349a01b215bcb76b7054e734e78366c7"
LOG_FILE="blockexplorer.out"

if [[ $USER == $DEDICATED_UERNAME ]]
then

    echo "===user for $DEDICATED_UERNAME is ready"

    #statements
else
            
        if getent passwd $DEDICATED_UERNAME > /dev/null 2>&1; then
            echo "user $DEDICATED_UERNAME exists ..."
        else
            adduser $DEDICATED_UERNAME
            echo "dedicated user is added ..."
        fi

fi

#sudo chown user_name:user_name ~.bash_history
if [ ! -e $LOG_FILE ]; then
 touch $LOG_FILE
fi

chmod 777 $LOG_FILE

su $DEDICATED_UERNAME <<EOSU
    echo "exec by $DEDICATED_UERNAME"
    nohup node main.js >> $LOG_FILE &
EOSU