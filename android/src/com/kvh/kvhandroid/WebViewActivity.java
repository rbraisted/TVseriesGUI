package com.kvh.kvhandroid;

import java.net.URI;

import com.kvh.kvhandroid.utils.Constants;
import com.kvh.kvhandroid.utils.UpdatesManager;
import com.kvh.kvhandroid.utils.UpdatesManagerCallback;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.*;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.graphics.Bitmap;

public class WebViewActivity extends Activity implements UpdatesManagerCallback {
	public static final String TAG = "KVHANDROID - WebViewActivity";
//	private final static int FILECHOOSER_RESULTCODE = 1;
	
	private WebView webView;
	private RelativeLayout helpLayout;
	private WebView helpWebView;
	private ImageButton closeButton;
	
	private String hostName;
	private UpdatesManager updatesManager;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		Log.i(TAG, "On Create");
		updatesManager = new UpdatesManager(this, this);
		
		setContentView(R.layout.webviewactiivity);
		
		
		//because of the Android App Manager is messed up that it will recreate (not just resume) an instance of the last activity 
		//we shall go to the main Activity again
		// Restore preferences
		SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
		boolean toRestart = settings.getBoolean("restartApp", false);
		if(toRestart) {
			Log.i(TAG, "Web View Activity: " + toRestart);
			
			//reset the restart flag
			SharedPreferences.Editor editor = settings.edit();
			editor.putBoolean("restartApp", true);
			// Commit the edits!
			editor.commit();
			
			goBackToMainActivity();
		}
		
		String shellhostName = "http://192.168.2.121/";
				
		Bundle extras = getIntent().getExtras();
		if (extras != null) {
			String tempHostName = extras.getString("hostName");
			
			if(tempHostName.charAt(tempHostName.length() - 1) == '/')
				hostName = tempHostName.substring(0, tempHostName.length() - 1);
			else
				hostName = tempHostName;
			
			shellhostName = "http://" + hostName + "/shell.php";
		}
		
		//	get the webview
		webView = (WebView)findViewById(R.id.webView);
		
		//	enable javascript
		webView.getSettings().setJavaScriptEnabled(true);
		webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
		
		webView.setWebChromeClient(new WebChromeClient() {
			
			// Commenting this chunk out because Google removed this functionality in 4.3
			// they said they'll put in a fix at some point.
			// Source: https://code.google.com/p/android/issues/detail?id=62220
			// For Android 3.0+
			/*public void openFileChooser( ValueCallback<Uri> uploadMsg, String acceptType ) {
				Log.i(TAG, "CHROME CLIENT OPEN FILE CHOOSER 3+");
				//mUploadMessage = uploadMsg;  
				Intent i = new Intent(Intent.ACTION_GET_CONTENT);  
//				i.addCategory(Intent.CATEGORY_OPENABLE);  
				i.setType("file/*");  
//				WebViewActivity.this.startActivityForResult( Intent.createChooser( i, getString(R.string.fileselect) ), MainActivity.FILECHOOSER_RESULTCODE ); 
				WebViewActivity.this.startActivityForResult( Intent.createChooser(i, "Upload"), WebViewActivity.FILECHOOSER_RESULTCODE);
			}

			// For Android < 3.0
			public void openFileChooser( ValueCallback<Uri> uploadMsg ) {
				Log.i(TAG, "CHROME CLIENT OPEN FILE CHOOSER 3-");
				openFileChooser( uploadMsg, "" );
			}

			// For Android > 4.1
			public void openFileChooser(ValueCallback<Uri> uploadMsg, String acceptType, String capture){
				Log.i(TAG, "CHROME CLIENT OPEN FILE CHOOSER 4+");
				openFileChooser( uploadMsg, "" );
			}*/
		});
		
		webView.setWebViewClient(new WebViewClient() {
			@Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
				Log.i("KVH", "shouldOverrideUrlLoading: "+ url);
				
				//	check if it's a javascript to ios/android command
				//	being called with a the scheme "tvro" 
				//	unlike iOS, we're going to just parse the url and check if it begins with tvro
				String scheme = url.substring(0, 4);
				Log.i(TAG, "URL scheme: " + scheme);
				if(scheme.contains("tvro")) {
					handleCustomURL(url);
					return false;
				}
				else if(scheme.contains("about:blank")) {
					//	were trying to go to about:blank for some reason lets negate that
					return true;
				}
				//	check if it's coming from our bdu hostname
			    //	if not, it's probably an external link and we
			    //	should open it in safari
				else if(!url.contains(hostName)) {
					//Open in external browser
					Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
	                startActivity(i);
					return true;
				}
				
				return false;
			}

			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				Log.i(TAG, "On Page Started: " + url);
			}

