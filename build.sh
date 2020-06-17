#!/bin/bash

echo "Builing for production..."
meteor build ./build/ --architecture os.linux.x86_64 --server-only