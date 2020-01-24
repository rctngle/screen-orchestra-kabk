#!/bin/bash

osascript -e "set Volume 0"
\/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --autoplay-policy=no-user-gesture-required
cd "$(dirname "$0")"
pwd
open "$(dirname -- "$0")/monitor.html"
