/**
 * This code is property of
 * EKA TechServ Pvt. Ltd.
 * 
 * Author: Developer Team
 * Copyright (c) 2016 EKA TechServ Pvt. Ltd.
 */

;
(function () {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('mystyles.css');
    var style2 = document.createElement('link');
    style2.rel = 'stylesheet';
    style2.type = 'text/css';
    //style2.href = chrome.extension.getURL('../font-awesome/css/font-awesome.min.css');
    style2.href = chrome.extension.getURL('../typicons.font-2.0.7/typicons.css');
    (document.head || document.documentElement).appendChild(style).appendChild(style2);
    var recordState = false;
    var activeTab = 0;
    var actionList = [];
    var testStepIds = [];
    var actionIdJson = {
        "Click": "5588176c342d757bc13d48a6",
        "Type": "5588177e342d757bc13d48a7",
        "Close_Browser": "5588179a342d757bc13d48a8",
        "NavigateURL": "558817d8342d757bc13d48a9",
        "Mousehover": "5588180f342d757bc13d48aa",
        "Select_Dropdown_By_Index": "55881831342d757bc13d48ab",
        "Select_Dropdown_By_Value": "55881844342d757bc13d48ac",
        "Select_Dropdown_By_VisibleText": "55881862342d757bc13d48ad",
        "Handle_Alert": "558818a4342d757bc13d48ae",
        "Navigate_Back": "558818c4342d757bc13d48af",
        "Navigate_Forward": "55881918342d757bc13d48b0",
        "Switch_To_Frame": "5588193a342d757bc13d48b1",
        "Switch_Back_From_Frame": "55881989342d757bc13d48b2",
        "Verify_Checkbox_Is_Checked": "55881a1f342d757bc13d48b3",
        "Verify_Checkbox_Is_Unchecked": "55881a2f342d757bc13d48b4",
        "Verify_Radio_Button_Is_Checked": "55881a9a342d757bc13d48b5",
        "Verify_Radio_Button_Is_Unchecked": "55881ae7342d757bc13d48b6",
        "Verify_Element_is_Displayed": "55881bc7342d757bc13d48b7",
        "Verify_Text_Present": "55881c5d342d757bc13d48b8",
        "Verify_Page_Title": "55881c84342d757bc13d48b9",
        "Upload_File": "55881cc2342d757bc13d48ba",
        "Reload": "55881cde342d757bc13d48bb",
        "Switch_To_Window": "55881cf6342d757bc13d48bc",
        "Close_Window": "55881d13342d757bc13d48bd",
        "Keyboard_Enter": "563b1950cfc996d35c10205f",
        "Keyboard_Tab": "563b1965cfc996d35c102060",
        "Clear_Data": "563b1979cfc996d35c102061",
        "Wait": "563b198fcfc996d35c102062",
        "Verify_Element_Enabled": "563b19a6cfc996d35c102063",
        "Verify_Element_Disabled": "563b19b9cfc996d35c102064",
        "Verify_Text_In_Alert": "563b19dbcfc996d35c102065",
        "Verify_Download_File": "565d8927739d00f6f5cb37a9",
        "Change_URL": "56aaf3c52a3b3270b5c565cc",
        "Verify_Partial_Text": "56b88a84e5781596855989c9",
        "Define_Dynamic_Variable": "56b88aace5781596855989ca",
        "Verify_Text_In_Child_Element": "56bacdc891d5006a2bee1fb9",
        "Drag_And_Drop_By": "56cd764c55a2d041fb5b35ec",
        "Double_Click": "56cd797c55a2d041fb5b35ed",
        "Click_And_Hold": "56cd79bb55a2d041fb5b35ee",
        "Mouse_Release": "56cd79dd55a2d041fb5b35ef",
        "Move_By_Offset": "56cd7b4155a2d041fb5b35f0",
        "Move_To_Element_By_Offset": "56cd7beb55a2d041fb5b35f1",
        "Define_Database_Variable": "56dfc8678bc4da3d974abd22",
        "Click_At_Mouse_Pointer": "5721f669d29f24d83d6a1164",
        "File_Download": "57286f5d384614d55441a303",
        "Type In Disabled Field": "573f06bbc88a0e02f4bffeff",
        "Start_If": "574685abf82975fc4ac90011",
        "Else": "574685abf82975fc4ac90012",
        "End_If": "574685aff82975fc4ac90013",
        "Context_Click_On_Element": "577e42ccc3d09f0988e9d39c",
        "Context_Click_At_Mouse_Pointer": "577e3f3ac3d09f0988e9d39b",
        "Scroll_And_Wait": "582ad0dc9fa5f1adc5cfb010"
    };
    var tsUnitId = "BID";
    var actionNoLocatorArr = [
        actionIdJson.NavigateURL,
        actionIdJson.Navigate_Back,
        actionIdJson.Navigate_Forward,
        //actionIdJson.Define_Dynamic_Variable,
        actionIdJson.Mouse_Release,
        actionIdJson.Click_At_Mouse_Pointer,
        actionIdJson.Define_Database_Variable,
        actionIdJson.Handle_Alert,
        //actionIdJson.Switch_Back_From_Frame,
        actionIdJson.Verify_Page_Title,
        actionIdJson.Switch_To_Window,
        actionIdJson.Close_Window,
        actionIdJson.Wait,
        actionIdJson.Verify_Text_In_Alert,
        actionIdJson.Verify_Download_File,
        actionIdJson.Change_URL,
        actionIdJson.Move_By_Offset,
        actionIdJson.Close_Browser,
        actionIdJson.Reload,
        actionIdJson.Else,
        actionIdJson.End_If,
        actionIdJson.Context_Click_At_Mouse_Pointer
    ];

    var actionArrayList = ["Switch To Frame",
        "Click",
        "Type",
        "Mousehover",
        "Select Dropdown By Index",
        "Select Dropdown By Value",
        "Select Dropdown By VisibleText",
        "Verify Checkbox Is Checked",
        "Verify Checkbox Is Unchecked",
        "Verify Radio Button Is Checked",
        "Verify Radio Button Is Unchecked",
        "Verify Element is Displayed",
        "Verify Text Present",
        "Upload File",
        "Keyboard Enter",
        "Keyboard Tab",
        "Clear Data",
        "Verify Element Enabled",
        "Verify Element Disabled",
        "Drag And Drop By",
        "Double Click",
        "Click And Hold",
        "Mouse Release",
        "Move To Element By Offset",
        "Start If",
        "Context Click On Element",
        "Verify Text In Child Element"
    ];

    String.prototype.replaceAll = function (search, replace) {
        if (replace === undefined) {
            return this.toString();
        }
        return this.split(search).join(replace);
    };

    var root = "body"; //"#capture_test_steps_content";
    $(document).ready(function () {
        requestRecordState(recordState);
        var $locationHref = $("#eaf-location-href-temp");
        if ($locationHref.html() == null) {
            $("body").append("<input type='hidden' class='hide' id='eaf-location-href-temp' />");
            $locationHref = $("#eaf-location-href-temp");
        }
    });
    loadActionList();
    bindPopoverEvents();
    window.addEventListener('message', receiveMessage);
    validateStepName();
    validateSelectorValue();
    validateAction();
    validateCategory();
    showHideValErrors();
    handlePlusButtonClick();
    handleSwitchFrameClick();
    function bindPopoverEvents() {
        $(root).click(function (e) {
            if ($(e.target).hasClass("track")) {
                $(".track").not(e.target).popover("hide");
            } else if (!$(e.target).hasClass("el_Tr_options_popover_holder") && !$(e.target).hasClass("el_Tr_options_popover_holder") && $(e.target).parents(".el_Tr_options_popover_holder").html() == null && !$(e.target).hasClass("eafSelect2-container") && $(e.target).parents(".eafSelect2-container").html() == null || ($(e.target).hasClass("eafSelect2-container") && $(e.target).siblings(".el_Tr_options_popover_holder").html() == null)) {
                clearCapturePopover();
            }
        });
        $(root).delegate("*", "mouseover", function (e) {
            if (isElemValid(this)) {
                e.stopPropagation();
                $(this).addClass("eaf-highlight-hover");
            }
        }).delegate("*", "mouseout", function (e) {
            $("*").not(this).removeClass("eaf-highlight-hover");
            if ($(".el_Tr_options_popover").is(":visible")) {
                e.stopPropagation();
            }
        }).delegate("*", "keydown keyup click", function (e) {
            if ($(".el_Tr_options_popover").is(":visible")) {
                e.stopPropagation();
            }
        });

        $(root).delegate("*", "contextmenu", function (e) {
            if (window.top != window.self) {
                e.stopPropagation();
                e.preventDefault();
                if (isElemValid(this)) {
                    if (!($(this).hasClass("switchToFrame") || $(this).parent("span").hasClass("switchToFrame"))) {
                        showCapturePopover(this);
                    }
                } else if ($(this).hasClass("eaf-highlight")) {
                    clearCapturePopover();
                }
            }
        });
        $(root).off("click", ".btn-cancel-record-popover").on("click", ".btn-cancel-record-popover", clearCapturePopover);
        $(root).off("click", ".btn-test-step-addEdit").on("click", ".btn-test-step-addEdit", function () {
            addTestStep(this);
        });
        $(root).off("change", ".test-step-selector").on("change", ".test-step-selector", function () {
            showSelectorValue(this);
            $(".inpt-selector-value").attr("disabled", false);
            if ($(".eaf-add-ts-btn").hasClass("eaf-highlight")) {
                $(".inpt-selector-value").removeAttr("readonly");
            }
        });
        $(root).off("change", ".xpath-select").on("change", ".xpath-select", function () {
            $(".inpt-selector-value").val(decodeURIComponent($(".xpath-select option:selected").html()));
            $(".inpt-selector-value").attr("title", ($(".inpt-selector-value").val()));
            $(".css-select").val("");
            $(".inpt-selector-value").trigger("keyup");
        });
        $(root).off("change", ".css-select").on("change", ".css-select", function () {
            $(".inpt-selector-value").val($(".css-select option:selected").text());
            $(".inpt-selector-value").attr("title", ($(".inpt-selector-value").val()));
            $(".xpath-select").val("");
            $(".inpt-selector-value").trigger("keyup");
        });
    };

    function receiveMessage(evt) {
        var jsonObj = JSON.parse(evt.data);
        //console.log("receiveMessage Message to frame : " + jsonObj.message);
        if (jsonObj.message == 'recordState') {
            recordState = jsonObj.state;
            activeTab = jsonObj.activeTab;
            if (!jsonObj.state) {
                clearCapturePopover();
            }
        } else if (jsonObj.message == 'resRecState') {
            recordState = jsonObj.state;
            activeTab = jsonObj.activeTab;
            //console.log("from msg resRecState --> " + evt.data);
            testStepIds = [];
            $.each(jsonObj.tsDetails, function (i, val) {
                //  console.log("resRecState Json TsDetails-->" + val.tsId + "\t stepName-" + val.stepName + "\t tsUnitId-" + val.tsUnitId);
                testStepIds.push(val);
                var targetElem = getElemByLocator(decodeURIComponent(val.locatorType), decodeURIComponent(val.locatorValue));
                if ($(targetElem).html() != null) {
                    $(targetElem).addClass("eaf-persisted-ts-highlight");
                }
                if ($(targetElem).is("iframe")) {
                    $(targetElem).next(".switchToFrame").attr("data-tsUnitId", val.tsUnitId);
                }
            });
            if (!jsonObj.state) {
                clearCapturePopover();
            }
            if (activeTab == 2 && recordState) {
                if ($(".eaf-add-ts-btn").length <= 1) {
                    $("#eaf-add-ts-btn-hover").remove();
                    var addTSBtn = '<div id="eaf-add-ts-btn-hover" title="To add Test Step without Elements" class="eaf-add-ts-btn"><label>+</label></div>';
                    $("body").append(addTSBtn);
                    $("#eaf-add-ts-btn-hover").fadeIn(200);
                }
            }
            injectFrameIcon();
        } else if (jsonObj.message == 'highlightStep') {
            highlightTestStepBack(jsonObj.fieldValue);
        } else if (jsonObj.message == 'resActionList') {
            actionList = [];
            $.each(jsonObj.actionList, function (i, val) {
                actionList.push(val);
            });
        } else if (jsonObj.message == 'resTsIds') {
            testStepIds = [];
            $(".eaf-persisted-ts-highlight").each(function () {
                $(this).removeClass("eaf-persisted-ts-highlight");
            })
            $.each(jsonObj.tsDetails, function (i, val) {
                testStepIds.push(val);
                var targetElem = getElemByLocator(decodeURIComponent(val.locatorType), decodeURIComponent(val.locatorValue));
                if ($(targetElem).html() != null) {
                    //if ($(targetElem).is(":input") || $(targetElem).is("a") || $(targetElem).is("span")) {
                    $(targetElem).addClass("eaf-persisted-ts-highlight");
                    //}
                }
            });
        } else if (jsonObj.message == 'reqCaptureDS') {
            // console.log("from msg resCaptureDS" + evt.data);
            var jsonStr = '{"message" : "resCaptureDS","dataSets":[';
            var dataSetCount = 0;
            $.each(testStepIds, function (i, tsItem) {
                // console.log("Step Id in capture DS"+tsItem.tsId+"---"+decodeURIComponent(tsItem.stepName));
                var targetElem = getElemByLocator(decodeURIComponent(tsItem.locatorType), decodeURIComponent(tsItem.locatorValue));
                if ($(targetElem).html() != null) {
                    if (dataSetCount != 0)
                        jsonStr += ',';
                    switch (tsItem.DSType) {
                        case  'value':
                        case 'dropdown-value':
                            if ($(targetElem).is(":input")) {
                                if ($(targetElem).attr("type") == "checkbox") {
                                    jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":"' + ($(targetElem).is(":checked")) + '"}';
                                } else {
                                    var targetElemVal = (($.trim($(targetElem).val()).replace(/\s{1,}/g, ' ')));
                                    jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":"' + customEncodeURIComponent(targetElemVal) + '"}';
                                }
                            } else {
                                jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":""}';
                            }
                            break;
                        case 'none'	:
                            jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":""}';
                            break;
                        case 'dropdown-text':
                            var tempC = customEncodeURIComponent($.trim(($(targetElem).find("option:selected").text())).replace(/\s{1,}/g, ' ') != "" ? ($.trim($(targetElem).find("option:selected").text()).replace(/\s{1,}/g, ' ')) : ($.trim($(targetElem).val())));
                            jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":"' + tempC + '"}';
                            break;
                        case 'dropdown-index':
                            jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":"' + $(targetElem).find("option:selected").index() + '"}';
                            break;
                        case 'text' :
                            jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":"' + (customEncodeURIComponent($.trim($(targetElem)[0].innerText).replace(/\s{2,}/g, ' ').replace(/\n{1,}/g, ' '))) + '"}';
                            break;
                        case 'captureurl':
                            var windowUrl = window.location.href;
                            var iframeurl = $.trim($(targetElem).attr("src")); //window.location.href;
                            var lastInd = windowUrl.lastIndexOf("/");
                            var homeUrl = windowUrl.substring(0, lastInd);
                            if (!(iframeurl.substring(0, 7) == 'http://' || iframeurl.substring(0, 8) == 'https://' || iframeurl.substring(0, 4) == 'www.'))
                                iframeurl = homeUrl + "/" + iframeurl;
                            jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":"' + customEncodeURIComponent(iframeurl) + '"}';
                            break;
                        default		:
                            jsonStr += '{"tsId" : "' + tsItem.tsId + '", "value":""}';
                            break;
                    }
                    dataSetCount++;
                }
            });
            jsonStr += ']}';
            clearHighlightDSelem();
            //console.log("Captured Ds value" + jsonStr);
            window.top.postMessage(jsonStr, "*");
        } else if (jsonObj.message == 'dsHighlightback') {
            $.each(jsonObj.dsDetails, function (i, dsItem) {
                var elem = getElemByLocator(decodeURIComponent(dsItem.locatorType), decodeURIComponent(dsItem.locatorValue));
                if ($(elem).html() != null) {
                    if ($(elem).is(":input")) {
                        if ($(elem).attr("type") == "checkbox") {
                            $(elem).prop("checked", decodeURIComponent(dsItem.dsValue));
                        } else
                            $(elem).val(decodeURIComponent(dsItem.dsValue));
                    }
                }
            });
        } else if (jsonObj.message == 'removeHighlightOnTSRemove') {
            var elem = getElemByLocator(decodeURIComponent(jsonObj.locatorType), decodeURIComponent(jsonObj.locatorValue));
            if ($(elem).html() != null) {
                $(elem).removeClass("eaf-highlight").popover("destroy");
                if ($(elem).prop("tagName") == "IFRAME")
                    $(elem).next("span").attr("data-tsUnitId", "");
            }
        } else if (jsonObj.message == 'clearHighlightback') {
            clearHighlightDSelem();
        } else if (jsonObj.message == 'requestIframeUrl') {
            var frameUrl = window.location.href;
            var msg = '{"message" : "responseIframeUrl", "frameUrl" : "' + frameUrl + '"}';
            window.top.postMessage(msg, "*");
        } else if (jsonObj.message == 'requestExtensionVersion') {
            var extensionVersionObj = chrome.runtime.getManifest();
            var extVerMsg = '{"message" : "responseExtensionVersion", "extensionVersion" : "' + extensionVersionObj.version + '"}';
            window.top.postMessage(extVerMsg, "*");
        } else if (jsonObj.message == 'setUserAgent') {
            var msg = {message: "setUserAgent", userAgent: '"' + jsonObj.userAgent + '"'};
            setUserAgent(jsonObj.userAgent);
        }
    }


    chrome.runtime.sendMessage({
        check: "UserAgent"
    }, function (n) {
        if (n.userAgent != "") {
            var t = document.createElement("script");
            t.type = "text/javascript";
            t.text = "navigator.__defineGetter__('userAgent', function () { return '" + n.userAgent + "'; });";
        }
    });

    function loadActionList() {
        window.top.postMessage('{"message" : "reqActionList"}', '*');
    }
    function clearCapturePopover() {
        $(".eaf-highlight").popover("destroy");
        $("*").removeClass("eaf-highlight");
    }
    function addTestStep(elem) {
        clearTimeout($(elem).data('firstClk'));
        var firstClick = setTimeout(function () {
            var selectorVal = $(elem).val();
            var $popover = $(elem).parents(".el_Tr_options_popover:first");
            var $slctValInpt = $popover.find('.inpt-selector-value');
            var xpath = $popover.find('.elem-xpath').val();
            var $triggerElem = $(getElementByXpath(xpath));
            var dispName = $popover.find(".test-step-name").val();
            dispName = dispName ? dispName.trim() : '';
            var selector = $popover.find(".test-step-selector").val();
            selector = selector ? selector.trim() : 'Xpath';
            var action = $popover.find(".test-step-action").val();
            var category = $popover.find(".test-step-category").val();
            var tsUnitId = $popover.find(".saved-tsUnitId").val();
            var addHoverBtnFlag = false;
            var mode = $(elem).attr("data-mode");
            $popover.find(".validate-active").trigger("eaf-validate");
            var selectedActionName = ($popover.find(".test-step-action").find("option:selected").text()).trim();
            var actionsArrayList = ["Click", "Move To Element By Offset", "Mouse Release", "Click And Hold", "Double Click", "Drag And Drop By", "Start If"];
            if (($.trim($(".elem-xpath").parent("div").css("display")) == "none") || ($slctValInpt.val() == "" && (actionsArrayList.indexOf(selectedActionName) != -1))) {
                addHoverBtnFlag = true;
            }
            var selectorValue = addHoverBtnFlag === false ? $slctValInpt.val() : "//*[@id='eaf-add-ts-btn-hover']";
            if (($popover.find(".valid-error").html() != null) || (dispName == '' || (selector == '' && (actionsArrayList.indexOf(selectedActionName) == -1)) || action == '' || (selectorValue == '' && selector != 'switch' && (actionsArrayList.indexOf(selectedActionName) == -1)) || category == '')) {
                if (action == '') {
                    $(".popover").find(".test-step-action").parent().addClass("valid-error");
                }
                if (category == '') {
                    $(".popover").find(".test-step-category").parent().addClass("valid-error");
                }
                $popover.parents(".popover").addClass("shake-h animated");
                setTimeout(function () {
                    $popover.parents(".popover").removeClass("shake-h animated");
                }, 1000);
            } else {
                var tsBlockId = $(elem).attr("data-step-block-id");
                if ($triggerElem.prop("tagName") == "IFRAME") {
                    var windowUrl = window.location.href; //console.log("Is Iframe prop :"+$triggerElem.prop("tagName").toLowerCase());//+"-- attr :"+$triggerElem.attr("tagName").toLowerCase());
                    var iframeUrl = $.trim($triggerElem.attr("src"));
                    if (!(iframeUrl == undefined || iframeUrl == 'undefined' || iframeUrl == "" || iframeUrl == null)) {
                        var ind = iframeUrl.indexOf(".", 0);
                        var lastInd = windowUrl.lastIndexOf("/");
                        var homeUrl = windowUrl.substring(0, lastInd);
                        if (!(iframeUrl.substring(0, 7) == 'http://' || iframeUrl.substring(0, 8) == 'https://' || iframeUrl.substring(0, 4) == 'www.')) {
                            iframeUrl = homeUrl + "/" + iframeUrl;
                        }
                        //console.log("-- windowUrl :" + windowUrl + "Iframe Source :" + iframeUrl);
                        var jsonStr = '{"message" : "addStep", "mode" : "' + mode + '", ' + (mode == 'edit' ? '"tsBlockId" : "' + tsBlockId + '",' : '') + ' "fieldVal" : {"dispName" : "' + customEncodeURIComponent(dispName) + '","selector" : "' + customEncodeURIComponent(selector) + '","selectorValue" : "' + customEncodeURIComponent(selectorValue) + '","action":"' + customEncodeURIComponent(action) + '","category":"' + customEncodeURIComponent(category) + '", "elemXpath" : "' + (xpath) + '", "tsUnitId" : "' + (tsUnitId) + '" ,"iframeUrl":"' + iframeUrl + '"}}';
                    } else { //not used in record.js currently
                        var frameHtmlString = $triggerElem.contents().find("html").html();
                        var jsonStr = '{"message" : "addStep", "mode" : "' + mode + '", ' + (mode == 'edit' ? '"tsBlockId" : "' + tsBlockId + '",' : '') + ' "fieldVal" : {"dispName" : "' + customEncodeURIComponent(dispName) + '","selector" : "' + customEncodeURIComponent(selector) + '","selectorValue" : "' + customEncodeURIComponent(selectorValue) + '","action":"' + customEncodeURIComponent(action) + '","category":"' + customEncodeURIComponent(category) + '", "elemXpath" : "' + (xpath) + '", "tsUnitId" : "' + (tsUnitId) + '" ,"iframeUrl":"' + iframeUrl + '", "frameHtmlString" : "' + customEncodeURIComponent(frameHtmlString) + '" }}';
                    }
                } else {
                    var jsonStr = '{"message" : "addStep", "mode" : "' + mode + '", ' + (mode == 'edit' ? '"tsBlockId" : "' + tsBlockId + '",' : '') + ' "fieldVal" : {"dispName" : "' + customEncodeURIComponent(dispName) + '","selector" : "' + customEncodeURIComponent(selector) + '","selectorValue" : "' + customEncodeURIComponent(selectorValue) + '","action":"' + customEncodeURIComponent(action) + '","category":"' + customEncodeURIComponent(category) + '", "elemXpath" : "' + (xpath) + '", "tsUnitId" : "' + (tsUnitId) + '" }}';
                }
                // console.log("\n\n Save JSON Add Step \n" + jsonStr);
                window.top.postMessage(jsonStr, "*");
                $("*").not($(elem)).removeClass("eaf-highlight").popover("destroy");
            }
        }, 500);
        $(elem).data('firstClk', firstClick);
    }
    function showSelectorValue(elem) {
        var selectorVal = $(elem).val();
        var $popover = $(elem).parents(".el_Tr_options_popover:first");
        var $slctValInpt = $popover.find('.inpt-selector-value');
        var xpath = $popover.find('.elem-xpath').val();
        var $triggerElem = $(getElementByXpath(decodeURIComponent(xpath)));
        var cssname = shapeClassVal($triggerElem.attr("class"), "className");
        $(".xpath-select").attr("style", "display : none !important");
        $(".css-select").attr("style", "display : none !important");
        if (!$($slctValInpt).hasClass("eaf-form-control")) {
            $($slctValInpt).addClass("eaf-form-control");
        }
        $($slctValInpt).removeClass("eaf-form-control-width92");
        switch (selectorVal) {
            case 'Xpath' 		:
                $(".xpath-select").show();
                $($slctValInpt).removeClass("eaf-form-control");
                $($slctValInpt).addClass("eaf-form-control-width92");
                $slctValInpt.removeAttr("readonly");
                break;
            case 'Id' 			:
                $slctValInpt.val($triggerElem.attr("id")).attr("readonly", true);
                break;
            case 'Name' 		:
                $slctValInpt.val($triggerElem.attr("name")).attr("readonly", true);
                break;
            case 'CSS Selector'         :
                $(".css-select").show();
                $($slctValInpt).removeClass("eaf-form-control");
                $($slctValInpt).addClass("eaf-form-control-width92");
                $slctValInpt.removeAttr("readonly");
                break;
            case 'Class Name' 		:
                $slctValInpt.val(cssname).attr("readonly", true);
                break;
            case 'Link Text' 	:
                $slctValInpt.val($triggerElem.text()).attr("readonly", true);
                break;
            case 'Partial LinkText' 	:
                $slctValInpt.val($triggerElem.text()).removeAttr("readonly");
                break;
            case 'Tagname' 		:
                $slctValInpt.val($triggerElem.prop("tagName").toLowerCase()).attr("readonly", true);
                break;
        }
    }

    function showCapturePopover(elem, fldValues) {
        $(".el_Tr_options_popover_holder").remove();
        if (elem && $(elem).html() != null) {
            var tsBtnAdd = ($(elem).hasClass("eaf-add-ts-btn") || $(elem).parents(".eaf-add-ts-btn").html() != null) ? true : false;
            $("*").not($(elem)).removeClass("eaf-highlight");
            var xPath = getPathTo(elem);
            var popoverContainer = setPopoverContainer(elem);
            removeTabIndexFromParent(elem);
            $(elem).addClass("track");
            var attrName = $(elem).attr("name");
            attrName = attrName ? attrName : '';
            var contentHTML = "<div class='el_Tr_options_popover'>\n\
                                <input type='hidden' class='hide saved-tsUnitId' />" +
                    "<div class='fld-holder'>\n\
                                    <span class='typcn typcn-lg typcn-warning' original-title='Test step name is required!'></span>\n\
                                    <span class='typcn typcn-lg typcn-tick'></span>\n\
                                    <input class='eaf-form-control test-step-name validate-active' placeholder='Test step name'/>\n\
                                </div>" + //value='"+(attrName)+"'
                    "<div class='fld-holder' style='" + (tsBtnAdd ? 'display:none !important' : '') + "'>\n\
                                    <select class='eaf-form-control select2_selectbox test-step-selector'>\n\
                                        <option></option>\n\
                                        <option value='Class Name'>CSS Name</option>\n\
                                        <option value='CSS Selector'>CSS Selector</option>\n\
                                        <option value='Id'>Id</option>\n\
                                        <option value='Name'>Name</option>";
            if ($(elem).prop("tagName") == 'A') {
                contentHTML += "<option value='Link Text'>Link Text</option><option value='Partial LinkText'>Partial Link Text</option>";
            }
            contentHTML += "<option value='Tagname'>Tag Name</option>\n\
                                <option value='Xpath'>XPath</option></select>\n\
                            </div>" +
                    "<div class='fld-holder' style='" + (tsBtnAdd ? 'display:none !important' : '') + "'>\n\
                                <span class='typcn typcn-lg typcn-warning' original-title='Locator value is required!'></span>\n\
                                <span class='typcn typcn-lg typcn-tick'></span>\n\
                                <input type='hidden' value=\"" + xPath + "\" class='elem-xpath'/>\n\
                                <input class='eaf-form-control inpt-selector-value validate-active' disabled placeholder='Locator value' value=''/>" +
                    createSelectBoxWithOptions(elem, "Xpath") +
                    createSelectBoxWithOptions(elem, "CSS Selector") +
                    "</div>" +
                    "<div class='fld-holder'><span class='typcn typcn-lg typcn-warning' original-title='Locator value is required!'></span><span class='typcn typcn-lg typcn-tick'></span><select class='eaf-form-control select2_selectbox test-step-action' ><option></option>";
            $.each(actionList, function (i, val) {
                if (tsBtnAdd) {
                    contentHTML += "<option value='" + val.code + "' data-isValidateLT='" + val.op.validateLT + "' data-txt='" + val.desc + "'>" + val.desc + "</option>";
                } else {
                    if (actionNoLocatorArr.indexOf(val.code) == -1) {
                        contentHTML += "<option value='" + val.code + "' data-isValidateLT='" + val.op.validateLT + "' data-txt='" + val.desc + "'>" + val.desc + "</option>";
                    }
                }
            });
            contentHTML += "</select></div>" +
                    "<div class='fld-holder'><select class='eaf-form-control select2_selectbox test-step-category'  ><option></option><option value='setup'>Setup</option><option value='test'>Test</option><option value='assert'>Assert</option></select></div>" +
                    "<div class='fld-holder col-xs-12 p-zero'><div class='col-xs-6 pl-zero'><div class='eaf-btn eaf-btn-danger col-xs-12 btn-cancel-record-popover' tabindex='0'>CANCEL</div></div><div class='col-xs-6 pr-zero'><div class='eaf-btn eaf-btn-success col-xs-12 btn-test-step-addEdit' data-mode='add' tabindex='0'>CAPTURE</div></div></div>";
            $(elem).unbind("shown.bs.popover").bind("shown.bs.popover", function (e) {
                e.stopPropagation();
                setPopoverArrowPos(elem);
                if ($(".el_Tr_options_popover_holder.top").html() != null) {
                    $(".el_Tr_options_popover_holder.top .arrow").css({"border-top-color": "#777", "top": "100%"});
                }
                $(this).addClass("eaf-highlight");
                if (fldValues) {
                    //  console.log("Inside Field value");
                    $(".el_Tr_options_popover").find(".saved-tsUnitId").val((fldValues.tsUnitId));
                    $(".el_Tr_options_popover").find(".test-step-selector").val(decodeURIComponent(fldValues.locator)).change();
                    $(".el_Tr_options_popover").find(".inpt-selector-value").val(decodeURIComponent(fldValues.locatorVal));
                    $(".el_Tr_options_popover").find(".test-step-name").val(decodeURIComponent(fldValues.displayName));
                    $(".el_Tr_options_popover").find(".test-step-action").val(decodeURIComponent(fldValues.action));
                    $(".el_Tr_options_popover").find(".test-step-category").val(decodeURIComponent(fldValues.category));
                    $(".el_Tr_options_popover").find(".btn-test-step-addEdit").attr({
                        "data-mode": "edit",
                        "data-step-block-id": fldValues.tsBlockId
                    }).text("Save");
                    if ((fldValues.action) == actionIdJson.Switch_To_Frame) {
                        $(".el_Tr_options_popover").find(".btn-test-step-addEdit").text("Load");
                    }
                }
                if ($(elem).prop("tagName") == "IFRAME" && (!fldValues || fldValues.action == actionIdJson.Switch_To_Frame)) {
                    $(".test-step-action option[value=" + actionIdJson.Switch_To_Frame + "]").attr("selected", "selected");
                    $(".test-step-action").eafSelect2();
                    $(".test-step-action").prop("disabled", true);
                }
                else if ($(elem).prop("tagName") == "IFRAME" && fldValues.action == actionIdJson.Switch_Back_From_Frame) {
                    $(".test-step-action option[value=" + actionIdJson.Switch_Back_From_Frame + "]").attr("selected", "selected");
                    $(".test-step-action").eafSelect2();
                    $(".test-step-action").prop("disabled", true);
                } else {
                    $(".test-step-action").prop("disabled", false);
                    $(".test-step-action").eafSelect2({
                        placeholder: "Select Action"
                    });
                }
                $(".el_Tr_options_popover").find(".test-step-name").focus();
                $(".test-step-selector").eafSelect2({
                    placeholder: "Select Locator Type"
                });
                $(".test-step-category").eafSelect2({
                    placeholder: "Select Category"
                });
                if (!elementOrParentIsFixed(elem)) {
                    var offset = $(".el_Tr_options_popover_holder").hasClass("top") ? 350 : 100;
                    $("body,html").animate({scrollTop: $(elem).offset().top - offset}, 300);
                }
                $(".el_Tr_options_popover_holder").fadeIn(100);
                $(".popover.el_Tr_options_popover_holder").draggable();
            }).unbind("hide.bs.popover").bind("hide.bs.popover", function (e) {
                e.stopPropagation();
                $(this).removeClass("track");
            });
            setTimeout(function () {
                $(elem).popover({
                    animation: true,
                    placement: function (context, source) {
                        var position = $(elem).offset();
                        var bottom = $(source).offset().top + $(source).outerHeight();
                        var posClass = position.top < 300 ? (bottom < 250 ? "bottom" : "right") : "top";
                        return posClass;
                    },
                    trigger: 'manual',
                    html: true,
                    content: contentHTML,
                    template: '<div class="popover el_Tr_options_popover_holder height257" style="display:none; cursor: move"><div class="arrow"></div><div class="popover-inner"><div class="popover-content"><p></p></div></div></div>',
                    container: popoverContainer
                }).popover("show");
                if (tsBtnAdd && fldValues != undefined) {
                    $(".el_Tr_options_popover_holder.popover").removeClass("height257");
                    positionPopover($(".eaf-add-ts-btn"), 10, 100);
                }
            }, 200);
        } else if (fldValues) {
            $("*").removeClass("eaf-highlight").popover("destroy");
            if (window.top == window) {
                alert($("#" + fldValues.tsBlockId + " > div").length);
                $("#" + fldValues.tsBlockId + " > div").css("border", "2px solid #f3565d");
            }
        }
    }

    /**
     * Method to set the popoverContainer when displaying popover on a modal element
     */
    function setPopoverContainer(elem) {
        var classArr = ["ui-front", "modal", "blockUI", "mfp-container"];
        var container = "body";
        for (var i = 0; i < classArr.length; i++) {
            var val = classArr[i];
            var chkClass = "." + val;
            if ($(elem).hasClass(val) || $(elem).parents(chkClass).html() != null) {
                container = false;
                break;
            }
        }
        return container;
    }

    /**
     * Method to remove tabIndex attribute from parent attribute as search on select2 
     * dropdown wasnt working on a modal
     */
    function removeTabIndexFromParent(elem) {
        var parentWithTabIndex = $(elem).closest('[tabindex]');
        if (parentWithTabIndex != null) {
            parentWithTabIndex.removeAttr('tabindex');
        }
    }

    function elementOrParentIsFixed(element) {
        var $element = $(element);
        var $checkElements = $element.add($element.parents());
        var isFixed = false;
        $checkElements.each(function () {
            if ($(this).css("position") === "fixed") {
                isFixed = true;
                return false;
            }
        });
        return isFixed;
    }

    function highlightTestStepBack(fieldVal) {
        var targetElem = null;
        var locatorVal = decodeURIComponent(fieldVal.locatorVal);
        var locator = decodeURIComponent(fieldVal.locator);
        targetElem = getElemByLocator(locator, locatorVal);
        if (targetElem != null)
            showCapturePopover(targetElem, fieldVal);
        else {
            window.top.postMessage('{"message" : "elemNotFoundForHighlight", "tsBlockId" : "' + fieldVal.tsBlockId + '"}', "*");
        }
    }

    function getElemByLocator(locator, locatorVal) {
        locatorVal = decodeURIComponent(locatorVal);
        switch (locator) {
            case 'Xpath':
                targetElem = getElementByXpath(locatorVal);
                break;
            case 'Id' 	:
                targetElem = document.getElementById(locatorVal);
                break;
            case 'Name'	:
                targetElem = $("[name='" + locatorVal + "']").get(0);
                break;
            case 'CSS Selector':
                targetElem = $(locatorVal).get(0);
                break;
            case 'Class Name':
                targetElem = $("[class='" + locatorVal + "']").get(0);
                break;
            case 'Link Text' :
                targetElem = $("a:contains(" + locatorVal + ")").get(0);
                break;
            case 'Partial LinkText':
                targetElem = $("a:contains(" + locatorVal + ")").get(0);
                break;
            case 'Tagname' :
                targetElem = $(locatorVal).get(0);
                break;
            default		:
                targetElem = null;
        }
        return targetElem;
    }

    function getPathTo(element) {
        if (element.id !== '')
            return "//*[@id='" + element.id + "']";
        if (element === document.body)
            return "html/" + element.tagName.toLowerCase();
        var ix = 0;
        var siblings = element.parentNode.childNodes;
        for (var i = 0; i < siblings.length; i++) {
            var sibling = siblings[i];
            if (sibling === element)
                return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            if (sibling.id !== 'eaf-add-ts-btn-hover' && sibling.nodeType === 1 && sibling.tagName === element.tagName)
                ix++;
        }
    }

    function getCustomXpathArr(element) {
        var xpathArr = [];
        var excludeAttrs = ["id", "value", "class", "onclick", "onhover", "onblur", "onfocus", "placeholder"];
        xpathArr.push(getPathTo(element));
        if (!(null === element.value || "" === element.value || undefined === element.value)) {
            xpathArr.push("//" + element.tagName.toLowerCase() + "[@value='" + element.value + "']");
            xpathArr.push("//" + element.tagName.toLowerCase() + "[contains(@value='" + element.value + "')]");
        }
        var attrMap = getAttributesMap(element);
        $.each(attrMap, function (key, value) {
            if ("input" === element.tagName.toLowerCase()) {
                if (!(excludeAttrs.indexOf(key) >= 0 || key === "type")) {
                    xpathArr.push("//" + element.tagName.toLowerCase() + "[@type='" + element.type + "' and @" + key + "='" + value + "']");
                }
            } else {
                if (excludeAttrs.indexOf(key) === -1) {
                    xpathArr.push("//" + element.tagName.toLowerCase() + "[@" + key + "='" + value + "']");
                }
            }
        });
        if (!(null === $(element).text() || "" === $(element).text() || undefined === $(element).text())) {
            var trimmedStr = $(element).text().trim();
            var str = trimmedStr.split(" ")[0];
            xpathArr.push("//" + element.tagName.toLowerCase() + "[text()='" + $(element).text() + "']");
            xpathArr.push("//" + element.tagName.toLowerCase() + "[contains(text(),'" + str.trim() + "')]");
        }
        return xpathArr;
    }

    function getCustomCssSelectorArr(element) {
        var cssSelectorArr = [];
        cssSelectorArr.push(getCSSselector($(element)));
        cssSelectorArr.push(shapeClassVal(UTILS.cssPath(element), "relativePath"));
        cssSelectorArr.push(getCssPath(element));
        return cssSelectorArr;
    }

    function previousElementSibling(element) {
        if (element.previousElementSibling !== 'undefined') {
            return element.previousElementSibling;
        } else {
            // Loop through ignoring anything not an element
            while (element = element.previousSibling) {
                if (element.nodeType === 1) {
                    return element;
                }
            }
        }
    }
    function getCssPath(element) {
        // False on non-elements
        if (!(element instanceof HTMLElement)) {
            return false;
        }
        var path = [];
        while (element.nodeType === Node.ELEMENT_NODE) {
            var selector = element.nodeName;
            if (element.id) {
                selector += ('#' + element.id);
            } else {
                // Walk backwards until there is no previous sibling
                var sibling = element;
                // Will hold nodeName to join for adjacent selection
                var siblingSelectors = [];
                while (sibling !== null && sibling.nodeType === Node.ELEMENT_NODE) {
                    siblingSelectors.unshift(sibling.nodeName);
                    sibling = previousElementSibling(sibling);
                }
                // :first-child does not apply to HTML
                if (siblingSelectors[0] !== 'HTML') {
                    siblingSelectors[0] = siblingSelectors[0] + ':first-child';
                }
                selector = siblingSelectors.join(' + ');
            }
            path.unshift(selector);
            element = element.parentNode;
        }
        return path.join(' > ');
    }

    function getAttributesMap(element) {
        var attributes = {};
        $.each(element.attributes, function (i, attrib) {
            if (!(null === attrib.value || "" === attrib.value || undefined === attrib.value)) {
                attributes[attrib.name] = attrib.value;
            }
        });
        return attributes;
    }

    function createSelectBoxWithOptions(element, type) {
        switch (type) {
            case 'Xpath':
                var selectStr = "<select class='eaf-form-control validate-active select-selector-value xpath-select' style='display:none !important'>";
                return createSelectBoxOptionsWithXPathOptions(element, selectStr);
            case 'CSS Selector':
                var selectStr = "<select class='eaf-form-control validate-active select-selector-value css-select' style='display:none !important'>";
                return createSelectBoxOptionsWithCSSSelectorOptions(element, selectStr);
        }
    }

    function createSelectBoxOptionsWithXPathOptions(element, selectStr) {
        var xpathArr = getCustomXpathArr(element);
        return createSelectOptions(xpathArr, selectStr, "xpath");
    }

    function createSelectOptions(items, selectStr, type) {
        selectStr += "<option value=''>Please Select..</option>";
        $.each(items, function (index, item) {
            selectStr += "<option value='" + type + index + "'>" + item + "</option>";
        });
        selectStr += "</select>";
        return selectStr;
    }

    function createSelectBoxOptionsWithCSSSelectorOptions(element, selectStr) {
        var cssSelectorArr = getCustomCssSelectorArr(element);
        return createSelectOptions(cssSelectorArr, selectStr, "cssSelector");
    }

    function getPageXY(element) {
        var x = 0, y = 0;
        while (element) {
            x += element.offsetLeft;
            y += element.offsetTop;
            element = element.offsetParent;
        }
        return [x, y];
    }

    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function getCSSselector($elem) {
        var classVal = $elem.attr("class") ? shapeClassVal($elem.attr("class"), "className") : '';
        if ($elem.attr("id")) {
            return "#" + $elem.attr("id");
        } else if (classVal.trim() != '') {
            return "." + String(classVal).replace(/\s+/g, ".");
        } else if ($elem.parent().prop("tagName") !== undefined) {
            var cssSelectorVal = getCSSselector($elem.parent());
            return cssSelectorVal == undefined ? "html" : cssSelectorVal + " > " + $elem.prop("tagName").toLowerCase();
        }
    }

    function shapeClassVal(classes, type) {
        var returnString = "";
        if (type === "className") {
            returnString = String(classes).replace(/\btrack\b/g, "").replace(/\beaf-highlight-hover\b/g, "").replace(/\beaf-highlight\b/g, "").replace(/\beaf-persisted-ts-highlight\b/g, "").trim();
        } else if (type === "relativePath") {
            returnString = String(classes).replace(/\b.track\b/g, "").replace(/\b.eaf-highlight-hover\b/g, "").replace(/\b.eaf-highlight\b/g, "").replace(/\b.eaf-persisted-ts-highlight\b/g, "").trim();
        }
        return returnString;
    }

    function isElemValid(elem) {
        return (activeTab == 2 && recordState && !$(elem).hasClass("el_Tr_options_popover") && !$(elem).hasClass("el_Tr_options_popover_holder") && $(elem).parents(".el_Tr_options_popover_holder").html() == null && !$(elem).hasClass("eaf-highlight") && !$(elem).hasClass("eafSelect2-container") && $(elem).parents(".eafSelect2-container").html() == null || ($(elem).hasClass("eafSelect2-container") && $(elem).siblings(".el_Tr_options_popover_holder").html() == null));
    }

    function setPopoverArrowPos(elem) {
        var diff = $(window).outerWidth() - $(elem).offset().left;
        if (diff < 0) {
            $(".el_Tr_options_popover_holder").css({"left": "auto", "right": (diff - 40) + "px"});
            $(".el_Tr_options_popover_holder").find(".arrow").css("left", "calc(100% - 20px)");
        } else if ($(window).outerWidth() < $(".el_Tr_options_popover").offset().left + 350) {
            $(".el_Tr_options_popover_holder").css({"left": "auto", "right": "0px"});
        }
        if (diff >= 0) {
            var arrowLeft = ($(elem).offset().left) - $(".el_Tr_options_popover_holder").offset().left + ($(elem).outerWidth() / 2);
            if ($(".el_Tr_options_popover_holder").hasClass("right")) {
                $(".el_Tr_options_popover_holder").find(".arrow").css({
                    //"left":arrowLeft+"px"
                    "right": 0 + "px"
                });
            } else {
                $(".el_Tr_options_popover_holder").find(".arrow").css({
                    "left": arrowLeft + "px"
                            //"right":0+"px"
                });
            }
        }
    }

    function positionPopover(elem, timeOutVal, fadeVal) {
        var setTimeoutVal = (timeOutVal == '' || timeOutVal == null) ? 1000 : timeOutVal;
        var fadeInVal = (fadeVal == '' || fadeVal == null) ? 300 : fadeVal;
        elem = elem || $(".eaf-highlight:last");
        if ($(".el_Tr_options_popover_holder").html() != null && $(elem).html() != null) {
            $(".el_Tr_options_popover_holder").hide();
            setTimeout(function () {
                var offset = $(elem).offset();
                var eW = $(elem).outerWidth();
                var eH = $(elem).outerHeight();
                var pW = $(".el_Tr_options_popover_holder").outerWidth();
                var pH = $(".el_Tr_options_popover_holder").outerHeight();
                if ($(".el_Tr_options_popover_holder").hasClass("top")) {
                    $(".el_Tr_options_popover_holder").css({
                        "top": (offset.top - pH) + "px",
                        "left": (offset.left - (150 - eW / 2)) + "px",
                        "right": "auto"
                    });
                } else if ($(".el_Tr_options_popover_holder").hasClass("bottom")) {
                    $(".el_Tr_options_popover_holder").css({
                        "top": (offset.top + eH) + "px",
                        "left": (offset.left - (150 - eW / 2)) + "px",
                        "right": "auto"
                    });
                } else {
                    $(".el_Tr_options_popover_holder").css({
                        "top": (offset.top + eH) / 2 + "px",
                        //"left" : "auto",//(offset.left-(150-eW/2))+"px",
                        "left": (eW) + "px"
                                //"position":"relative"
                    });
                }
                $(".el_Tr_options_popover_holder").fadeIn(fadeInVal, function () {
                    setPopoverArrowPos(elem);
                });
            }, setTimeoutVal);
        }
    }

    $(root).undelegate(".switchToFrame span.typcn", "mouseover").delegate(".switchToFrame span.typcn", "mouseover", function () {
        $(this).parent("div").prev("iframe").addClass("eaf-highlight-hover");
    });

    $(window).resize(function () {
        positionPopover();
    });

    function clearHighlightDSelem() {
        $.each(testStepIds, function (i, tsItem) {
            var targetElem = getElemByLocator(decodeURIComponent(tsItem.locatorType), decodeURIComponent(tsItem.locatorValue));
            if ($(targetElem).html() != null) {
                if ($(targetElem).attr("type") == "checkbox") {
                    $(targetElem).prop("checked", false);
                } else {
                    if (!$(targetElem).is("button") && $(targetElem).attr("type") != "submit" && $(targetElem).attr("type") != "button")
                        $(targetElem).val('');
                }
            }
        });
    }

    function customEncodeURIComponent(str) {
        var outStr = "";
        outStr = encodeURIComponent(str);
        outStr = outStr.replaceAll("'", "%27");
        outStr = outStr.replaceAll("%09", "%20");
        return outStr;
    }

    function injectFrameIcon() {
        $("iframe").each(function () {
            if (!($(this).next("div").hasClass("switchToFrame")) && (($(this).css("visibility") !== "hidden" && $(this).css("display") !== "none" && $(this).css("opacity") !== "0") || $(this).is(":visible"))) {
                var right = $(this).offset().left + $(this).outerWidth();
                var rt = parseInt(right, 10) - 30;
                $(this).after("<div class='switchToFrame' title='Click to capture the Iframe element' style='position:absolute ;  left:" + rt + "'><span class='typcn typcn-export typcn-2x pull-right' style='position:relative'></span></div>");
            }
        });
    }

    function requestRecordState(recordState) {
        var iframeHeight = $("html").outerHeight();
        var msg = '{"message" : "reqRecState", "currStatus" : ' + recordState + ' ,"iframeHeight" : ' + iframeHeight + '}';
        setTimeout(function () {
            window.top.postMessage(msg, "*");
        }, 1000);
    }

    function validateStepName() {
        $(root).undelegate(".test-step-name", "keyup eaf-validate").delegate(".test-step-name", "keyup eaf-validate", function (e) {
            var re = new RegExp("^([A-Za-z0-9]{1,})+([-\_]{0,}[A-Za-z0-9_ ]{0,})*$");
            if ($(this).val() == '') {
                $(this).parent().removeClass("valid-success").addClass("valid-error");
                $(".el_Tr_options_popover .fld-holder .typcn-warning").attr("original-title", "This filed is required!");
            } else if (!(re.test($.trim($(this).val())))) {
                $(this).parent().removeClass("valid-success").addClass("valid-error");
                $(".el_Tr_options_popover .fld-holder .typcn-warning").attr("original-title", "Use Alphanuemaric pattern with Only _, ,- characters!");
            } else {
                $(this).parent().removeClass("valid-error").addClass("valid-success");
            }
        });
    }

    function validateCategory() {
        $(root).undelegate(".test-step-category", "change eaf-validate").delegate(".test-step-category", "change eaf-validate", function (e) {
            var isValidateLT = $(this).find("option:selected").val();
            if (isValidateLT == '') {
                $(this).parent().removeClass("valid-success").addClass("valid-error");
            } else {
                $(this).parent().removeClass("valid-error").addClass("valid-success");
            }
        });
    }

    function validateSelectorValue() {
        $(root).undelegate(".inpt-selector-value", "keyup onchange eaf-validate").delegate(".inpt-selector-value", "keyup onchange eaf-validate", function (e) {
            var isValidateLT = $(this).parents(".el_Tr_options_popover").find(".test-step-action").find("option:selected").attr("data-isValidateLT");
            var locator = $(this).parents(".el_Tr_options_popover").find(".test-step-selector").val();
            var locatorValue = $(this).parents(".el_Tr_options_popover").find(".inpt-selector-value").val();
            var selectedActionName = ($(this).parents(".el_Tr_options_popover ").find(".test-step-action").find("option:selected").text()).trim();
            var actionsArrayList = ["Click", "Move To Element By Offset", "Mouse Release", "Click And Hold", "Double Click", "Drag And Drop By"]
            if (isValidateLT == 'true' && (actionsArrayList.indexOf(selectedActionName) == -1)) {
                if ($(this).val() == '' && ($.trim($(".elem-xpath").parent("div").css("display")) != "none")) {
                    $(this).parent().removeClass("valid-success").addClass("valid-error");
                } else {
                    $(this).parent().removeClass("valid-error").addClass("valid-success");
                }
            } else {
                $(this).parent().removeClass("valid-error").removeClass("valid-success");
            }
            var elementToBeValidated = $(this);
            switch (locator) {
                case 'Xpath':
                    validateXpathLocatorValue(elementToBeValidated, locatorValue);
                    break;
                case 'CSS Selector':
                    validateCSSSelectorLocatorValue(elementToBeValidated, locatorValue);
                    break;
                case 'Id' 	:
                    validateIdLocatorValue(elementToBeValidated, locatorValue);
                    break;
                case 'Name'	:
                    validateNameLocatorValue(elementToBeValidated, locatorValue);
                    break;
                case 'Class Name':
                    validateClassNameLocatorValue(elementToBeValidated, locatorValue);
                    break;
                case 'Link Text' :
                    validateLinkTextLocatorValue(elementToBeValidated, locatorValue);
                    break;
                case 'Partial LinkText':
                    validatePartialLinkTextLocatorValue(elementToBeValidated, locatorValue);
                    break;
                case 'Tagname' :
                    validateTagnameLocatorValue(elementToBeValidated, locatorValue);
                    break;
                default	:
                    validateSelectorValueIfNull(elementToBeValidated, locatorValue);
                    break;
            }
        });
    }

    function validateXpathLocatorValue(elementToBeValidated, locatorValue) {
        var elems = getElementsByXpath(locatorValue);
        displayValidIcon(elementToBeValidated, elems);
    }

    function validateCSSSelectorLocatorValue(elementToBeValidated, locatorValue) {
        var elems;
        try {
            elems = $(locatorValue);
        } catch (e) {
            elems = "error";
        }
        displayValidIcon(elementToBeValidated, elems);
    }
    function validateIdLocatorValue(elementToBeValidated, locatorValue) {
        var selectorString = "#" + locatorValue;
        validateLocatorBySelectorString(elementToBeValidated, locatorValue, selectorString);
    }

    function validateNameLocatorValue(elementToBeValidated, locatorValue) {
        validateSelectorValueIfNull(elementToBeValidated, locatorValue);
    }

    function validateClassNameLocatorValue(elementToBeValidated, locatorValue) {
        validateSelectorValueIfNull(elementToBeValidated, locatorValue);
    }

    function validateLinkTextLocatorValue(elementToBeValidated, locatorValue) {
        validateSelectorValueIfNull(elementToBeValidated, locatorValue);
    }
    function validatePartialLinkTextLocatorValue(elementToBeValidated, locatorValue) {
        validateSelectorValueIfNull(elementToBeValidated, locatorValue);
    }
    function validateTagnameLocatorValue(elementToBeValidated, locatorValue) {
        validateSelectorValueIfNull(elementToBeValidated, locatorValue);
    }

    function validateLocatorBySelectorString(elementToBeValidated, locatorValue, selectorString) {
        var elems;
        if (locatorValue === "" || locatorValue === null) {
            elems = "error";
        } else {
            try {
                elems = $(selectorString);
            } catch (e) {
                elems = "error";
            }
        }
        displayValidIcon(elementToBeValidated, elems);
    }
    function validateSelectorValueIfNull(elementToBeValidated, locatorValue) {
        var elems;
        if (locatorValue === "" || locatorValue === null || locatorValue === undefined) {
            elems = "error";
        } else if (locatorValue === "//*[@id='eaf-add-ts-btn-hover']") {
            elems = $("#eaf-add-ts-btn-hover");
        }
        displayValidIcon(elementToBeValidated, elems);
    }

    function displayValidIcon(obj, elems) {
        if (elems === "error") {
            obj.parent().removeClass("valid-success").addClass("valid-error");
            $(".el_Tr_options_popover .fld-holder .typcn-warning").attr("original-title", "Given locator value is not valid");
        } else if (elems.length === 0) {
            obj.parent().removeClass("valid-success").addClass("valid-error");
            $(".el_Tr_options_popover .fld-holder .typcn-warning").attr("original-title", "No element found for the given locator value");
        } else if (elems.length > 1) {
            obj.parent().removeClass("valid-success").addClass("valid-error");
            $(".el_Tr_options_popover .fld-holder .typcn-warning").attr("original-title", "Multiple elements found for the given locator value");
        } else {
            obj.parent().removeClass("valid-error").addClass("valid-success");
        }
    }


    function validateAction() {
        $(root).undelegate(".test-step-action", "change eaf-validate").delegate(".test-step-action", "change eaf-validate", function (e) {
            var tsBtnAdd = ($(".eaf-highlight").hasClass("eaf-add-ts-btn") || $(".eaf-highlight").parents(".eaf-add-ts-btn").html() != null) ? true : false;
            var isValidateLT = $(this).find("option:selected").attr("data-isValidateLT");
            $(this).parents(".el_Tr_options_popover").find(".inpt-selector-value").trigger("keyup");
            var actionVal = $(this).find("option:selected").val();
            var actionText = ($(this).find("option:selected").text()).trim();

            if (tsBtnAdd) {
                if (actionArrayList.indexOf(actionText) != -1) {
                    $(".test-step-selector").parent("div").css("display", "block");
                    $(".elem-xpath").parents("div").css("display", "block");
                    $(".inpt-selector-value").val("");
                    $(".test-step-selector").eafSelect2({
                        placeholder: "Select Locator Type"
                    });
                    positionPopover($(".eaf-add-ts-btn"), 10, 100);
                } else {
                    $(".el_Tr_options_popover_holder.popover").removeClass("height257");
                    $(".test-step-selector").parent().css("display", 'none');
                    $(".elem-xpath").parent().css("display", 'none');
                    positionPopover($(".eaf-add-ts-btn"), 10, 100);
                }
            }
            if (actionVal == '') {
                $(this).parent().removeClass("valid-success").addClass("valid-error");
            } else {
                $(this).parent().removeClass("valid-error").addClass("valid-success");
            }
        });
    }

    function getElementsByXpath(xpathToExecute) {
        var result = [];
        var nodesSnapshot;
        try {
            nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        } catch (e) {
            return "error";
        }
        for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
            result.push(nodesSnapshot.snapshotItem(i));
        }
        return result;
    }

    function showHideValErrors() {
        $(root).undelegate(".fld-holder>.typcn[original-title]", "mouseover").delegate(".fld-holder>.typcn[original-title]", "mouseover", function (e) {
            $(this).tipsy({
                gravity: 's',
                title: function () {
                    return "<span class='eaf-validation-tipsy'>" + this.getAttribute('original-title') + "</span>";
                },
                html: true,
                trigger: 'manual'
            }).tipsy("show");
            $(".eaf-validation-tipsy").parents(".tipsy").css({"z-index": "2147483616"});
        }).undelegate(".fld-holder>.typcn[original-title]", "mouseout").delegate(".fld-holder>.typcn[original-title]", "mouseout", function (e) {
            $(this).tipsy("hide");
        });
    }

    function handlePlusButtonClick() {
        $(root).undelegate("#eaf-add-ts-btn-hover", "click").delegate("#eaf-add-ts-btn-hover", "click", function () {
            if (isElemValid(this)) {
                var xPath = getPathTo(this);
                showCapturePopover(this);
                setTimeout(function () {
                    $(".inpt-selector-value").val(xPath);
                    $(".el_Tr_options_popover_holder.popover").removeClass("height257");
                    positionPopover($(".eaf-add-ts-btn"), 10, 100);
                }, 500);
            }
        });
    }

    function handleSwitchFrameClick() {
        $(root).undelegate(".switchToFrame", "click").delegate(".switchToFrame", "click", function () {
            var windowUrl = window.location.href;
            var iframeurl = $.trim($(this).siblings("iframe").attr("src")); //window.location.href;
            var tsUnitId = $(this).attr("data-tsUnitId");
            if (tsUnitId != undefined && tsUnitId.slice(0, 1) == "B") {
                var lastInd = windowUrl.lastIndexOf("/");
                var homeUrl = windowUrl.substring(0, lastInd);
                if (!(iframeurl.substring(0, 7) == 'http://' || iframeurl.substring(0, 8) == 'https://' || iframeurl.substring(0, 4) == 'www.'))
                    iframeurl = homeUrl + "/" + iframeurl;
                var extVerMsg = '{"message" : "switchToFrame", "iframeUrl" : "' + iframeurl + '", "tsUnitId" : "' + tsUnitId + '"}';
                window.top.postMessage(extVerMsg, "*");
            } else if (activeTab == "2") {
                showCapturePopover($(this).prev("iframe")[0]);
                $(".test-step-action option[value=" + actionIdJson.Switch_To_Frame + "]").attr("selected", "selected");
                $(".test-step-action").eafSelect2();
            }
        });
    }

    function setUserAgent(msg) {
        //console.log("TO Tracker Inside setUserAgent(n, t) msg : "+msg);
        chrome.extension.sendMessage({message: "setUserAgent", userAgent: msg});
        var extVerMsg = '{"message" : "reloadIframe"}';
        setTimeout(function () {
            window.top.postMessage(extVerMsg, "*");
        }, 1000);
        //})
    }

})();

