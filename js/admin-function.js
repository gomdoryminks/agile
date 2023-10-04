$(function() {    
    //리사이즈
    $(window).resize(function() {
        //헤더 마지막 하위메뉴 위치 설정
        setNavLastListPosition();
    });
    
    //스크롤
    $(window).scroll(function() {
        //위로 이동 버튼 보이기&숨기기
        if ($(this).scrollTop() > 100) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    
    //위로 이동 버튼 클릭시
    $(".back-to-top").click(function() {
        $("html,body").stop().animate({scrollTop: 0}, 1000);
    });
    
    //숫자만 입력
    $("input.only-number").on("keyup", function() {
         $(this).val($(this).val().replace(/[^0-9-]/g,""));
    });
    
    //헤더 하위메뉴 보이기&숨기기
	$("nav.nav .nav-menu>li").on("mouseover", function(evt) {
		evt.preventDefault();
        $(this).children(".nav-sub-menu").stop(true,true).slideDown(200);
	});
	
	$("nav.nav .nav-menu>li").on("mouseleave", function(evt) {
		evt.preventDefault();
        $(this).children(".nav-sub-menu").stop(true,true).slideUp(200);
	});
    
    //헤더 마지막 하위메뉴 위치 설정
    setNavLastListPosition();
    
    //파일 업로드시 파일명 추출
    $(".content-file-area input[type='file']").on("change", function() {
        var filename = "";
        
        if ($(this).val() != "") {
            if (window.FileReader) {
                //기본 브라우저
                filename = $(this)[0].files[0].name;
            } else {
                //old IE
                filename = $(this).val().split('/').pop().split('\\').pop();
            }
        }
        
        $(this).closest(".content-file-area").find(".content-file").val(filename);
    });
    
    //datepicker 설정
    $(".content-date-text").each(function() {
        $(this).datepicker();
    });
    
    //datetimepicker 설정
    $(".content-datetime-text").each(function() {
        $(this).datetimepicker({
            controlType: 'select',
            oneLine: true,
            timeFormat: 'HH:mm',
            closeText: '닫기'
        });
    });
    
    //셀렉트박스 안에 체크박스가 있을 경우
    $(".content-dropdown-area .content-dropdown-text").on("click", function() {
    	$(this).closest(".content-dropdown-area").find(".content-dropdown-list ul").slideToggle("fast");
	});

	$(".content-dropdown-area .content-dropdown-list ul li a").on("click", function() {
		$(this).closest(".content-dropdown-area").find(".content-dropdown-list ul").hide();
	});

	$(document).bind("click", function(e) {
		var $clicked = $(e.target);
		
		if (!$clicked.parents().hasClass("content-dropdown-area")) {
			$(".content-dropdown-area .content-dropdown-list ul").hide();
		} else {
			$(".content-dropdown-area").not($clicked.parents(".content-dropdown-area")).find(".content-dropdown-list ul").hide();
		}
	});

	$(".content-dropdown-area .content-dropdown-list ul li input[type='checkbox']").on("click", function() {
		var dropdownListObj = $(this).closest(".content-dropdown-list");
		var dropdownText = "";
		
		$(dropdownListObj).find("ul li").each(function() {
			if ($(this).find("input[type='checkbox']")) {
				if ($(this).find("input[type='checkbox']").is(":checked")) {
					if (dropdownText != "") {
						dropdownText += ",";
					}
					
					dropdownText += $(this).find("input[type='checkbox']").next("label").text();
				}
			}
		});
		
		$(dropdownListObj).closest(".content-dropdown-area").find(".content-dropdown-text").val(dropdownText);
	});
	
	$(".content-dropdown-area").each(function() {
		var dropdownListObj = $(this).find(".content-dropdown-list");
		var dropdownText = "";
		
		$(dropdownListObj).find("ul li").each(function() {
			if ($(this).find("input[type='checkbox']")) {
				if ($(this).find("input[type='checkbox']").is(":checked")) {
					if (dropdownText != "") {
						dropdownText += ",";
					}
					
					dropdownText += $(this).find("input[type='checkbox']").next("label").text();
				}
			}
		});
		
		$(dropdownListObj).closest(".content-dropdown-area").find(".content-dropdown-text").val(dropdownText);
	});
});

//헤더 마지막 하위메뉴 위치 설정
function setNavLastListPosition() {
    var winWidth = window.innerWidth;
    
    if ($("nav.nav .nav-menu>li .nav-sub-menu").length > 0 && winWidth < 1624) {
        var ctMarginRight = $("nav.nav").closest(".center-ct").css("margin-right");

        $("nav.nav .nav-menu>li:last-child .nav-sub-menu").css("right","-" + ctMarginRight);
    }
}

//관리자 비밀번호 변경 체크&체크해제
function setChangePassword(obj) {
    if ($(obj).prop("checked") !== false) {
        $(".change-password-area").css("display","table-row");
    } else {
        $(".change-password-area").css("display","none");
    }
}

//파일 폼 추가
function addFileArea(obj) {
    var fileAreaObj = $(obj).closest(".variable-file-area");
    
    if ($(fileAreaObj).length > 0) {
        var fileNum = $(fileAreaObj).find(".content-file-area").length;
        var dataName = ($(obj).attr("data-name") != undefined) ? $(obj).attr("data-name") + "_" + (fileNum + 1) : "";
        var dataMaxNum = (parseInt($(obj).attr("data-max-num")) > 0) ? parseInt($(obj).attr("data-max-num")) : "";
        var fileHtml = "";

        if (dataMaxNum > fileNum || dataMaxNum == "") {
            fileHtml += "<div class='content-file-area'>";
            fileHtml += "    <input type='text' name='' id='' class='content-text content-file' disabled>";
            fileHtml += "    <label><input type='file' name='" + dataName + "' id='" + dataName + "'>첨부파일</label>";
            //remove-file-btn : 파일폼 삭제 버튼
            fileHtml += "    <button type='button' class='content-btn content-btn-type3 remove-file-btn' onclick='removeFileArea(this);'>삭제</button>";
            fileHtml += "</div>";

            $(fileAreaObj).append(fileHtml);
        } else {
            openLayer("alert","최대 " + dataMaxNum + "개까지 추가할 수 있습니다.","");
        }
    }
    
    //파일 업로드시 파일명 추출
    $(".content-file-area input[type='file']").on("change", function() {
        var filename = "";
        
        if ($(this).val() != "") {
            if (window.FileReader) {
                //기본 브라우저
                filename = $(this)[0].files[0].name;
            } else {
                //old IE
                filename = $(this).val().split('/').pop().split('\\').pop();
            }
        }
        
        $(this).closest(".content-file-area").find(".content-file").val(filename);
    });
}

//파일 폼 삭제
function removeFileArea(obj) {
    var fileAreaObj = $(obj).closest(".variable-file-area");
    
    if ($(fileAreaObj).length > 0) {
        var addBtnObj = $(fileAreaObj).find(".add-file-btn");
        var dataName = ($(addBtnObj).attr("data-name") != undefined) ? $(addBtnObj).attr("data-name") : "";
        var dataMaxNum = (parseInt($(addBtnObj).attr("data-max-num")) > 0) ? parseInt($(addBtnObj).attr("data-max-num")) : "";
        
        $(obj).closest(".content-file-area").remove();

        if (dataName != "") {
            var fileNum = 1;
            
            $(fileAreaObj).find(".content-file-area").each(function() {
                $(this).find("input[type='file']").attr("name",dataName + "_" + fileNum);
                $(this).find("input[type='file']").attr("id",dataName + "_" + fileNum);
                fileNum++;
            });
        }
    }
}

//기본 레이어 팝업 열기
function openDefaultLayer(id,obj) {
    var layerTitle = "";
    var layerHtml = "";
    var layerWidth = "320px";
    
    //기본 레이어 팝업 설정 (layerTitle, layerHtml, layerWidth)
    
    $("#default-layer .layer-box .layer-title .layer-title-txt").html(layerTitle);
    $("#default-layer .layer-box .layer-content").html(layerHtml);
    $("#default-layer .layer-box").css("max-width",layerWidth);
    
    //레이어 팝업 내용 변경
    if ($("#default-layer .layer-box .layer-content .layer-content-area").length > 0) {
        var layerContentId = $("#default-layer .layer-box .layer-content .layer-content-area .layer-content-item:first-child").attr("id");

        setLayerContent(layerContentId);
    }
    
    $("#default-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
    
    //datepicker 설정
    $(".content-date-text").each(function() {
        $(this).datepicker();
    });
}

//레이어 팝업 내용 변경
function setLayerContent(id) {
    $("#default-layer .layer-box .layer-content .layer-content-area .layer-content-item").css("display","none");
    $("#default-layer .layer-box .layer-content .layer-content-area .layer-content-item#" + id).css("display","block");
}

//레이어 팝업 열기
function openLayer(type, msg, fun) {
    $("#" + type + "-layer .layer-box .layer-content .layer-content-txt").html(msg);
    
    $("#" + type + "-layer .layer-box .layer-btn-area .confirm-btn").removeAttr("onclick");
    $("#" + type + "-layer .layer-box .layer-btn-area .confirm-btn").attr("onclick","closeLayer(this);" + fun);
    
    $("#" + type + "-layer").addClass("on");
    
    var scrollTop = parseInt($(document).scrollTop());

    $("body").css("top", -scrollTop + "px");

    $("body").addClass("scroll-disable").on('scroll touchmove', function(event) {
        event.preventDefault();
    });
}

//레이어 팝업 닫기
function closeLayer(obj) {
    $(obj).closest(".layer-wrap").removeClass("on");
    
    if ($(".layer-wrap.on").length == 0) {
        $("body").removeClass("scroll-disable").off('scroll touchmove');

        var scrollTop = Math.abs(parseInt($("body").css("top")));

        $("html,body").animate({scrollTop: scrollTop}, 0);
    }
}

//쿠키값 설정하기
function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}

//쿠키값 삭제하기
function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

//쿠키값 가져오기
function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');
    
    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        
        if (x == cookie_name) {
          return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}

//파라미터 가져오기
function getURLParams(url) {
    var result = {};
    
    url.replace(/[?&]{1}([^=&#]+)=([^&#]*)/g, function(s, k, v) { 
        result[k] = decodeURIComponent(v); 
    });
    
    return result;
}

//해당 파라미터의 값 가져오기
function getURLParamValue(url, key) {
    var result = "";
    var paramArr = getURLParams(url);
    
    for (var i in paramArr) {
        if (i == key) {
            result = paramArr[i];
        }
    }
    
    return result;
}

