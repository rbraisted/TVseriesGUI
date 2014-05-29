package com.kvh.kvhandroid;

import java.util.ArrayList;

import android.net.nsd.NsdServiceInfo;
import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.LinearLayout;

public class MainActivity extends Activity implements NetServDisCallback, OnClickListener {
	private MainActivity a = this;
	private String TAG = "KVHANDROID - MainActivity";
	
	private NetServDisHelper networkServiceDiscoveryHelper;
	private ArrayList<NsdServiceInfo> nsdServiceInfos;
	
	//from layout file
	LinearLayout tableLayout;
	
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
		
		tableLayout = (LinearLayout)findViewById(R.id.tableLayout);
		tableLayout.removeAllViews();
		
		//Test Cells
		//Create a row
//		ServiceTableRow serviceTableRow = new ServiceTableRow(a, a);
//		serviceTableRow.setServiceInformation("S/N: Rob's MacBoo...","192.168.0.255");
//		serviceTableRow.setBackgroundImageId(R.drawable.tablecellbglight);
//		tableLayout.addView(serviceTableRow);
//		ServiceTableRow serviceTableRow2 = new ServiceTableRow(a, a);
//		serviceTableRow2.setServiceInformation("S/N: revin","192.168.0.254");
//		serviceTableRow2.setBackgroundImageId(R.drawable.tablecellbgdark);
//		tableLayout.addView(serviceTableRow2);
		
		Log.i(TAG, "onCreate");
		
		//now lets detect the devices
		//foundService is called whenever this helper class discovers a service
		networkServiceDiscoveryHelper = new NetServDisHelper(this, this);
		networkServiceDiscoveryHelper.initializeNetworkServiceDiscovery();
		networkServiceDiscoveryHelper.startDiscoverServices();
		
		ImageButton refreshButton = (ImageButton)findViewById(R.id.refreshButton);
		refreshButton.setOnClickListener(this);
	}
	
	@Override
    protected void onDestroy() {
        super.onDestroy();
    }

	@Override
	public void foundService(final NsdServiceInfo serviceInfo) {
		//don't add if there is already an existing service info
		boolean toAdd = true;
		for(int i = 0; i < nsdServiceInfos.size(); i++) {
			NsdServiceInfo serviceItem = nsdServiceInfos.get(i);
			
			if(serviceItem.getServiceName().equalsIgnoreCase(serviceInfo.getServiceName()))
				toAdd = false;
		}
		
		if(toAdd) {
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
					ServiceTableRow serviceTableRow = new ServiceTableRow(a, a);
					serviceTableRow.setTag(nsdServiceInfos.size() - 1);
					serviceTableRow.setServiceInformation("S/N: " + serviceName, serviceInfo.getHost().getHostAddress());
					
					Log.i(TAG, "Service Index: " + (nsdServiceInfos.size() - 1));
					//we use light background if the index is a even number
					//otherwise use dark
					if((nsdServiceInfos.size() - 1) % 2 == 0) serviceTableRow.setBackgroundImageId(R.drawable.tablecellbglight);
					else serviceTableRow.setBackgroundImageId(R.drawable.tablecellbgdark);
					
					tableLayout.addView(serviceTableRow);
				}
			});
		}
	}

	@Override
	public void serviceTableRowClicked(ServiceTableRow item) {
		NsdServiceInfo serviceInfo = nsdServiceInfos.get(item.getTagValue());
		
		Log.i(TAG, "Service Table Row Clicked: " + serviceInfo.getServiceName() + " " + serviceInfo.getHost().getHostAddress());
		
		//Go To WebActivity
		Intent i = new Intent(getApplicationContext(), WebViewActivity.class);
		i.putExtra("hostName", serviceInfo.getHost().getHostAddress());
		startActivity(i);
		finish();
	}

	@Override
	public void onClick(View v) {
		if(v.getId() == R.id.refreshButton)
			refreshButtonClicked();
	}
	
	public void refreshButtonClicked() {
		//lets restart the service discovery
		try {
//			clearTable();
			networkServiceDiscoveryHelper.stopDiscoverServices();
//			networkServiceDiscoveryHelper.startDiscoverServices();
			
			//Go To WebActivity
			Intent i = new Intent(this, WebViewActivity.class);
			i.putExtra("hostName", "192.168.2.139");
			startActivity(i);
			finish();
		} catch (Exception e) {
			Log.e(TAG, "ERROR ON REFRESHING: " + e);
		}
	}
	
	public void clearTable() {
		tableLayout.removeAllViews();
		nsdServiceInfos = new ArrayList<NsdServiceInfo>();
	}
}
