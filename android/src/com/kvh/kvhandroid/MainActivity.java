package com.kvh.kvhandroid;

import java.util.ArrayList;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.nsd.NsdServiceInfo;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.WindowManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.kvh.android.uielements.ServiceTableRow;
import com.kvh.android.uielements.ServiceTableRowCallback;
import com.kvh.kvhandroid.nsd.NetServDisCallback;
import com.kvh.kvhandroid.nsd.NetServDisHelper;
import com.kvh.kvhandroid.utils.Constants;

public class MainActivity extends Activity implements NetServDisCallback, OnClickListener, ServiceTableRowCallback {
	private MainActivity a = this;
	private String TAG = "KVHANDROID - MainActivity";

	private NetServDisHelper networkServiceDiscoveryHelper;
	private ArrayList<NsdServiceInfo> nsdServiceInfos;

	//from layout file
	LinearLayout tableLayout;
	EditText hostNameEditText;

	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		//		setContentView(R.layout.activity_main);
		setContentView(R.layout.mainactivity);
		hostNameEditText = (EditText)findViewById(R.id.hostEditText);
		//IMPORTANT:
		//initalize the Constants
		Constants.init();

		SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);

		//load the saved text
		String savedHostName = settings.getString("hostNameEditText", null);
		if(savedHostName != null) {
			EditText hostNameEditText = (EditText)findViewById(R.id.hostEditText);
			hostNameEditText.setText(savedHostName);
		}

		//reset the flag which will determine if the app needs a restart because of Android's Application Manager
		SharedPreferences.Editor editor = settings.edit();
		editor.putBoolean("restartApp", false);
		// Commit the edits!
		editor.commit();

		//initialize the variables
		nsdServiceInfos = new ArrayList<NsdServiceInfo>();

		tableLayout = (LinearLayout)findViewById(R.id.tableLayout);
		tableLayout.removeAllViews();

		Log.i(TAG, "onCreate");

		//now lets detect the devices
		//foundService is called whenever this helper class discovers a service
		networkServiceDiscoveryHelper = new NetServDisHelper(this, this);
		networkServiceDiscoveryHelper.initializeNetworkServiceDiscovery();
		networkServiceDiscoveryHelper.startDiscoverServices();

		ImageButton refreshButton = (ImageButton)findViewById(R.id.refreshButton);
		refreshButton.setOnClickListener(this);
		ImageButton connectButton = (ImageButton)findViewById(R.id.connectButton);
		connectButton.setOnClickListener(this);
		ImageButton updatesButton = (ImageButton)findViewById(R.id.viewUpdatesButton);
		updatesButton.setOnClickListener(this);

		getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);

	}

	@Override
	protected void onDestroy() {
		networkServiceDiscoveryHelper.stopDiscoverServices();
		super.onDestroy();
	}

	protected void onPause() {
		super.onPause();
		//		networkServiceDiscoveryHelper.stopDiscoverServices();

		onDestroy();
	}


	public void foundService(NsdServiceInfo serviceInfo) {
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
					clearTable();

					for(int i = 0; i < nsdServiceInfos.size(); i++) {
						NsdServiceInfo serviceInfoItem = nsdServiceInfos.get(i);

						//parse the unicode since the name will have \032 as spaces.
						String serviceName = serviceInfoItem.getServiceName();
						serviceName = serviceName.replaceAll("\\\\", "");
						serviceName = serviceName.replaceAll("032", " ");
						/*if(serviceName.length() > 13) {
							serviceName = serviceName.substring(0, 12);
							serviceName = serviceName + "...";
						}*/									

						int index = serviceName.indexOf("tvhub-");

						if(index>=0)
						{
							serviceName = serviceName.substring(index + 6, serviceName.length());							

							//Create a row
							ServiceTableRow serviceTableRow = new ServiceTableRow(a, a);
							serviceTableRow.setTag(i);
							serviceTableRow.setServiceInformation("S/N: " + serviceName, serviceInfoItem.getHost().getHostAddress());
							tableLayout.addView(serviceTableRow);

						}					

					}

					//refresh colors
					for(int i = 0; i < tableLayout.getChildCount(); i++) {
						ServiceTableRow childItem = (ServiceTableRow)tableLayout.getChildAt(i);
						//we use light background if the index is a even number
						//otherwise use dark
						if(i % 2 == 0) {
							Log.i(TAG, "Service Use BG Light");
							childItem.setBackgroundImageId(0);
						}
						else {
							Log.i(TAG, "Service Use BG Dark");
							childItem.setBackgroundImageId(1);
						}
					}
				}
			});
		}
	}


	public void serviceTableRowClicked(ServiceTableRow item) {
		NsdServiceInfo serviceInfo = nsdServiceInfos.get(item.getTagValue());

		Log.i(TAG, "Service Table Row Clicked: " + serviceInfo.getServiceName() + " " + serviceInfo.getHost().getHostAddress());

		//Go To WebActivity
		gotoWebViewActivity(serviceInfo.getHost().getHostAddress());
	}

	public void onClick(View v) {
		if(v.getId() == R.id.refreshButton)
		{
			refreshButtonClicked();
		}
		else if(v.getId() == R.id.connectButton)
		{
			if(!hostNameEditText.getText().toString().equalsIgnoreCase(""))
			{
				if (isConnectingToInternet(MainActivity.this))
				{
					connectButtonClicked();
				}
				else
				{
					Toast.makeText(MainActivity.this, getString(R.string.str_connection_failed), Toast.LENGTH_LONG).show();
				}
			}				
			else
			{
				Toast.makeText(this, "Please enter IP Address or Hostname", Toast.LENGTH_SHORT).show();
			}

		}
		else if(v.getId() == R.id.viewUpdatesButton)
		{
			if (isConnectingToInternet(MainActivity.this))
			{
				viewUpdatesButtonClicked();
			}
			else
			{
				Toast.makeText(MainActivity.this, getString(R.string.failure_to_connect_with_updates_site), Toast.LENGTH_LONG).show();
			}

		}
	}

	public void refreshButtonClicked() {
		//lets restart the service discovery
		try {
			//			clearTable();
			//			networkServiceDiscoveryHelper.stopDiscoverServices();
			networkServiceDiscoveryHelper.startDiscoverServices();
		} catch (Exception e) {
			Log.e(TAG, "ERROR ON REFRESHING: " + e);
		}
	}

	public void connectButtonClicked() {
		Log.i(TAG, "Connect Button Clicked");

		//save what was written on the edit text field
		EditText hostNameEditText = (EditText)findViewById(R.id.hostEditText);
		//save the host name
		SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putString("hostNameEditText", hostNameEditText.getText().toString());
		// Commit the edits!
		editor.commit();

		//pass host to the webactivity
		//Go To WebActivity --- just for testing
		gotoWebViewActivity(hostNameEditText.getText().toString());
	}

	public void viewUpdatesButtonClicked() {		
		gotoWebViewActivity(Constants.kWebSvcPortal);	

	}

	public void clearTable() {
		tableLayout.removeAllViews();
	}

	public void gotoWebViewActivity(String url) {

		networkServiceDiscoveryHelper.stopDiscoverServices();

		//reset the flag
		SharedPreferences settings = getSharedPreferences(Constants.PREFS_NAME, 0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putBoolean("restartApp", false);
		// Commit the edits!
		editor.commit();

		Intent i = new Intent(MainActivity.this, WebViewActivity.class);
		i.putExtra("hostName", url);
		startActivity(i);
		//finish();


	}

	public boolean isConnectingToInternet(Context _context){
		ConnectivityManager connectivity = (ConnectivityManager) _context.getSystemService(Context.CONNECTIVITY_SERVICE);
		if (connectivity != null) 
		{
			NetworkInfo[] info = connectivity.getAllNetworkInfo();
			if (info != null) 
				for (int i = 0; i < info.length; i++) 
					if (info[i].getState() == NetworkInfo.State.CONNECTED)
					{
						return true;
					}

		}
		return false;
	}
}
