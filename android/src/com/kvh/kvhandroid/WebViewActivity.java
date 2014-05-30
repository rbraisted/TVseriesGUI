package com.kvh.kvhandroid;

import com.kvh.kvhandroid.utils.Constants;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.webkit.*;
import android.graphics.Bitmap;

public class WebViewActivity extends Activity {
	 public static final String TAG = "KVHANDROID - WebViewActivity";
	
	WebView webView;
	
	private String hostName;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		Log.i(TAG, "On Create");
		
		setContentView(R.layout.activity_main);
		
		//because of the Android App Manager is messed up that it will recreate (not just resume) an instance of the last activity 
		//we shall go to the main Activity again
		// Restore preferences
		SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
		boolean toRestart = settings.getBoolean("restartApp", false);
		if(toRestart) {
			//reset the restart flag
			SharedPreferences.Editor editor = settings.edit();
			editor.putBoolean("restartApp", true);
			// Commit the edits!
			editor.commit();
			
			Intent i = new Intent(this, MainActivity.class);
			startActivity(i);
			finish();
		}
		
		hostName = "http://192.168.2.121/";
				
		Bundle extras = getIntent().getExtras();
		if (extras != null) {
			hostName = "http://" + extras.getString("hostName") + "/";
		}
		
		//	get the webview
		webView = (WebView)findViewById(R.id.webView);
		
		//	enable javascript
		webView.getSettings().setJavaScriptEnabled(true);
		webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
		
		webView.setWebChromeClient(new WebChromeClient());
		
		webView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				Log.i("KVH", "shouldOverrideUrlLoading"+url);
				return false;
			}

			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				//	TODO: determine is device can implement sat finder
				String satFinderAvailable = true ? "true" : "false";
				String javascript = "var TVRO = { MOBILE_APP: true, SAT_FINDER: " + satFinderAvailable + " };";
				webView.loadUrl("javascript:"+javascript);
			}

			@Override
			public void onPageFinished(WebView view, String url) {
				
			}
		});
        
		//	Load URL
		webView.loadUrl(hostName);
	}
	
	@Override
	public void onPause() {
		super.onPause();
		Log.i(TAG, "On Pause");
		
		//lets try to save preferences and then when the user has the bright idea to use App Watch/Task Manager to launch the App
		//Hopefully that would fix this App Watch/Task Manager problem
		SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putBoolean("restartApp", true);
		// Commit the edits!
		editor.commit();
		
		onDestroy();
	}
	
	@Override
	public void onDestroy() {
		super.onPause();
		Log.i(TAG, "On Destroy");
	}
	
	@Override
	public void onRestart() {
		super.onRestart();
		Log.i(TAG, "On Restart");
//		Intent i = new Intent(this, MainActivity.class);
//		startActivity(i);
//		finish();
	}
}
