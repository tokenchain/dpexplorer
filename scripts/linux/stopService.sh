#!/bin/bash

#remote service:
#sh stopService.sh -remote
#local stop service:
#sh stopService.sh -local

. ./_auth.sh


SSH_REMOTE_SHELL_CMD_MON="pkill -3 node"

if [[ $1 == +("--remote"|"--r"|"-r") ]]; then


    echo "=========================="
    echo "| Builing for production |"
    echo "=========================="

    #CENTOS

    ssh -t root@$LOCAL $SSH_REMOTE_SHELL_CMD_MON
    if [ $? -eq 0 ]; then
        echo "✅ ==== successfully stopped"
    else
        echo "⛔️ Cannot complete the stop here..."
    fi
elif [[ $1 == +("--local"|"--l"|"-l") ]]; then

    echo -e "try to stop the program by {$SSH_REMOTE_SHELL_CMD_MON}\n target to the user program by {$DEDICATED_UERNAME}"
    #pkill -3 node
    #kill -3 $(ps -ef | grep $DEDICATED_UERNAME)
    pkill -3 -U $DEDICATED_UERNAME

    if [ $? -eq 0 ]; then
        echo "✅ ==== successfully stopped"
    else
        echo "⛔️ Cannot complete the stop here..."
    fi
else

 help
 echo "⛔️ Service did not stop.."
 exit
fi

