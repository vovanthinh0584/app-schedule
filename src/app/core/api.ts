export default {
    // "url": 'http://123.25.238.48:8586',
    // "api": { "url": "http://123.25.238.48:8586", "version": "0.0.14", "iosUrl": "https://install.appcenter.ms/users/core.hisstudio-gmail.com/apps/medlatec-uat/distribution_groups/publish" },
    "url": 'http://localhost:5000',
    "api": { url: 'http://localhost:5000' },
    "Account": {
        "Login": '/api/account/login',
        "Logout": '/api/account/logout',
        "AppCenterInformation": '/api/account/GetAppCenterInformation',
        'CaptionLanguage': '/api/account/GetCaptionLanguage',
        'ListBussiness': '/api/account/GetListBussiness',
        'Version': '/api/account/GetVersion',
    },
    "InputDeviceParameter": {
        'Create': '/api/InputDeviceParameter',
        'GetInformation': '/api/InputDeviceParameter',
        'GetParameter': '/api/InputDeviceParameter/GetParameter',
        'CloseInput': '/api/InputDeviceParameter/CloseInput'
    },
    "InputRequest": {
        "Entity": "/api/InputRequest",
        "QueryWorkShops": "/api/InputRequest/QueryWorkShops",
        "QueryLocations": "/api/InputRequest/QueryLocations",
        "GetRequests": "/api/InputRequest/GetRequests",
        "GetZoneList": "/api/InputRequest/QueryListZone",
        "ComFirmRequest": "/api/InputRequest/ComFirmRequest?MTNRequestNum=",
        "GetAdminMTN": "/api/InputRequest/AdminMTN",
        "GetListManagement": "/api/InputRequest/GetListManagement",
        "ApprovalRequest": "/api/InputRequest/ApprovalRequest",
        "NoApprovalRequest": "/api/InputRequest/NoApprovalRequest",
        "SendInputRequest": "/api/InputRequest/SendInputRequest",
        "VisibleRequest": "/api/InputRequest/VisibleRequest",
    },
    "GetTask": {
        "Entity": "/api/Task",
        "FinishedWork": "/api/Task/FinishedWork",
        AssignWork: "/api/Task/AssignWork",
        SearchListWork: "/api/Task/SearchListWork",
        QueryWorkers: "/api/Task/QueryWorkers",
        QueryTeams: "/api/Task/QueryTeams",
    },
    "Sheet033Boiler": {
        "GetWorks": "/api/Sheet033Boiler/GetWorks",
        "GetShiftsAttime": "/api/Sheet033Boiler/GetShiftsAttime",
        "GetCheckList": "/api/Sheet033Boiler/GetCheckinglist",
        "UpdateCheckList": "/api/Sheet033Boiler/UpdateCheckinglist"

    },
    WorkPermit: {
        QueryVendorManagers: "/api/WorkPermit/GetVerdorManagements",
        SaveWorkPermit: "/api/WorkPermit",
        SendWorkPermit: "/api/WorkPermit/SendWorkPermit",
        SaveImageWorkPermit: "/api/WorkPermit/SaveImageWorkPermit",
        GetWorkPermits: "/api/WorkPermit/GetWorkPermits",
        GetProjectManagers: "/api/WorkPermit/GetProjectManagers",
        GetWorkPermitImages: "/api/WorkPermit/GetWorkPermitImages",
        DeleteWorkPermitImage: "/api/WorkPermit/DeleteWorkPermitImage",
        EditWorkPermitImage: "/api/WorkPermit/EditWorkPermitImage",
        Approval: "/api/WorkPermit/Approval",
        NoApproval: "/api/WorkPermit/NoApproval",
        GetZoneManagers: "/api/WorkPermit/QueryZoneManagers",
        GetSaleManagers: "/api/WorkPermit/QuerySaleManagers",
        CloseWorkerPermit: "/api/WorkPermit/CloseWorkerPermit",
        ExtendWork: "/api/WorkPermit/ExtendWork",
    },
    Shift: {
        SearhShift: "/api/Shift/SearhShift",
        GetShifts: "/api/Shift/GetShifts",
    },
    Notification: {
        GetTotalNotification: "/api/Notifications/GetTotalNotification",
        GetTotalNotificationNew: "/api/Notifications/GetTotalNotificationNew",
        GetListNotification: "/api/Notifications/GetListNotification",
        UpdateNotification: "/api/Notifications/UpdateNotification",
    }


}
