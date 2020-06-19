#!/bin/bash
echo "====================="
echo "Builing for production..."
echo "====================="
cd /Users/hesk/Documents/ixo/dpexplorer
meteor build ./build/ --architecture os.linux.x86_64 --server-only --allow-superuser
#meteor build --architecture=os.linux.x86_64 ../build
LOCAL=8.210.117.181
EXTRACT="tar xvf dp-explorer.tar.gz -C /www/wwwdp"
scp ./build/dp-explorer.tar.gz root@$LOCAL:/www/wwwdp
ssh -t root@$LOCAL $EXTRACT
#cd bundle/programs/server && npm install
