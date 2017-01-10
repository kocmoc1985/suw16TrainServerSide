//===============================NAVBAR=========================================
$(window).load(function () {
    checkDOMChange();
});

var TO_HIDE = ["ABOUT"];
var navBarFixedPosPrevElem;

function checkDOMChange() {
    //
    if (exists($("#menu-container").next()) && $(navBarFixedPosPrevElem).get(0) !== $("#menu-container").next().get(0)) {
        //
        navBarFixedPositionFix("menu-container");
        navBarFixedPosPrevElem = $("#menu-container").next();
        //
    }
    //
    setTimeout(checkDOMChange, 100);
}


function hideNavBarButtons() {
    $('.a-can-be-active').each(function () {
        for (var i = 0; i < TO_HIDE.length; i++) {
            if ($(this).text() === TO_HIDE[i]) {
                $(this).remove();
            }
        }
    });
}

/**
 * This must be called after "including" of the navbar.html
 * @returns {undefined}
 */
function addEventsToLinks() {
    $("body").on('click', ".a-mobile-onclick-expand", function (event) {
        event.preventDefault();
        fadeIn(this);
    });

    $("body").on('click', '.a-can-be-active', function () {
        setActive(this);
    });

    //Hiding mobile menu if clicked on Menu/Company title
    $("body").on('click', ".ul-mobile .menu-title", function () {
        $(".ul-mobile ul").hide();
    });
}

function addClickEventToNavBarBtn(selector, functionToExecute) {
    $("body").on('click', selector, function (event) {
        event.preventDefault();
        functionToExecute();
    });
}

/**
 * This one is needed if you want to have "fixed" position for the NavBar
 * @param {type} navBarContainerId - the id of the container
 * @returns {unresolved}
 */
function navBarFixedPositionFix(navBarContainerId) {
    //
    var pos = $("#" + navBarContainerId).css("position");
    //
    if (pos === "fixed" === false) {
        return;
    }
    //
    var height = $("#" + navBarContainerId).outerHeight();
    $("#" + navBarContainerId).next().css('margin-top', height + "px");
}

function fadeIn(element) {
    var parent = element.parentNode;
    var elemntArray = parent.childNodes;
    for (i = 0; i < elemntArray.length; i++) {
        if (elemntArray[i].tagName === "UL") {
            if ($(elemntArray[i]).is(':visible') === false) {
                $(elemntArray[i]).css("display", "block");
                $(elemntArray[i]).css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 500);
            } else {
                $(elemntArray[i]).fadeOut();
            }
        }
    }
}

function setActive(element) {
    //
    resetAllActives();
    //
    $(element).addClass("activeLink");
    //
    hideMenuIfMobile(element);
}

function hideMenuIfMobile(element) {
    if ($(".li-mobile-menu").is(':visible')) {
        $(element).parent().parent().fadeOut();
    }
}

function resetAllActives() {
    $(".activeLink").removeClass("activeLink");
}

function imageNotFound(imgElement) {
    var parent = imgElement.parentNode;
    parent.removeChild(imgElement);
    $(parent).css("font-size", "14pt");
    $(parent).text(".....");
    //
//    var path = node_get_file_path("www","menu-mobile.png");
//    $(imgElement).attr("src",path);
}


function includeNavbar(url, selector, addType) {
    //
    var html = $.ajax({
        url: url,
        dataType: 'text',
        async: false
    }).responseText;
    //
    if (addType === "append") {
        $(selector).append(html);
    } else if (addType === "prepend") {
        $(selector).prepend(html);
    } else if (addType === "after") {
        $(selector).after(html);
    } else if (addType === "before") {
        $(selector).before(html);
    } else {
        $(selector).append(html);
    }
    //
    hideNavBarButtons();
    //
    addEventsToLinks();
    //
}

function exists(selector) {
    if ($(selector).length) {
        return true;
    } else {
        return false;
    }
}

//===============================NAVBAR=========================================
