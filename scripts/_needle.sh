#!/usr/bin/env bash




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


#1: the full path
#2: the target location in the remote server
upload_file(){
    local file_size_kb=`du -k "$1" | cut -f1`

    if [ $file_size_kb -eq 0 ]; then
        echo "⛔️ file is zero bytes..."
        abort_program
    fi

    scp $1 root@$LOCAL:$2

    if [ $? -eq 0 ]; then
        echo "✅ ==== upload successfully"
    # else
    #echo "⛔️ Error from uploading... $1"
    # abort_program
    fi

}


mod_setting() {
    param_hk="$1 = \"$2\""
    #echo "$param_hk"
    cat $EXPLORER_SETTINGS | jq "$param_hk" -c $EXPLORER_SETTINGS | sponge $EXPLORER_SETTINGS
}

