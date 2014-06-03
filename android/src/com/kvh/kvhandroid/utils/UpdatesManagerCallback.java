package com.kvh.kvhandroid.utils;

public interface UpdatesManagerCallback {
	public void downloadCompleted();
	public void uploadCompleted(String fileName);
}
