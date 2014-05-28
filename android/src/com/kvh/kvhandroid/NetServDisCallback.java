package com.kvh.kvhandroid;

import android.net.nsd.NsdServiceInfo;

public interface NetServDisCallback {
	public void foundService(NsdServiceInfo serviceInfo);
}
