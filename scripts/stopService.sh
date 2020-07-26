#!/bin/bash

#remote service:
#sh stopService.sh -remote
#local stop service:
#sh stopService.sh -local


help(){
     local usage="Auto stop service\n
     Please try select any of these cmd\n
\n
        sh stopService.sh -remote\n
        local stop service:\n
        sh stopService.sh -local\n
\n
        The service is now stopped
     "
    echo $usage
}

DEDICATED_UERNAME="dpexplorerk"
LOCAL=8.210.117.181
TARGET_LOC=/www/wwwdp
SSH_REMOTE_SHELL_CMD_MON="pkill -3 node"


if [[ $1 == "--remote" ]]; then


echo "=========================="
echo "| Builing for production |"
echo "=========================="

#CENTOS

ssh -t root@$LOCAL $SSH_REMOTE_SHELL_CMD_MON

elif [[ $1 == "--local" ]]; then

echo "local bash $SSH_REMOTE_SHELL_CMD_MON"
#pkill -3 node
#kill -3 $(ps -ef | grep $DEDICATED_UERNAME)
pkill -3 -U $DEDICATED_UERNAME

else

 help;
 exit
fi

