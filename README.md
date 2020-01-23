# screen-orchestra-gsa

Launch chrome to allow autoplay audio
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --autoplay-policy=no-user-gesture-required

Launch in Kiosk mode?
google-chrome-stable --kiosk http://google.com/ --new-window --start-maximized --incognito  --autoplay-policy=no-user-gesture-required --disable-features=PreloadMediaEngagementData,AutoplayIgnoreWebAudio,MediaEngagementBypassAutoplayPolicies &
