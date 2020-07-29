#!/bin/bash
. ./_auth.sh

#removeUser dpexmr
#removeUser dpexplorerk
#removeUser dpexm
#exit


if [ ! -f $EXPLORER_SETTINGS ]; then
    echo -e "dp explorer setting file is not exists we are looking for {$EXPLORER_SETTINGS}"
    exit
fi

if [[ "$OSTYPE" == "linux-gnu"* ]]; then

    export MONGO_URL="mongodb://localhost:27017/$DB_NAME"
    export ROOT_URL='http://explorer.profitlock.io'
    export METEOR_SETTINGS=$(jq -c . $EXPLORER_SETTINGS)
    export PORT=8080

elif [[ "$OSTYPE" == "darwin"* ]]; then

    export MONGO_URL='mongodb://admin:admin@localhost:27017/syncdp'
    export ROOT_URL='http://darkpool.profitlock.io'
    export METEOR_SETTINGS=$(jq -c . $EXPLORER_SETTINGS)

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


DEDICATED_UERPWD="cc9934b0349a01b215bcb76b7054e734e78366c7"
USER_PROGRAMS=/home/$DEDICATED_UERNAME/programs
USER_BASH_PROFILE=/home/$DEDICATED_UERNAME/.bash_profile

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



#n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr
N=$(which node)
#change user starting command to this ...
#usermod -s bash $DEDICATED_UERNAME

cat $USER_BASH_PROFILE

if [ ! -d $USER_PROGRAMS ]; then
    echo -e "initialize folder and settings for the user - $DEDICATED_UERNAME"
    mkdir $USER_PROGRAMS
    #chattr +i $USER_BASH_PROFILE
fi
echo "change node permission for user execution"
N=$(which node)
chmod -R 755 $N
chmod 777 $LOG_FILE
cp -l $N $USER_PROGRAMS/node
#chmod +x main.js

su $DEDICATED_UERNAME <<EOSU
    echo -e "exec by $DEDICATED_UERNAME"
    nohup node main.js >> $LOG_FILE &
EOSU
