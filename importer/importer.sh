#!/usr/bin/env bash

dirname=$(dirname "$0");
#SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

#pushd /mnt/md0/projects/ton/tonometer/importer
pushd $dirname

source .env
/usr/local/bin/node index.js

popd
