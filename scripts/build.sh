#!/bin/bash
echo "====================="
echo "Builing for production..."
echo "====================="
meteor build ./build/ --architecture os.linux.x86_64 --server-only --allow-superuser

#meteor build --architecture=os.linux.x86_64 ../build

#scp ../build/meteor-build-test.tar.gz root@your.server.ip.address:/home/meteor/build
#tar xvf meteor-build-test.tar.gz
#cd bundle/programs/server && npm install