			@Override
			public void onPageFinished(WebView view, String url) {
				Log.i(TAG, "On Page Finished: " + url);
				
				webviewOnPageFinished(view, url);
			}
			
			@Override
			public void onLoadResource(WebView view, String url) {
				//Log.i(TAG, "onLoadResource: " + url);
			}
			
			@Override
			public void doUpdateVisitedHistory(WebView view, String url, boolean isReload) {
				Log.i(TAG, "doUpdateVisitedHistory: " + url + " " + isReload);
			}
			
			@Override
			public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
				Log.i(TAG, "onReceivedError: " + errorCode + " " + description + " " + failingUrl);
				
				//if there is an error found let us go back to the main screen like in iOS
				goBackToMainActivity();
			}
			
			// Events I havent seen in the logs ------------------------------------------------------------------------
			
			@Override
			public void onFormResubmission(WebView view, android.os.Message dontResend, android.os.Message resend) {
				Log.i(TAG, "onFormResubmission: " + dontResend + " " + resend);
			}
			
			@Override
			public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {
				Log.i(TAG, "onReceivedHttpAuthRequest: " + host + " " + realm);
			}
			
			@Override
			public void onReceivedLoginRequest(WebView view, String realm, String account, String args) {
				Log.i(TAG, "onReceivedLoginRequest: " + realm + " " + account);
			}
			
			@Override
			public void onReceivedSslError(WebView view, SslErrorHandler handler, android.net.http.SslError error) {
				Log.i(TAG, "onReceivedSslError: " + handler + " " + error);
			}
			
			@Override
			public void onScaleChanged(WebView view, float oldScale, float newScale) {
				Log.i(TAG, "onScaleChanged: " + oldScale + " " + newScale);
			}
			
			@Override
			public void onTooManyRedirects(WebView view, android.os.Message cancelMsg, android.os.Message continueMsg) {
				Log.i(TAG, "onTooManyRedirects: " + cancelMsg + " " + continueMsg);
			}
			
			@Override
			public void onUnhandledKeyEvent(WebView view, android.view.KeyEvent event) {
				Log.i(TAG, "onUnhandledKeyEvent: " + event.getKeyCode());
			}
			
			// --------------------------------------------------------------------------------------------------------
		});
        
		//	Load URL
		Log.i(TAG, "HostName: " + shellhostName);
		webView.loadUrl(shellhostName);
		
		helpLayout = (RelativeLayout) findViewById(R.id.helpLayout);
		helpWebView = (WebView) findViewById(R.id.helpWebView);
		closeButton = (ImageButton)findViewById(R.id.closeButton);
		
		helpWebView.getSettings().setJavaScriptEnabled(true);
		helpWebView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
		helpWebView.setWebChromeClient(new WebChromeClient());
		
		helpWebView.setWebViewClient(new WebViewClient());
		
		closeButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				helpLayout.setVisibility(LinearLayout.GONE);
			}
		});
	}
	
	@Override
	public void onPause() {
		super.onPause();
		Log.i(TAG, "On Pause");
		
		updatesManager.unregisterDownloadManager();
		
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
		webView.stopLoading();
		helpWebView.stopLoading();
		
		Log.i(TAG, "On Destroy");
		super.onDestroy();
	}
	
	@Override
	public void onRestart() {
		super.onRestart();
		Log.i(TAG, "On Restart");
//		Intent i = new Intent(this, MainActivity.class);
//		startActivity(i);
//		finish();
	}
	
	@Override
	public void onResume() {
		super.onResume();
		
		updatesManager.registerDownloadManager();
	}
	
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);
		
		Log.i(TAG, "Configuration Changed");
		// Checks the orientation of the screen
	    if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE || newConfig.orientation == Configuration.ORIENTATION_PORTRAIT) {
	    	Log.i(TAG, "Orientation Changed");
	    	
			SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
			SharedPreferences.Editor editor = settings.edit();
			editor.putBoolean("restartApp", false);
			// Commit the edits!
			editor.commit();
	    }
	}
	
	public void goBackToMainActivity() {
		Intent i = new Intent(this, MainActivity.class);
		startActivity(i);
		finish();
	}
	
	//------ WEBVIEW FUNCTIONS/CALLBACKS ----//
	
	public void webviewOnPageFinished(WebView view, String url) {
		SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
		
		//	set tech and demo mode - the device's settings should override the
		//	cookies set by the gui - we basically brute force this by setting the cookies
		//	with the device's setting values on every page load
		boolean demoMode = settings.getBoolean("demo-mode", true);
		String demoModeString = "TVRO.setDemoMode(" + (demoMode ? "true" : "false") + ");";
		
		boolean techMode = settings.getBoolean("tech-mode", true);
		String techModeString = "TVRO.setTechMode(" + (techMode ? "true" : "false") + ");";
		
		//  get the string, check for single quotes and escape them
		//  this should probably get helperd out
		String installerCompany = settings.getString("installer-company", "false");
		if(!installerCompany.equalsIgnoreCase("false")) {
			installerCompany = installerCompany.replaceAll("'", "\\'");
		}
		String installerCompanyString = "TVRO.setInstallerCompany(" + installerCompany + ");";
		
		String installerContact = settings.getString("installer-contact", "false");
		if(!installerContact.equalsIgnoreCase("false")) {
			installerContact = installerContact.replaceAll("'", "\\'"); 
		}
		String installerContactString = "TVRO.setInstallerContact(" + installerContact + ");";
		
		String installerPhone = settings.getString("installer-phone", "false");
		if(!installerPhone.equalsIgnoreCase("false")) {
			installerPhone = installerPhone.replaceAll("'", "\\'"); 
		}
		String installerPhoneString = "TVRO.setInstallerPhone(" + installerPhone + ");";
		
		String installerEmail = settings.getString("installer-email", "false");
		if(!installerEmail.equalsIgnoreCase("false")) {
			installerEmail = installerEmail.replaceAll("'", "\\'");
		}
		String installerEmailString = "TVRO.setInstallerEmail(" + installerEmail + ");";
		
		String javascript = demoModeString + techModeString + installerCompanyString + installerContactString + installerPhoneString + installerEmailString;
		
//		if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
//			
//			webView.evaluateJavascript(javascript, new ValueCallback<String>() {
//				@TargetApi(Build.VERSION_CODES.HONEYCOMB)
//				@Override
//				public void onReceiveValue(String value) {
//					
//					
//				}
//			});
//		} else {
			webView.loadUrl("javascript:"+javascript);
//		}
	}
	
	public void handleCustomURL(String url) {
		Log.i(TAG, "Custom URL: " + url);
		
		//	custom urls all begin with tvro://
		//	the custom urls are ...
		
		try {
			URI customURL = new URI(url);
			String[] pathComponents = customURL.getPath().split("/");
			
			if(customURL.getHost().equalsIgnoreCase("help")) {
				String helpURLString = "http://" + hostName + "/" + customURL.getHost() + "" + customURL.getPath() + "?" + customURL.getQuery();
				
				Log.i(TAG, "Help URL String: " + helpURLString);
				
				helpLayout.setVisibility(LinearLayout.VISIBLE);
				helpWebView.loadUrl(helpURLString);
			}
			else if(customURL.getHost().equalsIgnoreCase("change-hostname")) {
				Log.i(TAG, "Handle Custom URL Change HostName: " + customURL.getHost());
				 //	  tvro://change-hostname
			    //    brings you back to the bonjour list view
				goBackToMainActivity();
			}
			else if(customURL.getHost().equalsIgnoreCase("sat-finder")) {
				// TODO SatFinder
			}
			else if(customURL.getHost().equalsIgnoreCase("set-installer-company") ||
					customURL.getHost().equalsIgnoreCase("set-installer-contact") ||
					customURL.getHost().equalsIgnoreCase("set-installer-phone") ||
					customURL.getHost().equalsIgnoreCase("set-installer-email")) {
				String key = customURL.getHost().substring(4);
				String value = customURL.getHost().substring(1);
				
				Log.i(TAG, "Set Installer: " + key + ", " + value);
				
				SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
				SharedPreferences.Editor editor = settings.edit();
				editor.putString(key, value);
				// Commit the edits!
				editor.commit();
			}
			else if(customURL.getHost().equalsIgnoreCase("set-tech-mode") ||
					customURL.getHost().equalsIgnoreCase("set-demo-mode")) {
				//	tvro://set-tech-mode/{ true || false }
			    //	tvro://set-demo-mode/{ true || false }
			    //	setting tech/demo mode - these are done via cookies on desktop
			    //	but are done via NSUserDefaults in the mobile shell
			    //	the ui buttons in GeneralSettingsView of the web code is hooked up
			    //	to call these two functions on the iOS side
				
				String key = customURL.getHost().substring(4);
				boolean value = pathComponents[1].equalsIgnoreCase("true");
				
				Log.i(TAG, "Set Mode: " + key + ", " + value);
				
				SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
				SharedPreferences.Editor editor = settings.edit();
				editor.putBoolean(key, value);
				// Commit the edits!
				editor.commit();
			}
			else if(customURL.getHost().equalsIgnoreCase("get-device-versions")) {
				//	tvro://get-device-versions
			    //	gets versions of the stored update files
			    // 	makes a javascript call that gives the web code the device versions
				setDeviceVersions();
			}
			else if(customURL.getHost().equalsIgnoreCase("download")) {
				String updateType = pathComponents[1];
				String portalVersion = pathComponents[2];
				String portalUrl = "";
				for(int i = 3; i < pathComponents.length; i++) {
					portalUrl = portalUrl + pathComponents[i] + "/";
				}
				
				Log.i(TAG, "Download: " + updateType + ", " + portalVersion + ", " + portalUrl);
				
				updatesManager.startDownload(updateType, portalVersion, portalUrl);
			}
			else if(customURL.getHost().equalsIgnoreCase("upload")) {
				String updateType = pathComponents[1];
				String uploadURLString = "http://" + hostName + "/xmlservices.php/set_config_file";
				
				Log.i(TAG, "Upload: " + updateType + ", " + uploadURLString);
				
				
				updatesManager.startUpload(updateType, uploadURLString);
//				webView.loadUrl(uploadURLString);
			}
			
		} catch (Exception e) {
			Log.e(TAG, e.toString());
		}
		
		/* 
  //invalidate timer otherwise we will be kicked back to the bonjour
  //from calls like set-demo-mode, set-tech-mode
  [timeoutTimer invalidate];
  [loadingView setHidden:TRUE];

		 */
	}
	
	public void setDeviceVersions() {
		String satLibraryDeviceVersion = updatesManager.deviceVersionForUpdateType("satlibrary");
		String tv1DeviceVersion = updatesManager.deviceVersionForUpdateType("tv1");
		String tv3DeviceVersion = updatesManager.deviceVersionForUpdateType("tv3");
		String tv5DeviceVersion = updatesManager.deviceVersionForUpdateType("tv5");
		String tv6DeviceVersion = updatesManager.deviceVersionForUpdateType("tv6");
		String rv1DeviceVersion = updatesManager.deviceVersionForUpdateType("rv1");
		
		String jString = "TVRO.setDeviceVersions({ SatLibrary: '" + satLibraryDeviceVersion + "', TV1: '" + tv1DeviceVersion + "', TV3: '" + tv3DeviceVersion + "', TV5: '" + tv5DeviceVersion + "', TV6: '" + tv6DeviceVersion + "', RV1: '" + rv1DeviceVersion + "' });";
		
		Log.i(TAG, "Set Device Versions JavaScript: " + jString);
		
		webView.loadUrl("javascript:"+jString);
	}
	
	//----------------- Updates Manager Callback
	
	public void downloadCompleted() {
		Log.i(TAG, "Reload Page: " + webView.getUrl());
		webView.reload();
	}
	
	public void uploadCompleted(String fileName) {
		String jsString = "TVRO.installSoftware({ install: 'Y', filename: '" + fileName + "' }).then(TVRO.reload);";
		
		Log.i(TAG, "Upload Complete JavaScript: " + jsString);
		
		webView.loadUrl("javascript:" + jsString);
		
	}
}
