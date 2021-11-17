#!/usr/bin/env bash
set -uo pipefail

LITECONFIG="/mnt/md0/projects/ton/ton-lite-client-test1.config.json"
LITECLIENTBIN="/mnt/md0/projects/ton/ton/lite-client-build/lite-client/lite-client"
METRICSFILE="/mnt/md0/projects/ton/tonometer/tonmon/validators"
PREFIX=""

check_files_exists()
{
    if [ $# -ge 1 ]; then
        local files=("$@")
        for file in "${files[@]:0:${#files[@]}}"; do
      if [ ! -f "$file" ]; then
            echo "File not found: $file"
          fi
    done
    else
        echo "no files provided for checking"
    fi
}

check_files_exists ${LITECONFIG}

check_installed() {
  EXIT=0
  for cmd in "grep" "awk" "sed" "bc" ${LITECLIENTBIN}; do
    if ! [ -x "$(command -v $cmd)" ]; then
      echo "Error: $cmd is not installed." >&2
      EXIT=1
    fi
  done
  if [ "$EXIT" -eq 1 ]; then
    exit 1
  fi
}

check_installed

do_cmd()
{
    OUTPUT=$("$@")
    ret=$?
    if [[ $ret -eq 0 ]]
    then
        echo -n "${OUTPUT}"
    else
        echo "Error: Command [" "$@" "] returned $ret"
        exit $ret
    fi
}

run_lite_cmd()
{
    do_cmd ${LITECLIENTBIN} -C ${LITECONFIG} -t 30 -v 0 -c "$1"
}

metric_name()
{
    if [ $# == 1 ]; then
        echo "${PREFIX}_$1"
    fi
}

print_metric() # metric_name type desc result
{
    if [ $# == 4 ]; then
        local metric metric_type description result
        metric=$(metric_name "$1")
        metric_type="$2"
        description="$3"
        result="$4"
        echo "# HELP ${metric} ${description}"
        echo "# TYPE ${metric} ${metric_type}"
        echo "${metric} value=${result}"
    fi
}

get_elections_address()
{
    local result
    result=$(run_lite_cmd "getconfig 1"|grep x{|sed -e 's/{/\ /g' -e 's/}//g'|awk {'print $2'})
    echo "-1:${result}"
}

ACTIVE_ELECTION_ID=$(get_elections_address)


logdate() {
  date '+%s (%Y-%m-%d %H:%M:%S)'
}

get_cur_validators_weight()
{
    local metric description metric_type
    description="Validators weight"
    metric_type="gauge"
    metric="cur_validators_weight"
    metric=$(metric_name "$metric")
    echo "# HELP ${metric} ${description}"
    echo "# TYPE ${metric} ${metric_type}"
    while read -r line
    do
        local pub_key weight
        read -r pub_key weight <<< "$(echo "$line"|awk '{print $1"="$2}')"
        echo  "${metric},public_key=\"$pub_key\" ${weight}"
    done < <(run_lite_cmd "getconfig 34"|grep public_key|tr ':' ' '|sed -e 's/x//g' -e 's/)//g'|awk '{print $4" "$6}')

}

get_elections_participants_stakes()
{
    local metric description metric_type
    description="Participants stakes"
    metric_type="gauge"
    metric="elections_participants_stakes"
    metric=$(metric_name "$metric")
    echo "# HELP ${metric} ${description}"
    echo "# TYPE ${metric} ${metric_type}"
    while read -r line
    do
        local pub_key value
        read -r pub_key value <<< "$(echo "$line"|awk '{print $1" "$2/1000000000}')"
        if [ "$pub_key" != 0 ]; then
            echo -n "${metric}"
            echo ",public_key=\"$(echo "obase=16; $pub_key"|bc)\" value=${value}"
        fi
    done < <(run_lite_cmd "runmethod ${ACTIVE_ELECTION_ID} participant_list" 2> >(cat)|grep result|sed -e 's/(\[//g' -e 's/\] \[/\n/g' -e '0,/\]/{s/\]/\n/}' -e 's/\[/\n/g'|grep -v \]|grep -v result|grep -v \(\))
}

get_nodes()
{
#    find . -maxdepth 1 -mmin +1 -type f -exec sh -c "tcpdump -nnn -t -r {} | cut -f 1,2,3,4 -d '.' | sort | uniq -c | sort -nr|wc -l; rm {}" \; -print
echo "TODO"
}

get_shards_info()
{
    local metric result
    metric="shards_number"
    result=$(run_lite_cmd "allshards"|grep 'shard #'|sed -e 's/,/ /g' -e 's/)/ /g' -e 's/\#//g'|awk 'END {print NR}')
    if [ $? -eq 0 ]; then
        print_metric "${metric}" gauge "Number of shards" "$result"
    fi
}

get_allshards()
{
    local metric description metric_type
    description="All shards block height"
    metric="allshards"
    metric=$(metric_name "$metric")
    echo "# HELP ${metric} ${description}"
    while read -r line
    do
        local shard_num shard_height
        read -r shard_num shard_height <<< "$(echo "$line"|awk '{print $1" "$2}')"
        echo  "${metric},shard_num=\"$shard_num\" value=${shard_height}"
    done < <(run_lite_cmd "allshards"|grep "shard #"|sed -e 's/#//g' -e 's/,/ /g' -e 's/)/ /g'|awk '{print $2" "$6}')
}


print_metrics ()
{
    echo "# metrics file generated at $(logdate)"
    get_shards_info
    get_elections_participants_stakes
    #get_cur_validators_weight
    get_allshards
}

save_metrics()
{
    print_metrics>${METRICSFILE}
}

save_metrics
