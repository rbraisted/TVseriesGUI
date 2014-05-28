package com.kvh.kvhandroid;

import java.util.ArrayList;

import android.net.nsd.NsdServiceInfo;
import android.os.Bundle;
import android.app.Activity;
import android.util.Log;
import android.webkit.WebView;
import android.widget.TableLayout;

public class MainActivity extends Activity implements NetServDisCallback {
	private MainActivity a = this;
	private String TAG = "KVHANDROID - MainActivity";
	
	private NetServDisHelper networkServiceDiscoveryHelper;
	private ArrayList<NsdServiceInfo> nsdServiceInfos;
	
	//from layout file
	TableLayout tableLayout;
	
	WebView webView;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
//		setContentView(R.layout.activity_main);
		setContentView(R.layout.main_layout);
		
		//IMPORTANT:
		//initalize the Constants
		Constants.init();
		
		//initialize the variables
		nsdServiceInfos = new ArrayList<NsdServiceInfo>();
		
		tableLayout = (TableLayout)findViewById(R.id.tableLayout);
		tableLayout.removeAllViews();
		
		//Test Cells
		//Create a row
		ServiceTableRow serviceTableRow = new ServiceTableRow(a);
		serviceTableRow.setServiceInformation("S/N: Rob's MacBoo...","192.168.0.255");
		tableLayout.addView(serviceTableRow);
		
		Log.i(TAG, "onCreate");
		
		networkServiceDiscoveryHelper = new NetServDisHelper(this, this);
//		networkServiceDiscoveryHelper.initializeNetworkServiceDiscovery();
//		networkServiceDiscoveryHelper.discoverServices();
		
		//OLD CODE --- MIGHT USE LATER
//		//	get the webview
//		webView = (WebView)findViewById(R.id.webView);
//		
//		//	enable javascript
//		webView.getSettings().setJavaScriptEnabled(true);
//		webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
//		
//		webView.setWebChromeClient(new WebChromeClient());
//		
//		webView.setWebViewClient(new WebViewClient() {
//			@Override
//			public boolean shouldOverrideUrlLoading(WebView view, String url) {
//				Log.i("KVH", "shouldOverrideUrlLoading"+url);
//				return false;
//			}
//
//			@Override
//			public void onPageStarted(WebView view, String url, Bitmap favicon) {
//				//	TODO: determine is device can implement sat finder
//				String satFinderAvailable = true ? "true" : "false";
//				String javascript = "var TVRO = { MOBILE_APP: true, SAT_FINDER: " + satFinderAvailable + " };";
//				webView.loadUrl("javascript:"+javascript);
//			}
//
//			@Override
//			public void onPageFinished(WebView view, String url) {
//				
//			}
//		});
//        
//		//	Load URL
//		webView.loadUrl("http://192.168.2.121/");
	}
	
	@Override
    protected void onDestroy() {
        super.onDestroy();
    }

	@Override
	public void foundService(final NsdServiceInfo serviceInfo) {
		nsdServiceInfos.add(serviceInfo);
		
		Log.i(TAG, "Added a Service Info: " + nsdServiceInfos.size());
		Log.i(TAG, "Last Service Info: " + nsdServiceInfos.get(nsdServiceInfos.size() - 1).getServiceName() + " " + nsdServiceInfos.get(nsdServiceInfos.size() - 1).getHost().getHostAddress());
		
		//since finding a service is running on a separate thread
		//Android doesn't allow a different thread to manipulate the UI so runOnUIThread is needed if manipulation of the UI is needed
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				//parse the unicode since the name will have \032 as spaces.
				String serviceName = serviceInfo.getServiceName();
				serviceName = serviceName.replaceAll("\\\\", "");
				serviceName = serviceName.replaceAll("032", " ");
				if(serviceName.length() > 13) {
					serviceName = serviceName.substring(0, 12);
					serviceName = serviceName + "...";
				}
				
				//Create a row
				ServiceTableRow serviceTableRow = new ServiceTableRow(a);
				serviceTableRow.setServiceInformation("S/N: " + serviceName, serviceInfo.getHost().getHostAddress());
				
				tableLayout.addView(serviceTableRow);
			}
		});
	}

}
