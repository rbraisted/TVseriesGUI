package com.kvh.kvhandroid;

public class Constants {
	
	public enum Build {
		FINAL_BUILD,
		KVH_BUILD,
		VAIN_BUILD
	}
	
	public static Build buildToUse = Build.FINAL_BUILD;
//	public static Build buildToUse = Build.KVH_BUILD;
//	public static Build buildToUse = Build.VAIN_BUILD;

	//----------------------------------------------------------
	//Variables to be set depending on the build
	public static String kBonjourServiceType = "_tvro-xml._tcp.";
	public static String kDefaultHostname = "tvhub.kvh";
	public static String kUpdateHost = "http://www.kvhupdate.com/TVRO";
	public static String kWebSvcPortal = "www.kvhupdate.com/mobile/tvhub/v1";

	/*
	public static Boolean kBonjourEnabled = true;
	public static Boolean kDemoEnabled = false;

	public static String kBonjourServiceType = "_kvhvsat._tcp";
	public static String kDefaultHostname = "minivsat.kvh";

	public static String kUpdateHost = "http://www.kvh.com/VSAT";
	public static String kUpdateFilename = "portalMain.php";
	public static String kAntennaFilename = "webservice.php";
	public static String kXMLServicesFilename = "xmlservices.php";

	public static String kWebSvcPortal = "http://wss.xnt536ae7.com";
	public static String kWebSvcPath = "acuservices/ipacu/V1/";

	public static String kGlobalSuppEmail = "mvbsupport=kvh.com";
	public static String kEuropeSuppEmail = "mvbsupport=kvh.com";
	public static String kConusSuppPhone = "+1 (866)701-7103";
	public static String kGlobalSuppPhone = "+1 (401)851-3806";
	public static String kEuropeSuppPhone = "+45 45 160 180";
	*/
	
	public static void init() {
		if(Constants.buildToUse == Constants.Build.FINAL_BUILD) {
			//----------------------------------------------------------
			// SETTINGS FOR GOOGLE PLAY AND APK

			kBonjourServiceType = "_tvro-xml._tcp.";
			kDefaultHostname = "tvhub.kvh";
			kUpdateHost = "http://www.kvhupdate.com/TVRO";
			kWebSvcPortal = "www.kvhupdate.com/mobile/tvhub/v1";

			/*
			kBonjourEnabled         =true;
			kDemoEnabled            =false;

			kBonjourServiceType     ="_kvhvsat._tcp";
			kDefaultHostname        ="minivsat.kvh";

			kUpdateHost             ="http://www.kvh.com/VSAT";
			kUpdateFilename         ="portalMain.php";
			kAntennaFilename        ="webservice.php";
			kXMLServicesFilename    ="xmlservices.php";

			kWebSvcPortal           ="http://wss.xnt536ae7.com";
			kWebSvcPath             ="acuservices/ipacu/V1/";

			kGlobalSuppEmail        ="mvbsupport=kvh.com";
			kEuropeSuppEmail        ="mvbsupport=kvh.com";
			kConusSuppPhone         ="+1 (866)701-7103";
			kGlobalSuppPhone        ="+1 (401)851-3806";
			kEuropeSuppPhone        ="+45 45 160 180";
			*/
		} else if(Constants.buildToUse == Constants.Build.KVH_BUILD) {
			//----------------------------------------------------------
			// SETTINGS FOR KVH TEST BUILDS 
			kBonjourServiceType     ="_tvro-xml._tcp.";
			kDefaultHostname        ="172.16.223.92";
			kUpdateHost             ="http://www.kvhupdate.com/TVRO";
			kWebSvcPortal           ="www.kvhupdate.com/mobile/tvhub/v1";

			/*
			kBonjourEnabled         =true;
			kDemoEnabled            =false;

			kBonjourServiceType     ="_kvhvsat._tcp";
			kDefaultHostname        ="minivsat.kvh";

			kUpdateHost             ="http://www.kvh.com/ENGSandbox/VSAT";
			kUpdateFilename         ="portalMain.php";
			kAntennaFilename        ="webservice.php";
			kXMLServicesFilename    ="xmlservices.php";
	
			kWebSvcPortal           ="http://wss.xnt536ae7.com";
			kWebSvcPath             ="acuservices/ipacu/V1/";
	
			kGlobalSuppEmail        ="jacobgeorge=kvh.com";
			kEuropeSuppEmail        ="jacobgeorge=kvh.com";
			kConusSuppPhone         ="+1 (866) 701-7103";
			kGlobalSuppPhone        ="+1 (401) 851-3806";
			kEuropeSuppPhone        ="+45 45 160 180";
			*/
		} else if(Constants.buildToUse == Constants.Build.VAIN_BUILD) {
			//----------------------------------------------------------
			// SETTINGS FOR VAINMEDIA TEST BUILDS
			
			kBonjourServiceType     ="_afpovertcp._tcp.";
			kDefaultHostname        ="199.244.84.92";
			kUpdateHost             ="http://www.kvhupdate.com/TVRO";
			kWebSvcPortal           ="www.kvhupdate.com/mobile/tvhub/v1";

			/*
			kBonjourEnabled         =true;
			kDemoEnabled            =false;

			kBonjourServiceType     ="_afpovertcp._tcp";
			kDefaultHostname        ="miky-2011.local";

			//kUpdateHost           ="http://miky-2011.local";
			//kUpdateFilename       ="portal.php";
			kUpdateHost             ="http://www.kvh.com";
			kUpdateFilename         ="VSATUpdatesDir/mainUpdate/portalMain.php";
			kAntennaFilename        ="antservice.php";
			kXMLServicesFilename    ="syservice.php";

			kWebSvcPortal           ="http://wss.xnt536ae7.com";
			kWebSvcPath             ="acuservices/ipacu/V1/";

			kGlobalSuppEmail        ="jacobgeorge=kvh.com";
			kEuropeSuppEmail        ="jacobgeorge=kvh.com";
			kConusSuppPhone         ="+1 (866) 701-7103";
			kGlobalSuppPhone        ="+1 (401) 851-3806";
			kEuropeSuppPhone        ="+45 45 160 180";
			*/
		}
	}

}
