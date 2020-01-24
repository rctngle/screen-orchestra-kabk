#!/bin/bash

osascript -e "set Volume 0"
\/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --autoplay-policy=no-user-gesture-required
cd "$(dirname "$0")"
pwd
#open "$(dirname -- "$0")/monitor.html"

script_name=$0
script_full_path=$(dirname "$0")

open "$script_full_path/monitor.html"
