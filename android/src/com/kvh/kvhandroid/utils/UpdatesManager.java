package com.kvh.kvhandroid.utils;

import java.io.File;

import android.app.Activity;
import android.app.DownloadManager;
import android.app.ProgressDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;

public class UpdatesManager {
	private String TAG = "KVHANDROID - UpdatesManager";
	
	private Activity activity;
	private UpdatesManagerCallback updatesManagerCallback;
	private DownloadManager downloadManager;
	
	private String updateType;
	private String portalVersion;
	private long download_id;
	
	private ProgressDialog downloadProgressDialog;
	
	public UpdatesManager(Activity act, UpdatesManagerCallback callback) {
		updatesManagerCallback = callback;
		this.activity = act;
		
		downloadManager = (DownloadManager)activity.getSystemService(activity.DOWNLOAD_SERVICE);

	}
	
	public String deviceVersionForUpdateType(String updateType) {
		String key =  updateType.toLowerCase() + "-device-version";
		
		SharedPreferences settings = activity.getSharedPreferences(Constants.PREFS_NAME, 0);
		return settings.getString(key, "");
	}
	
	public void startDownload(String _updateType, String _portalVersion, String portalURL) {
		String tempPortalURL = portalURL;
		updateType = _updateType.toLowerCase();
		portalVersion = _portalVersion.toLowerCase();
		
		//setup the download rpogress dialog
		downloadProgressDialog = new ProgressDialog(activity);
		downloadProgressDialog.setTitle("Downloading Update ...");
		downloadProgressDialog.setMessage("Download in progress ...");
		downloadProgressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
		downloadProgressDialog.show();
		
		//fix the download url
		if(tempPortalURL.charAt(tempPortalURL.length() - 1) == '/')
			tempPortalURL = tempPortalURL.substring(0, tempPortalURL.length() - 1);
		
		Uri download_uri = Uri.parse(tempPortalURL);
		
		Log.i(TAG, "Download Uri: " + download_uri.getHost() + " " + download_uri.getPath() + " " + download_uri.getPathSegments().get(download_uri.getPathSegments().size() - 1));
		
		//create the subfolders
		File direct = new File(Environment.getExternalStorageDirectory() + "/kvh_files");
        if (!direct.exists()) {
            direct.mkdirs();
        }
		
		DownloadManager.Request request = new DownloadManager.Request(download_uri);
		//set the download path
		request.setDestinationInExternalPublicDir("/kvh_files", download_uri.getPathSegments().get(download_uri.getPathSegments().size() - 1));
		//start downloading
		download_id = downloadManager.enqueue(request);
		
		//Save the download id
		SharedPreferences settings = activity.getSharedPreferences(Constants.PREFS_NAME, 0);
		SharedPreferences.Editor editor = settings.edit();
		editor.putLong("downloadid", download_id);
		// Commit the edits!
		editor.commit();
		
		//to get the download progress
		new Thread(new Runnable() {
            @Override
            public void run() {

                boolean downloading = true;

                while (downloading) {

                    DownloadManager.Query q = new DownloadManager.Query();
                    q.setFilterById(download_id);

                    android.database.Cursor cursor = downloadManager.query(q);
                    cursor.moveToFirst();
                    final int bytes_downloaded = cursor.getInt(cursor
                            .getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
                    final int bytes_total = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));

                    if (cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_STATUS)) == DownloadManager.STATUS_SUCCESSFUL) {
                        downloading = false;
                    }
                    
                    Log.d(TAG, "Downloaded: " + bytes_downloaded + " / " + bytes_total);

//                    final int dl_progress = (int) ((bytes_downloaded * 100l) / bytes_total);
                    
                    activity.runOnUiThread(new Runnable() {

                        @Override
                        public void run() {
                        	if(bytes_total == -1) {
                        		downloadProgressDialog.setProgress(0);
                        		downloadProgressDialog.setMax(1);
                        	} else {
                        		//if(!downloadProgressDialog.isShowing())
                        		downloadProgressDialog.setProgress(bytes_downloaded);
                        		downloadProgressDialog.setMax(bytes_total);
                        	}
                        	
                        }
                    });
                    cursor.close();
                }

            }
        }).start();
	}
	
	public void startUpload(String _updateType, String uploadUrl) {
		/*
		if (connection) {
			[connection cancel];
			connection = nil;
		}
		
		[fileData setLength:0];
		
		updateType = [_updateType lowercaseString];
		
		NSString* filePath = [self filePathForUpdateType:updateType];
		NSString* fileName = [filePath lastPathComponent];
		[fileData appendData:[NSData dataWithContentsOfFile:filePath]];
		
		NSString* stringBoundary = @"0xKHTMLBoundary";
	  NSMutableDictionary* headers = [[NSMutableDictionary alloc] init];
	  [headers setValue:@"no-cache" forKey:@"Cache-Control"];
	  [headers setValue:@"no-cache" forKey:@"Pragma"];
	  [headers setValue:[NSString stringWithFormat:@"multipart/form-data; boundary=%@", stringBoundary] forKey:@"Content-Type"];
	  
	  NSMutableURLRequest* request = [NSMutableURLRequest requestWithURL:uploadUrl cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:60.0];
	  [request setHTTPMethod:@"POST"];
	  [request setAllHTTPHeaderFields:headers];
	  
	  NSMutableData* postData = [NSMutableData dataWithCapacity:[fileData length] + 512];
	  [postData appendData:[[NSString stringWithFormat:@"--%@\r\n", stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
	  [postData appendData:[[NSString stringWithFormat:@"Content-Disposition: form-data; name=\"fileToUpload\"; filename=\"%@\"\r\n\r\n", fileName] dataUsingEncoding:NSUTF8StringEncoding]];
	  [postData appendData:fileData];
	  [postData appendData:[[NSString stringWithFormat:@"\r\n--%@--\r\n", stringBoundary] dataUsingEncoding:NSUTF8StringEncoding]];
	  [request setHTTPBody:postData];
	  
	  [uploadAlertView show];
	  
	  uploading = true;
		connection = [[NSURLConnection alloc] initWithRequest:request delegate:self];
		[connection start];
		*/
	}
	
	public void registerDownloadManager() {   
		IntentFilter intentFilter = new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE);
		activity.registerReceiver(downloadReceiver, intentFilter);
	}
	
	public void unregisterDownloadManager() {
		activity.unregisterReceiver(downloadReceiver);
	}
	  
	 private BroadcastReceiver downloadReceiver = new BroadcastReceiver() {

		@Override
		public void onReceive(Context context, Intent intent) {
			   
			DownloadManager.Query query = new DownloadManager.Query();
			SharedPreferences settings = context.getSharedPreferences(Constants.PREFS_NAME, 0);
			query.setFilterById(settings.getLong("downloadid", 0));
			android.database.Cursor cursor = downloadManager.query(query);
			     
			if(cursor.moveToFirst()) {
				int columnIndex = cursor.getColumnIndex(DownloadManager.COLUMN_STATUS);
			    int status = cursor.getInt(columnIndex);
			    int columnReason = cursor.getColumnIndex(DownloadManager.COLUMN_REASON);
			    int reason = cursor.getInt(columnReason);
			      
			    if(status == DownloadManager.STATUS_SUCCESSFUL) {  	
			    	String fileLocationString = cursor.getString(cursor.getColumnIndex(DownloadManager.COLUMN_LOCAL_URI));
			    	
			    	//save information in preferences
			    	SharedPreferences.Editor editor = settings.edit();
		    		editor.putString(updateType + "-device-version", portalVersion);
		    		editor.putString(updateType + "-file-path", fileLocationString);
		    		editor.commit();
			       
		    		downloadProgressDialog.dismiss();
		    		updatesManagerCallback.downloadCompleted();
		    		cursor.close();
			    } else if(status == DownloadManager.STATUS_FAILED) {
			    	android.widget.Toast.makeText(context, "FAILED!\n" + "reason of " + reason, android.widget.Toast.LENGTH_LONG).show();
			    } else if(status == DownloadManager.STATUS_PAUSED) {
			    	android.widget.Toast.makeText(context, "PAUSED!\n" + "reason of " + reason, android.widget.Toast.LENGTH_LONG).show();
			    } else if(status == DownloadManager.STATUS_PENDING) {
			    	android.widget.Toast.makeText(context, "PENDING!", android.widget.Toast.LENGTH_LONG).show();
			    }else if(status == DownloadManager.STATUS_RUNNING){
//			    	android.widget.Toast.makeText(context, "RUNNING!", android.widget.Toast.LENGTH_LONG).show();
			    	int bytes_downloaded = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR));
                    int bytes_total = cursor.getInt(cursor.getColumnIndex(DownloadManager.COLUMN_TOTAL_SIZE_BYTES));
			    	Log.i(TAG, "Download Manager Running: " + bytes_downloaded + " / " + bytes_total);
			    }
			}
		}
	    
	 };
}
