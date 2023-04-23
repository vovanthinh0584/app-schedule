export default {
    //  "url": 'http://123.25.238.48:8586',
    //  "api":{"url":"http://123.25.238.48:8586","version":"1.0.05","iosUrl":"https://install.appcenter.ms/users/core.hisstudio-gmail.com/apps/medlatec-uat/distribution_groups/publish"},
      "url": 'http://localhost:5000',
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
        "GetRequests":"/api/InputRequest/GetRequests",
        "GetZoneList":"/api/InputRequest/QueryListZone",
        "ComFirmRequest":"/api/InputRequest/ComFirmRequest?MTNRequestNum=",
        "GetAdminMTN":"/api/InputRequest/AdminMTN",
        "GetListManagement":"/api/InputRequest/GetListManagement",
        "ApprovalRequest":"/api/InputRequest/ApprovalRequest",
        "NoApprovalRequest":"/api/InputRequest/NoApprovalRequest"
    }   ,
    "GetTask":{
        "Entity": "/api/Task",
        "FinishedTask":"/api/Task/Finished"
    },
    "Sheet033Boiler":{
        "GetWorks":"/api/Sheet033Boiler/GetWorks",
        "GetShiftsAttime":"/api/Sheet033Boiler/GetShiftsAttime",
        "GetCheckList":"/api/Sheet033Boiler/GetCheckinglist",
        "UpdateCheckList":"/api/Sheet033Boiler/UpdateCheckinglist"
        
    }   
}
