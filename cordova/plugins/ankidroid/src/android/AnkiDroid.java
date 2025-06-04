package com.example.ankidroid;

import android.content.Intent;
import android.net.Uri;
import android.database.Cursor;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

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
        } else if ("addNote".equals(action)) {
            JSONObject note = args.getJSONObject(0);
            String deck = note.optString("deckName", "Default");
            String model = note.optString("modelName", "Basic");
            JSONArray fieldsArray = note.getJSONArray("fields");
            String[] fields = new String[fieldsArray.length()];
            for (int i = 0; i < fieldsArray.length(); i++) {
                fields[i] = fieldsArray.getString(i);
            }
            JSONArray tagsArray = note.optJSONArray("tags");
            String[] tags = new String[tagsArray != null ? tagsArray.length() : 0];
            for (int i = 0; i < tags.length; i++) {
                tags[i] = tagsArray.getString(i);
            }
            Intent intent = new Intent("com.ichi2.anki.api.addNote");
            intent.putExtra("deckName", deck);
            intent.putExtra("modelName", model);
            intent.putExtra("fields", fields);
            intent.putExtra("tags", tags);
            this.cordova.getActivity().startActivity(intent);
            callbackContext.success();
            return true;
        } else if ("getModelFields".equals(action)) {
            String modelName = args.getString(0);
            Uri uri = Uri.parse("content://com.ichi2.anki/fields");
            Cursor c = this.cordova.getActivity().getContentResolver().query(uri, null, "modelName=?", new String[]{modelName}, null);
            JSONArray result = new JSONArray();
            if (c != null) {
                while (c.moveToNext()) {
                    int idx = c.getColumnIndex("name");
                    if (idx >= 0) result.put(c.getString(idx));
                }
                c.close();
            }
            callbackContext.success(result);
            return true;
        }
        return false;
    }
}
