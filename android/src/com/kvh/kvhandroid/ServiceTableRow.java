package com.kvh.kvhandroid;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

public class ServiceTableRow extends LinearLayout {
	private ServiceTableRow str = this;
	
	
	NetServDisCallback netServDisCallback;
	
	private String TAG = "KVHANDROID - ServiceTableRow";
	private int tag;
	
	public ServiceTableRow(Context context, AttributeSet attrs) {
		super(context, attrs);
		initialize(context);
	}
	
	public ServiceTableRow(Context context, NetServDisCallback _netServDisCallback) {
		super(context);
		initialize(context);
		netServDisCallback = _netServDisCallback;
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
		ImageView layout = (ImageView)findViewById(R.id.backgroundImage);
//		layout.setBackgroundResource(id);
		layout.setImageResource(id);
	}
	
	public void setTag(int _tag) {
		tag = _tag;
	}
	
	public int getTagValue() {
		return tag;
	}
	
	private void setOnClickListenerForImage() {
		ImageView layout = (ImageView)findViewById(R.id.backgroundImage);
		layout.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				Log.i(TAG, "ServiceTableRow Clicked");
				
				netServDisCallback.serviceTableRowClicked(str);
			}
		});
	}
}
