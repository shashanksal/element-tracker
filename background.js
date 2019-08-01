var HEADERS_CONVERT_LOWERCASE = [
    'content-security-policy',
    'x-frame-options'
];

var stripHeaderMap = {};
chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            stripHeaderMap["url"] = details.url;
            stripHeaderMap["tabId"] = details.tabId;
        },
        {
            urls: ["*://*/eaf*", "*://*.test-odyssey.com/record*", "*://test-odyssey.com/record.do*", "*://ekatechserv.co.in/record*"],
            types: ['main_frame']
        },
["blocking"]
        );

chrome.webRequest.onBeforeSendHeaders.addListener(
        function (details) {
            for (var i = 0; i < details.requestHeaders.length; ++i) {
                if (details.requestHeaders[i].name === 'Content-Security-Policy' || details.requestHeaders[i].name === 'Content-Security-Policy') {
                    console.log("Removing header : " + details.requestHeaders[i].name);
                    details.requestHeaders.splice(i, 1);
                    break;
                }
            }
            return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"],
            types: ['sub_frame']},
["blocking", "requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener(
        function (details) {
            for (var i = 0; i < details.responseHeaders.length; i++) {
                var header = details.responseHeaders[i];
            }

            if (details.tabId !== stripHeaderMap["tabId"]) {
                return;
            }
            return {
                responseHeaders: details.responseHeaders.filter(function (header) {
                    if (header.name === "Content-Security-Policy") {
                        console.log(HEADERS_CONVERT_LOWERCASE.indexOf(header.name.toLowerCase()));
                    }
                    return HEADERS_CONVERT_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
                })
            };
        }, {
    urls: ["<all_urls>"],
    types: ['sub_frame']
},
["blocking", "responseHeaders"]
        );

var selectedUserAgent = JSON_DefaultUserAgent,
        userAgents = JSON_UserAgentsList,
        settings = JSON_Settings;
handler = function (n) {
    if (selectedUserAgent.UserAgent != "") {
        for (var t = 0, i = n.requestHeaders.length; t < i; ++t)
            if (n.requestHeaders[t].name === "User-Agent") {
                n.requestHeaders[t].value = selectedUserAgent.UserAgent;
                break
            }
        return {
            requestHeaders: n.requestHeaders
        }
    }
};

chrome.webRequest.onBeforeSendHeaders.addListener(handler, {
    urls: ["<all_urls>"]
}, ["blocking", "requestHeaders"]);

chrome.runtime.onMessage.addListener(function (n, t, i) {
    i({
        userAgent: selectedUserAgent.UserAgent
    })
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!(tab.url.indexOf("/record.do") > -1)) {
        setUserAgent("Default", true);
    }
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if (!(request.userAgent == "undefined" || request.userAgent == undefined || request.userAgent == ""))
    {
        var tabUrl = "";
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            // console.log(tabs[0].url);
            if (tabs[0].url != undefined || tabs[0].url != "") {
                tabUrl = tabs[0].url;
                if (tabUrl.match(/record.do/g)) {
                    setUserAgent(request.userAgent, true);
                }
            }

        });
    }
}
);

function setUserAgent(n, t, i, r) {
    for (var f, u = 0; u < userAgents.length; u++)
        for (userAgents[u].Id == n && (selectedUserAgent.Id = userAgents[u].Id, selectedUserAgent.Name = userAgents[u].Name, selectedUserAgent.UserAgent = userAgents[u].UserAgent), f = 0; f < userAgents[u].UserAgents.length; f++)
            userAgents[u].UserAgents[f].Id == n && (selectedUserAgent.Id = userAgents[u].UserAgents[f].Id, selectedUserAgent.Name = userAgents[u].UserAgents[f].Name, selectedUserAgent.UserAgent = userAgents[u].UserAgents[f].UserAgent);
    settings.LastUsed_Id = selectedUserAgent.Id;
    settings.LastUsed_Name = selectedUserAgent.Name;
    settings.LastUsed_UserAgent = selectedUserAgent.UserAgent;
    localStorage.uaSettings = JSON.stringify(settings);
    r && typeof r == "function" && r()
}