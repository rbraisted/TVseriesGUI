package com.kvh.kvhandroid;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.TableRow;
import android.widget.TextView;

public class ServiceTableRow extends TableRow {

	public ServiceTableRow(Context context, AttributeSet attrs) {
		super(context, attrs);
		LayoutInflater.from(context).inflate(R.layout.servicetablerow, this, true);
	}
	
	public ServiceTableRow(Context context) {
		super(context);
		LayoutInflater.from(context).inflate(R.layout.servicetablerow, this, true);
	}
	
	public void setServiceName(String serviceName) {
		TextView serviceNameTextView = (TextView)findViewById(R.id.serviceName);
		serviceNameTextView.setText(serviceName);
	}
	
	public void setServiceIPAddress(String serviceIPAddress) {
//		TextView serviceIPAddressTextView = (TextView)findViewById(R.id.serviceIPAddress);
//		serviceIPAddressTextView.setText(serviceIPAddress);
	}
	
	public void setServiceInformation(String name, String ipAddress) {
		setServiceName(name);
		setServiceIPAddress(ipAddress);
	}
}
