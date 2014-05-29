package com.kvh.kvhandroid;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.webkit.*;
import android.graphics.Bitmap;

public class WebViewActivity extends Activity {
	
	WebView webView;
	
	private String hostName;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
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
}
