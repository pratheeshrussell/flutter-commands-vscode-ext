# flutter-commands README

This extension can run commonly used flutter commands from the command palette/activity bar. This is my attempt to learn about creating a vs code extension and so might not be much useful but if anyone wants to improve it send a PR

## Features

Flutter Commands: Build Split APK - will build different files for different ABI(Application Binary Interface)  
Flutter Commands: Build Fat APK - will build a single fat apk file in release mode  
Flutter Commands: Build APK App Bundle - will build the app bundle
Flutter Commands: Repair Imports - Deletes the package file and runs pub get command  
Flutter Commands: Repair Project - Runs flutter clean and flutter create .  

## Requirements

You must have Flutter and Dart installed previously

## Thanks

I used the icon taken from here http://www.onlinewebfonts.com


## Known Issues

- There is a delay in running the command. Probably coz it is trying to find a terminal


**Enjoy!**
