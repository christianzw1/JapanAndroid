# JapanAnime Cordova App

This repository contains the web assets for the JapanAnime subtitle study tool and a minimal Cordova configuration.

## Building

1. Install Cordova:
   ```bash
   npm install -g cordova
   ```
2. Initialize the project (if not already):
   ```bash
   cordova create JapanAnime com.example.japananime JapanAnime
   cd JapanAnime
   ```
3. Copy the contents of this repository's `index.html`, `styles.css`, `script.js`, and other assets into the `www` folder of the Cordova project.
4. Copy the `cordova/plugins/ankidroid` plugin folder into `plugins` and add the plugin with:
   ```bash
   cordova plugin add ./plugins/ankidroid
   ```
5. Add the Android platform and build:
   ```bash
   cordova platform add android
   cordova build android
   ```

The app works fully offline and integrates with AnkiDroid via the included plugin.
