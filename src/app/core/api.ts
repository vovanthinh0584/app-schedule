export default {
     "url": 'http://localhost:5000',
    // "api":{"url":"http://10.18.0.39:1208","version":"1.0.0","iosUrl":"https://install.appcenter.ms/users/core.hisstudio-gmail.com/apps/medlatec-uat/distribution_groups/publish"},
    // "url": '',
      "api":{url:'http://localhost:5000'},
    "Account": {
        "Login": '/api/account/login',
        "Logout": '/api/account/logout',
        "AppCenterInformation": '/api/account/GetAppCenterInformation',
        'CaptionLanguage':'/api/account/GetCaptionLanguage',
        'ListBussiness':'/api/account/GetListBussiness',
        
    },
    "InputDeviceParameter":{
        'Create':'/api/InputDeviceParameter',
        'GetInformation':'/api/InputDeviceParameter',
        'GetParameter':'/api/InputDeviceParameter/GetParameter'
    },
    "InputRequest":{
        "Entity":"/api/InputRequest",
        "QueryWorkShops":"/api/InputRequest/QueryWorkShops",
        "QueryLocations":"/api/InputRequest/QueryLocations",
    }   ,
    "GetTask":{
        "Entity":"/api/GetTask",
    }
}
