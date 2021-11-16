#!/bin/bash

/mnt/md0/projects/ton/tonmon/tonmon.sh
curl -i -XPOST "http://10.8.1.19:8086/write?db=db0" --data-binary @/mnt/md0/projects/ton/tonmon/toncoin
