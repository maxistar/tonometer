#!/bin/bash

/mnt/md0/projects/ton/tonometer/tonmon/validators.sh
curl -i -XPOST "http://10.8.1.19:8086/write?db=db0&rp=one_day" --data-binary @/mnt/md0/projects/ton/tonometer/tonmon/validators
