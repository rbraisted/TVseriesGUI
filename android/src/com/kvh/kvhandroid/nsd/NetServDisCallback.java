package com.kvh.kvhandroid.nsd;

import android.net.nsd.NsdServiceInfo;

public interface NetServDisCallback {
	public void foundService(NsdServiceInfo serviceInfo);
}
