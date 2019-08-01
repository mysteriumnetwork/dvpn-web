#!/usr/bin/env bash

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo $CURRENT_DIR

chmod +x $CURRENT_DIR/myst
chmod +x $CURRENT_DIR/openvpn

DATA_DIR=$CURRENT_DIR/data
CONFIG_DIR=$CURRENT_DIR/config

sudo $CURRENT_DIR/myst --data-dir=$DATA_DIR \
       --config-dir=$CONFIG_DIR \
       --runtime-dir=$DATA_DIR \
       --tequilapi.port=4050 \
       --log-level=debug \
       --openvpn.binary=$CURRENT_DIR/openvpn \
       daemon
