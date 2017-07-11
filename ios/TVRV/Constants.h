/*
 *  Constants.h
 *  vsat_icontrol
 *
 *  Created by jacob george on 2014/04/17.
 *  Copyright (c) 2014 KVH Industries, Inc. All rights reserved.
 *
 */


#define FINAL_BUILD
//#define KVH_BUILD
// #define VAIN_BUILD

// ------------------------------------------------------------------------------------------------
// --------------------------- Start Push Notification(APNS) Stuff --------------------------------
// ------------------------------------------------------------------------------------------------

#define kPOST         @"POST"
#define kContentType  @"content-type"
#define kAppJson      @"application/json"

// Replace this URL with live URL


// 1. Register device token on server
#define API_REGISTER_DEVICE_TOKEN @"http://34.226.75.132/adminapi/token/createusertoken"
/* Parameters use for Register device token on server web service
 1. app_platform,
 2. user_device_token
 3. app_id
 */


// 2. Reset badge
#define API_RESET_BADGE @"http://34.226.75.132/adminapi/token/resetbadgecnt"
/* Parameters use for Reset badge web service
 1. user_device_token,
 2. badgecnt
 */

#define KBadgeCount  @"badgecnt"

// app_platform - Set 1 for -> Android applications, 2 for -> iOS applications
#define kAppPlatform     @"app_platform"
#define currentPlatform  @"2"

#define kDeviceToken  @"user_device_token"

// Set app id for recognize application
#define kAPP_ID   @"app_id"
#define TVRV_APP_ID @"4" // Set app_id = 1 for KVH TracVision HD7 app

/*// -------------------------------- app_id --------------------------------------
 1 For => KVH TracVision HD7
 2 For => KVH TracVision HD-11
 3 For => KVH TracPhone Mini-VSAT Broadband
 4 For => KVH TracVision® TV/RV-series [iOS APP]
 5 For => KVH TracVision HD-11-ipad
 6 For => KVH TracVision TV/RV-series [ANDROID APP]
 // ------------------------------------------------------------------------------*/

// ------------------------------------------------------------------------------------------------
// --------------------------- Finish Push Notification(APNS) Stuff -------------------------------
// ------------------------------------------------------------------------------------------------


//----------------------------------------------------------
// SETTINGS FOR APP STORE AND AD HOC BUILDS 
#ifdef FINAL_BUILD

#define kBonjourServiceType     @"_tvro-xml._tcp."
#define kDefaultHostname        @"tvhub.kvh"
#define kUpdateHost             @"http://www.kvhupdate.com/TVRO"
#define kWebSvcPortal           @"www.kvhupdate.com/mobile/tvhub/v1"

/*
#define kBonjourEnabled         TRUE
#define kDemoEnabled            FALSE

#define kBonjourServiceType     @"_kvhvsat._tcp"
#define kDefaultHostname        @"minivsat.kvh"

#define kUpdateHost             @"http://www.kvh.com/VSAT"
#define kUpdateFilename         @"portalMain.php"
#define kAntennaFilename        @"webservice.php"
#define kXMLServicesFilename    @"xmlservices.php"

#define kWebSvcPortal           @"http://wss.xnt536ae7.com"
#define kWebSvcPath             @"acuservices/ipacu/V1/"

#define kGlobalSuppEmail        @"mvbsupport@kvh.com"
#define kEuropeSuppEmail        @"mvbsupport@kvh.com"
#define kConusSuppPhone         @"+1 (866)701-7103"
#define kGlobalSuppPhone        @"+1 (401)851-3806"
#define kEuropeSuppPhone        @"+45 45 160 180"
*/

#endif
//----------------------------------------------------------


//----------------------------------------------------------
// SETTINGS FOR KVH TEST BUILDS 
#ifdef KVH_BUILD

#define kBonjourServiceType     @"_tvro-xml._tcp."
#define kDefaultHostname        @"172.16.223.92"
#define kUpdateHost             @"http://www.kvhupdate.com/sandbox/TVRO"
#define kWebSvcPortal           @"www.kvhupdate.com/sandbox/mobile/tvhub/v1"

/*
#define kBonjourEnabled         TRUE
#define kDemoEnabled            FALSE

#define kBonjourServiceType     @"_kvhvsat._tcp"
#define kDefaultHostname        @"minivsat.kvh"

#define kUpdateHost             @"http://www.kvh.com/ENGSandbox/VSAT"
#define kUpdateFilename         @"portalMain.php"
#define kAntennaFilename        @"webservice.php"
#define kXMLServicesFilename    @"xmlservices.php"

#define kWebSvcPortal           @"http://wss.xnt536ae7.com"
#define kWebSvcPath             @"acuservices/ipacu/V1/"

#define kGlobalSuppEmail        @"jacobgeorge@kvh.com"
#define kEuropeSuppEmail        @"jacobgeorge@kvh.com"
#define kConusSuppPhone         @"+1 (866) 701-7103"
#define kGlobalSuppPhone        @"+1 (401) 851-3806"
#define kEuropeSuppPhone        @"+45 45 160 180"
*/

#endif
//----------------------------------------------------------


//----------------------------------------------------------
// SETTINGS FOR VAINMEDIA TEST BUILDS 
// note >> miky's machine
// note >> software updates / satpar updates are at okaymiky.net
#ifdef VAIN_BUILD

#define kBonjourServiceType     @"_afpovertcp._tcp."
#define kDefaultHostname        @"199.244.84.92"
#define kUpdateHost             @"http://www.kvhupdate.com/TVRO"
#define kWebSvcPortal           @"www.kvhupdate.com/mobile/tvhub/v1"

/*
#define kBonjourEnabled         TRUE
#define kDemoEnabled            FALSE

#define kBonjourServiceType     @"_afpovertcp._tcp"
#define kDefaultHostname        @"miky-2011.local"

//#define kUpdateHost           @"http://miky-2011.local"
//#define kUpdateFilename       @"portal.php"
#define kUpdateHost             @"http://www.kvh.com"
#define kUpdateFilename         @"VSATUpdatesDir/mainUpdate/portalMain.php"
#define kAntennaFilename        @"antservice.php"
#define kXMLServicesFilename    @"syservice.php"

#define kWebSvcPortal           @"http://wss.xnt536ae7.com"
#define kWebSvcPath             @"acuservices/ipacu/V1/"

#define kGlobalSuppEmail        @"jacobgeorge@kvh.com"
#define kEuropeSuppEmail        @"jacobgeorge@kvh.com"
#define kConusSuppPhone         @"+1 (866) 701-7103"
#define kGlobalSuppPhone        @"+1 (401) 851-3806"
#define kEuropeSuppPhone        @"+45 45 160 180"
*/

#endif
//----------------------------------------------------------
