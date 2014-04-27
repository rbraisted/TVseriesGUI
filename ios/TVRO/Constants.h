/*
 *  Constants.h
 *  vsat_icontrol
 *
 *  Created by jacob george on 2014/04/17.
 *  Copyright (c) 2014 KVH Industries, Inc. All rights reserved.
 *
 */


//#define FINAL_BUILD
#define KVH_BUILD
//#define VAIN_BUILD

//----------------------------------------------------------
// SETTINGS FOR APP STORE AND AD HOC BUILDS 
#ifdef FINAL_BUILD

#define kBonjourServiceType     @"_tvro-xml._tcp."
#define kDefaultHostname        @"tvhub"
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
#define kUpdateHost             @"http://www.kvhupdate.com/TVRO"
#define kWebSvcPortal           @"www.kvhupdate.com/mobile/tvhub/v1"

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
