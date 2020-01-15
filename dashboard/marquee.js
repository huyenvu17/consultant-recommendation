function navTabsRefresh() {
    if ($(window).width() > 414) {
        $('.IELTS-tab-pane #section-navbar > ul > li.nav-item').height(($('.ielts-excercises-section .tab-content .tab-pane.active .IELTS-tab-pane #section-navbar > ul > li.nav-item').width() - 20) * 0.6);
    } else {
        $('.IELTS-tab-pane #section-navbar > ul > li.nav-item').height(($('.ielts-excercises-section .tab-content .tab-pane.active .IELTS-tab-pane #section-navbar > ul > li.nav-item').width()) * 1.5 + 20);
        $('.IELTS-grpExe-nav-text span.exe-count, .IELTS-grpExe-nav-text span.taker-count').addClass('slide-in');
        $('.IELTS-grpExe-nav-text svg text').attr({ 'text-anchor': 'middle', 'x': '50%', 'y': '0' });
    }    
}

function marqueeRefresh($el = null) {
    var collect;
    if ($el) {
        collect = $el.find('.free-exercise-item-desc .marquee__content');
    }
    else {
        collect = $('.free-exercise-item-desc .marquee__content');
    }
    collect.each(function () {
        var width = parseInt($(this).closest('.free-exercise-item-desc').width()) - 33 + 1;
        $(this).parents('.free-exercise-item-name-full').css('width', width);
        $(this).css('--wTranslate', width);
    });
}

$(document).ready(function () {
    navTabsRefresh();
    marqueeRefresh();

    $(".GE-grpExe-item.js-expand-box.collapse").find('.free-exercise-item-name-full').css('width', '100%');
});

$(window).on('resize', function () {
    navTabsRefresh();
    marqueeRefresh();
});

$('#section-navbar .nav-tabs a, #navbar .nav-tabs a').on('shown.bs.tab', function(event){
    marqueeRefresh();
});

$(".GE-grpExe-item.js-expand-box.collapse").on("shown.bs.collapse", function (e) {
    marqueeRefresh($(this));
});

function clearNavbar(tg) {
    var nav = $('.TOEIC-section-navbar').not(tg);
    nav.find('li').removeClass('active');
}

$('.TOEIC-section-navbar a').on('shown.bs.tab', function (event) {
    event.preventDefault();
    clearNavbar(event.target.closest('.TOEIC-section-navbar'));
});