package com.kvh.kvhandroid;

import java.net.MalformedURLException;
import java.net.URL;

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
		
		setContentView(R.layout.webviewactiivity);
		
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
			
			goBackToMainActivity();
		}
		
		String shellhostName = "http://192.168.2.121/shell.php";
				
		Bundle extras = getIntent().getExtras();
		if (extras != null) {
			String tempHostName = extras.getString("hostName");
			if(tempHostName.charAt(tempHostName.length() - 1) == '/')
				hostName = tempHostName.substring(0, tempHostName.length() - 1);
			
			shellhostName = "http://" + shellhostName + "/shell.php";
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
				Log.i("KVH", "shouldOverrideUrlLoading: "+ url);
				return false;
			}

			@Override
			public void onPageStarted(WebView view, String url, Bitmap favicon) {
				Log.i(TAG, "On Page Started: " + url);
				
				//	check if it's a javascript to ios/android command
				//	being called with a the scheme "tvro"
				//	unlike iOS, we're going to just parse the url and check if it begins with tvro
				String scheme = url.substring(0, 4);
				Log.i(TAG, "URL scheme: " + scheme);
				if(scheme.contains("tvro")) {
					handleCustomURL(url);
				}
				
				/*
  } else if ([request.URL.relativeString isEqualToString:@"about:blank"]) {
    //	were trying to go to about:blank for some reason lets negate that
    NSLog(@"    [request.URL.relativeString isEqualToString:@\"about:blank\"]");
    [timeoutTimer invalidate];
    [loadingView setHidden:TRUE];
    return false;
    
    
    //	check if it's coming from our bdu hostname
    //	if not, it's probably an external link and we
    //	should open it in safari
	} else if (![hostName isEqualToString:_hostName]) {
		NSLog(@"    ![hostName isEqualToString:_hostName]");
    //		[[UIApplication sharedApplication] openURL:request.URL];
    //		return false;
		return true;
    
    
    //	} else if ([request.URL.pathComponents objectAtIndex:1])
    
    //	at this point it's probably just another path in our app,
    //	so return true and let the uiwebview continue loading
	} else {
		return true;
	}
				 */
				
				//	TODO: determine is device can implement sat finder
//				String satFinderAvailable = true ? "true" : "false";
//				String javascript = "var TVRO = { MOBILE_APP: true, SAT_FINDER: " + satFinderAvailable + " };";
//				webView.loadUrl("javascript:"+javascript);
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
		String demoMode = settings.getString("demo-mode", "true");
		String demoModeString = "TVRO.setDemoMode(" + demoMode + ");";
		
		String techMode = settings.getString("tech-mode", "true");
		String techModeString = "TVRO.setTechMode(" + techMode + ");";
		
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
//					// TODO Auto-generated method stub
//					
//				}
//			});
//		} else {
			webView.loadUrl("javascript:"+javascript);
//		}
	}
	
	public void handleCustomURL(String url) {
		//	custom urls all begin with tvro://
		//	the custom urls are ...
		
		try {
			URL customURL = new URL(url);
			
			if(customURL.getHost().equalsIgnoreCase("help")) {
				String helpURLString = "http://" + hostName + "/" + customURL.getHost() + "/" + customURL.getPath() + "/" + customURL.getQuery();
				//SETUP HELP WEBVIEW
			}
			
		} catch (MalformedURLException e) {
			Log.e(TAG, e.toString());
		}
		/*
  
  NSArray* pathComponents = [url pathComponents];
  
  } else if ([url.host isEqualToString:@"change-hostname"]) {
    //	tvro://change-hostname
    //    brings you back to the bonjour list view
    [self goBackToHostSelect];
    
    
  } else if ([url.host isEqualToString:@"sat-finder"]) {
    //	tvro://sat-finder
    //    shows the sat finder - desktop has no sat finder
    [self showSatFinder];
    
    
	} else if ([url.host isEqualToString:@"set-installer-company"]
          || [url.host isEqualToString:@"set-installer-contact"]
					|| [url.host isEqualToString:@"set-installer-phone"]
					|| [url.host isEqualToString:@"set-installer-email"]) {
		NSString* key = [url.host substringFromIndex:4];
		NSString* value = [url.path substringFromIndex:1];
		[[NSUserDefaults standardUserDefaults] setValue:value forKey:key];
		[[NSUserDefaults standardUserDefaults] synchronize];


  } else if ([url.host isEqualToString:@"set-tech-mode"] || [url.host isEqualToString:@"set-demo-mode"]) {
    //	tvro://set-tech-mode/{ true || false }
    //	tvro://set-demo-mode/{ true || false }
    //    setting tech/demo mode - these are done via cookies on desktop
    //    but are done via NSUserDefaults in the mobile shell
    //    the ui buttons in GeneralSettingsView of the web code is hooked up
    //    to call these two functions on the iOS side
    NSString* key = [url.host substringFromIndex:4];
    BOOL value = [[pathComponents objectAtIndex:1] isEqualToString:@"true"];
    [[NSUserDefaults standardUserDefaults] setBool:value forKey:key];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    
  } else if ([url.host isEqualToString:@"get-device-versions"]) {
    //	tvro://get-device-versions
    //    gets versions of the stored update files
    //    makes a javascript call that gives the web code the device versions
    [self setDeviceVersions];
    
    
  } else if ([url.host isEqualToString:@"download"]) {
    //  tvro://download/{ update-type-to-download }/{ portal-version-to-store-for-device-versions-call }/{ portal-url-to-download-update-from }
    //    starts downloading the a specifed version of the update file
    //    for a specified antenna-type
    //    from a specifed url
    //    this reponsibility is passed from the web code to the mobile code because
    //    you cannot navigate the filesystem on some mobile devices for certain kinds of files
    NSString* updateType = [NSString stringWithString:pathComponents[1]];
    NSString* portalVersion = [NSString stringWithString:pathComponents[2]];
    NSString* portalUrl = [[pathComponents subarrayWithRange:NSMakeRange(3, [pathComponents count]-3)] componentsJoinedByString:@"/"];
    [updatesManager startDownloadForUpdateType:updateType portalVersion:portalVersion portalUrl:[NSURL URLWithString:portalUrl]];
    
    
  } else if ([url.host isEqualToString:@"upload"]) {
    //  tvro://upload/{ update-type-to-upload-and-install }
    //    calls the install_software method of the backend
    //    we do this for the same reason as the download - some devices can't
    //    search/find and upload/install the file from the device's file system
    NSString* updateType = [NSString stringWithString:pathComponents[1]];
    NSString* uploadURLString = [NSString stringWithFormat:@"http://%@/xmlservices.php/set_config_file", hostName];
    NSURL* uploadURL = [NSURL URLWithString:uploadURLString];
    [updatesManager startUploadForUpdateType:updateType uploadUrl:uploadURL];
  }
  
  //invalidate timer otherwise we will be kicked back to the bonjour
  //from calls like set-demo-mode, set-tech-mode
  [timeoutTimer invalidate];
  [loadingView setHidden:TRUE];

		 */
	}
}
