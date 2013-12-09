package com.kvh.kvhandroid;

import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.graphics.Bitmap;

public class MainActivity extends Activity {

	WebView webView;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		Log.i("KVH", "onCreate");
		
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
		webView.loadUrl("http://192.168.2.121/");
	}
}
