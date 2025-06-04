package com.example.ankidroid;

import android.content.Intent;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

public class AnkiDroid extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if ("addCard".equals(action)) {
            String front = args.getString(0);
            String back = args.getString(1);
            Intent intent = new Intent("com.ichi2.anki.api.addNote");
            intent.putExtra("deckName", "Default");
            intent.putExtra("modelName", "Basic");
            intent.putExtra("fields", new String[]{front, back});
            intent.putExtra("tags", new String[]{"JapanAnime"});
            this.cordova.getActivity().startActivity(intent);
            callbackContext.success();
            return true;
        }
        return false;
    }
}
