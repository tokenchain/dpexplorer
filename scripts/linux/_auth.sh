#!/bin/bash
DEDICATED_UERNAME="dpexmr"
INSTALL_EXPLORER_FOLDER="dpexplorer"
EXPLORER_SETTINGS="settings_local.json"
LOG_FILE="blockexplorer.out"
LOCAL=8.210.227.164
DB_NAME="darkpool"

# DO NOT EDIT BELOW THIS LINE

removeUser(){
    userdel -r $1
}

help(){
     local usage="

    🈴 Auto stop service\n
    🈴 Please try select any of these cmd\n
\n
        sh stopService.sh --remote\n
        sh stopService.sh --r\n
    🈴 stop service:\n
        sh stopService.sh --local\n
        sh stopService.sh --l\n
\n
        The service is now stopped
    \nPlease make sure the service is successfully stopped.
     "
    echo -e $usage
}
