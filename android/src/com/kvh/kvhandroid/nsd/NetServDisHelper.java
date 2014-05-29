package com.kvh.kvhandroid.nsd;

import java.util.ArrayList;

import com.kvh.kvhandroid.utils.Constants;

import android.content.Context;
import android.net.nsd.NsdManager;
import android.net.nsd.NsdManager.ResolveListener;
import android.net.nsd.NsdServiceInfo;
import android.net.nsd.NsdManager.DiscoveryListener;
import android.util.Log;

public class NetServDisHelper {
	
	Context mContext;
	NetServDisCallback netServDisCallback;
	
	NsdManager mNsdManager;
	ResolveListener mResolveListener;
	DiscoveryListener mDiscoveryListener;
	NsdServiceInfo mService;
	
	ArrayList<String> hostNames;

    public static final String TAG = "KVHANDROID - NetServDisHelper";
	
	public String mServiceName = "NsdChat";
	
	public NetServDisHelper(Context context, NetServDisCallback callback) {
        mContext = context;
        
        hostNames = new ArrayList<String>();
        
        netServDisCallback = callback;
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
                
                //lets check if a same service has already been resolved and yet the service is still trying to resolve itself even though it should be resolved already
                //if thats the case then don't reconnect anymore
                boolean retryConnection = true;
                for(int i = 0; i < hostNames.size(); i++) {
                	
                }
                
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
                
                //we dont want an the same service being detected again and again so we shall keep track 
                String serviceName = serviceInfo.getServiceName();
                hostNames.add(serviceName);
                
                //we need a callback to pass these completed Service
                netServDisCallback.foundService(serviceInfo);
            }
        };
    }
	
	public void startDiscoverServices() {
		Log.i(TAG, "Discover Services For Bonjour Service Type: " + Constants.kBonjourServiceType);
		try{
			mNsdManager.discoverServices(Constants.kBonjourServiceType, NsdManager.PROTOCOL_DNS_SD, mDiscoveryListener);
		} catch (Exception e) {
			Log.e(TAG, "Could not start discover services: " + e);
		}
    }
	
	public void stopDiscoverServices() {
		try {
        mNsdManager.stopServiceDiscovery(mDiscoveryListener);
		} catch (Exception e) {
			Log.e(TAG, "Could not stop discover services: " + e);
		}
    }
}
