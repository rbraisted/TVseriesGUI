package com.kvh.android.uielements;

import com.kvh.kvhandroid.R;
import com.kvh.kvhandroid.R.id;
import com.kvh.kvhandroid.R.layout;
import com.kvh.kvhandroid.nsd.NetServDisCallback;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class ServiceTableRow extends LinearLayout {
	private ServiceTableRow str = this;
	
	
	ServiceTableRowCallback serviceTableRowCallback;
	
	private String TAG = "KVHANDROID - ServiceTableRow";
	private int tag;
	
	public ServiceTableRow(Context context, AttributeSet attrs) {
		super(context, attrs);
		initialize(context);
	}
	
	public ServiceTableRow(Context context, ServiceTableRowCallback tablerowCallback) {
		super(context);
		initialize(context);
		serviceTableRowCallback = tablerowCallback;
	}
	
	private void initialize(Context context) {
		LayoutInflater.from(context).inflate(R.layout.servicetablerow, this, true);
		tag = 0;
		setOnClickListenerForImage();
	}
	
	public void setServiceName(String serviceName) {
		TextView serviceNameTextView = (TextView)findViewById(R.id.serviceName);
		serviceNameTextView.setText(serviceName);
	}
	
	public void setServiceIPAddress(String serviceIPAddress) {
		TextView serviceIPAddressTextView = (TextView)findViewById(R.id.serviceIPAddress);
		serviceIPAddressTextView.setText(serviceIPAddress);
	}
	
	public void setServiceInformation(String name, String ipAddress) {
		setServiceName(name);
		setServiceIPAddress(ipAddress);
	}
	
	public void setBackgroundImageId(int id) {
		//#3f4354 - dark
		//#4e5267 - light
		LinearLayout layout = (LinearLayout) findViewById(R.id.mainlayout);
		
		if(id == 0) {
			layout.setBackgroundColor(Color.rgb(78, 82, 103)); //light
		} else {
			layout.setBackgroundColor(Color.rgb(63, 67, 84)); //dark
		}
	}
	
	public void setTag(int _tag) {
		tag = _tag;
	}
	
	public int getTagValue() {
		return tag;
	}
	
	private void setOnClickListenerForImage() {
		LinearLayout layout = (LinearLayout) findViewById(R.id.mainlayout);
		
		layout.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				Log.i(TAG, "ServiceTableRow Clicked");
				
				serviceTableRowCallback.serviceTableRowClicked(str);
			}
		});
	}
}
