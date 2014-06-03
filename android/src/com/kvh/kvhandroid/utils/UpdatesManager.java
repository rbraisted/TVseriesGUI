package com.kvh.kvhandroid.utils;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

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
import android.widget.Toast;

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
	
	public void startUpload(String _updateType, final String uploadUrl) {
		updateType = _updateType.toLowerCase();
		
		SharedPreferences settings = activity.getSharedPreferences(Constants.PREFS_NAME, 0);
		
		String filePath = settings.getString(updateType + "-file-path", "");
		
		if(filePath.equals("")) {
			android.widget.Toast.makeText(activity, "Could not find update file.", android.widget.Toast.LENGTH_LONG).show();
			return;
		} else {
			String[] filePathArray = filePath.split("/");
			final String fileName = filePathArray[filePathArray.length - 1];
			final File file = new File(Environment.getExternalStorageDirectory() + "/kvh_files", fileName);
			final String stringBoundary = "0xKHTMLBoundary";
			
			Log.i(TAG, "Checking before upload: " + fileName + " " + file.exists());
			
			downloadProgressDialog = new ProgressDialog(activity);
			downloadProgressDialog.setTitle("Uploading File ...");
			downloadProgressDialog.setMessage("Upload in progress ...");
			downloadProgressDialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
			downloadProgressDialog.show();
			
			//Lets start uploading
			//have to create a new thread since it will throw an exception if executing uploads on the main thread
			new Thread(new Runnable() {
				@Override
	            public void run() {
					try {
						Log.i(TAG, "Starting Thread");
						
						HttpURLConnection conn = null;
				        DataOutputStream dos = null;
//				        DataInputStream dis = null;
				        FileInputStream fileInputStream = null;
				        byte[] buffer;
				        int maxBufferSize = 20 * 1024;
						
				        // ------------------ CLIENT REQUEST
			            fileInputStream = new FileInputStream(file);
			            URL url = new URL(uploadUrl);
			            
			            // Open a HTTP connection to the URL
			            conn = (HttpURLConnection) url.openConnection();
			            // Allow Inputs
			            conn.setDoInput(true);
			            // Allow Outputs
			            conn.setDoOutput(true);
			            // Don't use a cached copy.
			            conn.setUseCaches(false);
			            // Use a post method.
			            conn.setRequestMethod("POST");
			            conn.setRequestProperty("Content-Type", "multipart/form-data;boundary=" + stringBoundary);

			            dos = new DataOutputStream(conn.getOutputStream());

			            dos.writeBytes("--" + stringBoundary + "\r\n");
			            dos.writeBytes("Content-Disposition: form-data; name=\"fileToUpload\"; filename=\"" + fileName + "\"\r\n\r\n");
			            
			            // create a buffer of maximum size
			            buffer = new byte[Math.min((int) file.length(), maxBufferSize)];
			            int length;
			            // read file and write it into the body...
			            while ((length = fileInputStream.read(buffer)) != -1) {
			                dos.write(buffer, 0, length);
			            }

			            // send multipart form data necessary after file data...
			            dos.writeBytes("\r\n--" + stringBoundary + "--\r\n");
			            dos.flush();
			            
			            if (fileInputStream != null)
			                fileInputStream.close();
			            if (dos != null)
			                dos.close();
			            
			            //got response from server
			            //Just for checking purposes
			            DataInputStream dis = new DataInputStream(conn.getInputStream());
//			            StringBuilder response = new StringBuilder();
//			            String line;
//			            while ((line = dis.readLine()) != null) {
//			                response.append(line).append('\n');
//			                Log.i(TAG, "RESPONSE: " + line);
//			            }
			            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			            DocumentBuilder parser = factory.newDocumentBuilder();
			            Document dc= parser.parse(dis);
			            NodeList listItems = dc.getElementsByTagName("message");
			            String error_value = "100";
			            
			            for (int j = 0; j < listItems.getLength(); j++) {
			                Element el = (org.w3c.dom.Element) listItems.item(j);
			                if (el.hasAttribute("error")) {
			                	error_value = el.getAttribute("error");
//			                	Log.i(TAG, "Error Value");
			                }
			            }
			            
			            final int error_code = Integer.parseInt(error_value);
			            Log.i(TAG, "RESPONSE: " + error_code);
				        
			            //First upload code
			            //this looks cleaner than the code thats being used right now
			            //this may still work if I found the proper location of the uploaded files
			            //although the code above is much closer to the iOS version
			            //so im leaving this code here for awhile
//						HttpClient httpClient = new DefaultHttpClient();
//						HttpPost httpPost = new HttpPost(uploadUrl);
//						
//						httpPost.addHeader("Cache-Control", "no-cache");
//						httpPost.addHeader("Pragma", "no-cache");
//						httpPost.addHeader("Content-Type", "multipart/form-data; boundary=" + stringBoundary);
//						
//						MultipartEntity entity = new MultipartEntity(HttpMultipartMode.BROWSER_COMPATIBLE, stringBoundary, null);
//						
//						entity.addPart("name", new StringBody("fileToUpload"));
//						entity.addPart("filename", new StringBody(fileName)); 
//						entity.addPart("\r\n", new FileBody(file));
//						
//						httpPost.setEntity(entity);
//						
//						Log.i(TAG, "HTTP POST: " + httpPost);
//						
//						final HttpResponse response = httpClient.execute(httpPost);
//						
//						Log.i(TAG, "Response: " + response.getStatusLine().getStatusCode());
						
						//Successful upload since there was no exception
						activity.runOnUiThread(new Runnable() {
	                        @Override
	                        public void run() {
	                        	
	                        	downloadProgressDialog.dismiss();
	                        	
								if(error_code == 0) { //response.getStatusLine().getStatusCode() == 200) {
									updatesManagerCallback.uploadCompleted(fileName);
								} else {
									android.widget.Toast.makeText(activity, "Uploading Failed", android.widget.Toast.LENGTH_LONG).show();
								}
	                        }
						});
					} catch (Exception e) {
						Log.e(TAG, "Error on Upload: " + e.fillInStackTrace() + " " + e + " " + e.toString());
						
						//just close the dialog if ever
						activity.runOnUiThread(new Runnable() {
	                        @Override
	                        public void run() {
	                        	downloadProgressDialog.dismiss();
	                        }
						});
						
						android.widget.Toast.makeText(activity, "Uploading Failed", android.widget.Toast.LENGTH_LONG).show();
						
						
					}
				}
			}).start();
		}
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
			    	
			    	if(portalVersion != null && updateType != null) {
				    	//save information in preferences
				    	SharedPreferences.Editor editor = settings.edit();
			    		editor.putString(updateType + "-device-version", portalVersion);
			    		editor.putString(updateType + "-file-path", fileLocationString);
			    		editor.commit();
				       
			    		updatesManagerCallback.downloadCompleted();
			    	}
			    	else {
			    		android.widget.Toast.makeText(context, "Downloading Failed: File could not be saved", android.widget.Toast.LENGTH_LONG).show();
			    	}
		    		
		    		downloadProgressDialog.dismiss();
		    		cursor.close();
			    } else if(status == DownloadManager.STATUS_FAILED) {
			    	android.widget.Toast.makeText(context, "Failed Downloading: " + reason, android.widget.Toast.LENGTH_LONG).show();
			    } else if(status == DownloadManager.STATUS_PAUSED) {
			    	android.widget.Toast.makeText(context, "Paused Downloading: " + reason, android.widget.Toast.LENGTH_LONG).show();
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
