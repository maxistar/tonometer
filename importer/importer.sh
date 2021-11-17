#!/bin/bash

dirname=$(dirname "$0");

pushd $dirname

node index.js

popd
