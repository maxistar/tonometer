#!/usr/bin/env bash

block_counter=$(cat blockid)
transactions=$(cat transactions)
while true
    do
        block_counter=$(cat blockid)
        transactions=$(cat transactions)
        block=$(/mnt/md0/projects/ton/ton/lite-client-build/lite-client/lite-client -C /mnt/md0/projects/ton/ton-lite-client-test1.config.json -v 0 -c "last" |tail -n 1|awk {'print $8'})
        if [ -n "$block" ] && [ "$block_counter" != "$block" ]
        then
            trans_num=$(/mnt/md0/projects/ton/ton/lite-client-build/lite-client/lite-client -C /mnt/md0/projects/ton/ton-lite-client-test1.config.json -v 0 -c "listblocktrans $block 100" |tail -n 2| head -n 1|awk {'print $2'}|sed -e 's/#//g' -e 's/://g')
            echo $(("$transactions"+"$trans_num")) > lasttransactions
            echo "blocks value=${block}" > lastblockid
        fi
        sleep 3
done

