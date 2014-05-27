package com.kvh.kvhandroid;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdManager.ResolveListener;
import android.net.nsd.NsdServiceInfo;
import android.net.nsd.NsdManager.DiscoveryListener;
import android.util.Log;

public class NetServDisHelper {
	
	Context mContext;
	
	NsdManager mNsdManager;
	ResolveListener mResolveListener;
	DiscoveryListener mDiscoveryListener;
	NsdServiceInfo mService;
	
	public static final String SERVICE_TYPE = "_http._tcp.";

    public static final String TAG = "KVHANDROID - NetServDisHelper";
	
	public String mServiceName = "NsdChat";
	
	public NetServDisHelper(Context context) {
        mContext = context;
        mNsdManager = (NsdManager) context.getSystemService(Context.NSD_SERVICE);
    }
	
	public void initializeNetworkServiceDiscovery() {
		Log.i(TAG, "Initialize Network Service Discovery");
		initializeResolveListener();
        initializeDiscoveryListener();
    }
	
	public void initializeDiscoveryListener() {
		// Instantiate a new DiscoveryListener
	    mDiscoveryListener = new NsdManager.DiscoveryListener() {

	    	//  Called as soon as service discovery begins.
	    	//	Will detect IPs from that point on
	    	@Override
	    	public void onDiscoveryStarted(String serviceType) {
	    		Log.d(TAG, "Service discovery started");
	    	}
	    	
			@Override
			public void onStartDiscoveryFailed(String serviceType, int errorCode) {
				Log.e(TAG, "Discovery failed: Error code:" + errorCode);
                mNsdManager.stopServiceDiscovery(this);
			}

			@Override
			public void onStopDiscoveryFailed(String serviceType, int errorCode) {
				Log.e(TAG, "Discovery failed: Error code:" + errorCode);
                mNsdManager.stopServiceDiscovery(this);
			}

			@Override
			public void onDiscoveryStopped(String serviceType) {
				Log.i(TAG, "Discovery stopped: " + serviceType);  
			}

			// once it finds Services it would go here
			@Override
			public void onServiceFound(NsdServiceInfo serviceInfo) {
				// A service was found!  Do something with it.
	            Log.d(TAG, "Service discovery success: " + serviceInfo + " IP: ");
	            if (!serviceInfo.getServiceType().equals(Constants.kBonjourServiceType)) {
	                // Service type is the string containing the protocol and
	                // transport layer for this service.
	                Log.d(TAG, "Unknown Service Type: " + serviceInfo.getServiceType());
	            } else if (serviceInfo.getServiceName().equals(mServiceName)) {
	                // The name of the service tells the user what they'd be
	                // connecting to. It could be "Bob's Chat App".
	                Log.d(TAG, "Same machine: " + mServiceName);
	            }
	            
	            // We need to resolve the information since this is to get more information like Ports and IP Addresses
	            mNsdManager.resolveService(serviceInfo, mResolveListener);
			}

			@Override
			public void onServiceLost(NsdServiceInfo serviceInfo) {
				Log.e(TAG, "service lost" + serviceInfo);
                if (mService == serviceInfo) {
                    mService = null;
                }
			}
	    	
	    };
	}
	
	public void initializeResolveListener() {
        mResolveListener = new NsdManager.ResolveListener() {

            @Override
            public void onResolveFailed(NsdServiceInfo serviceInfo, int errorCode) {
                Log.e(TAG, "Resolve failed: " + errorCode + " Service: " + serviceInfo);
                //lets retry the conenction
                mNsdManager.resolveService(serviceInfo, mResolveListener);
            }

            @Override
            public void onServiceResolved(NsdServiceInfo serviceInfo) {
                Log.i(TAG, "Resolve Succeeded. " + serviceInfo + " IP: " + serviceInfo.getHost().getHostAddress());

                if (serviceInfo.getServiceName().equals(mServiceName)) {
                    Log.d(TAG, "Same IP.");
                    return;
                }
                mService = serviceInfo;
                
                //we need a callback to pass these completed Service
            }
        };
    }
	
	public void discoverServices() {
		Log.i(TAG, "Discover Services For Bonjour Service Type: " + Constants.kBonjourServiceType);
        mNsdManager.discoverServices(Constants.kBonjourServiceType, NsdManager.PROTOCOL_DNS_SD, mDiscoveryListener);
    }
}
