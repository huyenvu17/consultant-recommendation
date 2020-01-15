var bookLibrary = (function () {
    var listBookLibrary = "#list-book-library";
    var currentSelected;
    var statusSubmit = false;
    var menuItems;
    var url = '/Assets/json/search_option.json';
    var getJSon = function () {
        $.getJSON(url, function (json) {
            menuItems = json;
        });
    };

    var reloadPage = function (response) {
        if (response) {
            $(listBookLibrary).html(response);
            init();
        } else {
            // TODO
            return false;
        }
    };

    var init = function () {
        initCarousel();
        new Blazy();
    };

    var initCarousel = function () {
        var $owls = $('.books-carousel');
        $owls.each((index, item) => {
            let $owl = $(item);
            let count = +$owl.data('items-count');
            var size = $("#slideSize").val();
            let slideSize = count >= size ? size : count;
            var loop = count >= size ? true : false;
            let owl = $owl.owlCarousel({
                autoplay: count > size ? true : false,
                dots: true,
                loop: loop,
                nav: true,
                navText: ['<img src="/Assets/image/img/left1.png">', '<img src="/Assets/image/img/right1.png">'],
                items: slideSize, //10 items above 1000px browser width
                itemsDesktop: [1000, slideSize], //5 items between 1000px and 901px
                itemsDesktopSmall: [900, 3], // betweem 900px and 601px
                itemsTablet: [600, 2], //2 items between 600 and 0
                itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
                responsive: {
                0: {
                    items: 2,
                },
                400: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 3,
                },
                1200: {
                    items: 5,
                },
            },
            });
        });
        $('.books-carousel').on('changed.owl.carousel', function (event) {
            new Blazy();
        });
    };

    var initShowMore = function () {
        $(document).on('click', ".js_show_more_publisher", function () {
            var no = 1,
                lastItemIndex = 0,
                total = Number($("#totalPublishers").val()),
                size = Number($("#publisherSize").val()),
                that = this;
            var items = $(".div_publisher.hide");
            $.each(items, function (index, ele) {
                $(ele).removeClass('hide');
                lastItemIndex = $(ele).data("publisher-index");
                if (lastItemIndex === total) {
                    $(that).addClass("hide");
                } else {
                    $(that).blur();
                }
                if (no === size) {
                    return false;
                }
                no++;
            });
            new Blazy();
        });
        $(document).ready(function () {
            new Blazy();
        });
    };

    var loadMenu = function () {
        $(document).on("click", "#filtered-search-issues", function (e) {
            if ($(this).prop("readonly")) {
                refreshSelectOptionPosition();
                $("#js-dropdown-hint").show();
                isMenuShowing = true;
                var options = "";
                $.each(menuItems, function (index, item) {
                    options += `<li  class="filter-dropdown-item" style="display: block"; data-option="${item.Key}"><button class="btn" type="button"><span class="js-filter-hint"></span><span class="js-filter-tag dropdown-light-content">${item.Text}</span></button></li>`;
                });
                if ($("#ul-option").length === 0) {
                    refreshSelectOptionPosition();
                    $("#js-dropdown-hint").append(`<ul class="filter-dropdown" id="ul-option"> <li style="text-align:center" class ="option-title">Filter results by<i class="fa fa-times close-dropdown-btn" aria-hidden="true" style='float:right; margin-right:10px'></i></li>${options}</ul>`);
                }
            }
        });
        $(document).on("click", ".close-dropdown-btn", function () {
            $(".filtered-search-input-dropdown-menu").hide();
        });
    };

    var selectOption = function () {
        $("#menu").on("click", ".filter-dropdown-sub-item", function () {
            var name = $(this).attr("data-option");
            var value = $(this).attr("data-value");
            $("#filtered-search-issues").val(name);
            $("#filtered-search-issues").attr("data-value", value);
            $("#js-dropdown-hint").hide();
            selectValue();
        });
        $("#menu").on("click", ".filter-dropdown-item", function () {
            if (!$(this).hasClass("option-title")) {
                currentSelected = $(this).attr("data-option");
                $(".filtered-search-history-dropdown-toggle-button").attr("disabled", "");
                $(".filtered-search-history-dropdown-toggle-button").css('cursor', 'not-allowed');
                if (currentSelected == "PublishYear") {
                    $(".tokens-container li").last().remove();
                    $(".tokens-container").append(`<li class="js-visual-token filtered-search-token"><div class="selectable"><div class="name filter-option-value" data-option="${$(this).data('option')}" >${$(this).text()}</div></div></li>`);
                    $(".tokens-container").append(`<li class="input-token"><input autocomplete="off" class="form-control filtered-search" style="box-shadow:none !important" data-base-endpoint="/dashboard" data-multiple-assignees="true" readonly="" id="filtered-search-issues" placeholder="Search or filter results..." data-dropdown-trigger="#js-dropdown-hint"></li>`);
                    $("#filtered-search-issues").prop("readonly", true);
                    $("#filtered-search-issues").attr("placeholder", "Input your keyword here...");
                    $("#filtered-search-issues").css("border-color", "#589fef");
                    $("#filtered-search-issues").focus();
                    var publishedYear;
                    $.each(menuItems, function (index, item) {
                        if (item.Key == "PublishYear") {
                            publishedYear = item;
                        }
                    });
                    var ops = "";
                    $.each(publishedYear.Partitions, function (index, item) {
                        console.log(item);
                        ops += `<li  class="filter-dropdown-sub-item" style="display: block"; data-option="${item}"><button class="btn" type="button"><span class="js-filter-hint"></span><span class="js-filter-tag dropdown-light-content">${item}</span></button></li>`;
                        $("#js-dropdown-hint").html("");
                        $("#js-dropdown-hint").append(`<ul class="filter-dropdown" id="ul-option"> ${ops}</ul>`);
                    });
                }
                else if (currentSelected == "SkillId") {
                
                    $(".tokens-container li").last().remove();
                    $(".tokens-container").append(`<li class="js-visual-token filtered-search-token"><div class="selectable"><div class="name filter-option-value" data-option="${$(this).data('option')}" >${$(this).text()}</div></div></li>`);
                    $(".tokens-container").append(`<li class="input-token"><input autocomplete="off" class="form-control filtered-search" style="box-shadow:none !important" data-base-endpoint="/dashboard" data-multiple-assignees="true" readonly="" id="filtered-search-issues" placeholder="Search or filter results..." data-dropdown-trigger="#js-dropdown-hint"></li>`);
                    $("#filtered-search-issues").prop("readonly", false);
                    $("#filtered-search-issues").attr("placeholder", "Input your keyword here...");
                    $("#filtered-search-issues").css("border-color", "#589fef");
                    $("#filtered-search-issues").focus();
                    var skill;
                    $.each(menuItems, function (index, item) {
                        if (item.Key == "SkillId") {
                            skill = item;
                        }
                    });
                    var ops = "";
                    $.each(skill.SkillList, function (index, item) {
                        ops += `<li  class="filter-dropdown-sub-item" style="display: block"; data-option="${item.Name}" data-value="${item.SkillId}"><button class="btn" type="button"><span class="js-filter-hint"></span><span class="js-filter-tag dropdown-light-content">${item.Name}</span></button></li>`;
                        $("#js-dropdown-hint").html("");
                        $("#js-dropdown-hint").append(`<ul class="filter-dropdown" id="ul-option"> ${ops}</ul>`);
                    });
                } else {
                    $(".tokens-container li").last().remove();
                    $(".tokens-container").append(`<li class="js-visual-token filtered-search-token"><div class="selectable"><div class="name filter-option-value" data-option="${$(this).data('option')}" >${$(this).text()}</div></div></li>`);
                    $(".tokens-container").append(`<li class="input-token"><input autocomplete="off" class="form-control filtered-search" style="box-shadow:none !important" data-base-endpoint="/dashboard" data-multiple-assignees="true" readonly="" id="filtered-search-issues" placeholder="Search or filter results..." data-dropdown-trigger="#js-dropdown-hint"></li>`);
                    $("#filtered-search-issues").prop("readonly", false);
                    $("#filtered-search-issues").attr("placeholder", "Input your keyword here...");
                    $("#filtered-search-issues").css("border-color", "#589fef");
                    $("#filtered-search-issues").focus();
                    $("#js-dropdown-hint").hide();
                }
            }
        });
    };

    var selectValue = function () {
        var value = $("#filtered-search-issues").val();
        if (value != "") {
            statusSubmit = false;
            $(".filtered-search-history-dropdown-toggle-button").removeAttr("disabled");
            $(".filtered-search-history-dropdown-toggle-button").css('cursor', 'pointer');
            var key = $("#filtered-search-issues").parent().prev().children().children().attr("data-option");
            if (key == 'SkillId') {
                $(`#${key}`).val($("#filtered-search-issues").attr("data-value"));
            }
            else {
                $(`#${key}`).val($("#filtered-search-issues").val());
            }

            $("#filtered-search-issues").val("");
            $("#filtered-search-issues").prop("readonly", true);
            $("#filtered-search-issues").attr("placeholder", "Press ENTER to begin search ...");
            $("#filtered-search-issues").css("border-color", "white");
            $("#js-dropdown-hint").hide();
            $("#filtered-search-issues").parent().prev().children().append(`<div class="value-container" data-original-value="@tom_cxdr"><div class=" value">${value} </div ><div class="remove-token" role="button"><i class="fa fa-times" aria-hidden="true"></i></div></div >`);
            $(".filtered-search-input-dropdown-menu").html("");
            $.each(menuItems, function (index, value) {
                if (value.Key === currentSelected) {
                    menuItems.splice(index, 1);
                    return false;
                }
            });
        }
    };

    var addValue = function () {
        $(document).on("keypress", "#filtered-search-issues", function (e) {
            if (e.which == 13 || e.keyCode == 9) {
                selectValue();
            }
        });
        $(".filtered-search-history-dropdown-toggle-button").on("click", function (e) {
            if (!statusSubmit) {
                e.preventDefault();
                statusSubmit = true;
                return false;
            }
        });
        $(document).on('click', '.remove-token', function () {
            $(this).parent().parent().parent().remove();
            var key = $(this).parent().prev(".filter-option-value").attr("data-option");
            var value = $(this).parent().prev(".filter-option-value").text();
            var option;
            if (key == "PublishYear") {
                option = {
                    Key: key,
                    Text: value,
                    Partitions: ["< 2000", "≥ 2000"]
                };
            }
            else if (key == "SkillId") {
                option = {
                    Key: key,
                    Text: value,
                    SkillList: [
                        {
                            "SkillId": 1,
                            "Name": "Listening"
                        },
                        {
                            "SkillId": 2,
                            "Name": "Reading"
                        },
                        {
                            "SkillId": 4,
                            "Name": "Speaking"
                        },
                        {
                            "SkillId": 3,
                            "Name": "Writing"
                        }
                    ]
                };
            } else {
                option = {
                    Key: key,
                    Text: value
                };
            }
            menuItems.splice(0, 0, option);
            var options = `<li style="text-align:center" class ="option-title">Filter results by<i class="fa fa-times close-dropdown-btn" aria-hidden="true" style='float:right; margin-right:10px'></i></li>`;
            $.each(menuItems, function (index, item) {
                options += `<li  class="filter-dropdown-item" style="display: block"; data-option="${item.Key}"><button class="btn" type="button"><span class="js-filter-hint"></span><span class="js-filter-tag dropdown-light-content">${item.Text}</span></button></li>`;
            });
            $("#ul-option").html("");
            $("#ul-option").html(options);
            $(`#${key}`).val("");
        }); 
    };

    var refreshSelectOptionPosition = function () {
        var leftPoint = 12;
        $.each($(".tokens-container li:not(:last)"), function (index, item) {
            leftPoint += $(item).width();
        });
        $("#js-dropdown-hint").css("left", `${leftPoint}px`);
    };

    var initFilter = function () {
        getJSon();
        loadMenu();
        selectOption();
        addValue();
    };

    return {
        reloadPage: reloadPage,
        init: init,
        initShowMore: initShowMore,
        initFilter: initFilter,
        initCarousel: initCarousel
    };
})();

function setting_BookForYou() {
    default_width = $('#bookLibraryForYou').width() / 2 - 1;
    var width = $(window).width();
    if (width <= 1200 && width >= 768) {
        default_width = Math.floor($('#bookLibraryForYou').width() / 4) - 1;
    }
    var listElement = $('#BookForYou #bookLibraryForYou');
    listElement.children().css('width', default_width);
    listElement.children().find('.book-frame').css('height', default_width + 40);
    listElement.children().find('.book-frame img').css('height', default_width);
    listElement.children().find('div.pos_rel').css('max-width', default_width + 40);

    $('#BookForYou').css('height', 'max-content');
}
var appendBookInfo = function (data) {
    var modal = $('#show-book-info');
    var cover = modal.find('.book-cover img');
    var name = modal.find('.book-name');
    var publisher = modal.find('.book-publisher');
    var year = modal.find('.book-published-year');
    var view = modal.find('.view-total');
    var down = modal.find('.down-total');
    var tags = modal.find('.book-tags .tag-names');
    var desc = modal.find('.book-desc .book-desc-p');
    var pass = modal.find('.unzip-password');
    var btn_down = modal.find('.btn-download');
    var btn_test = modal.find('.btn-practice');

    $('#show-book-info .label-premium').hide();

    var app_link = location.href;
    var fb_like = modal.find('.book-desc');
    fb_like.find('.comments_box').remove();
    fb_like.append(`<section class="comments_box">
                        <div class="container-fluid">
                            <div class="row fb-like-share">
                                <div style="margin-right: 5px; margin-bottom: 5px">
                                    <div class="fb-share-button" data-href="${app_link}" data-layout="button_count" data-size="small"></div>
                                </div>
                                <div class="fb-like" data-href="${app_link}" data-width="300" data-layout="standard" data-action="like" data-size="small" data-show-faces="true"></div>
                            </div>
                            <div class="comments">
                                <div class="fb-comments" data-href="${app_link}" data-width="100%" data-numposts="5" data-order-by="reverse_time"></div>
                            </div>
                        </div>
                    </section>`);

    cover.attr('src', data.Cover);
    if (data.IsPremium) {
        $('#show-book-info .label-premium').show();
    } else {
        $('#show-book-info .label-premium').hide();
    }
    name.text(data.Name);
    publisher.text(data.Publisher);
    if (data.PublishYear) {
        year.closest('p').show();
        year.text(data.PublishYear);
    } else {
        year.closest('p').hide();
    }

    view.text(data.ViewTotal);
    down.text(data.DownloadTotal);
    tags.empty();
    if (data.SkillNames.length) {
        for (item of data.SkillNames) {
            tags.append(`<a href="` + lib_url + `?skill=` + item + `"><span class="hashtag">` + item.toLowerCase() + `</span></a>`);
        }
        tags.parents('.book-tags').show();
    }
    else {
        tags.parents('.book-tags').hide();
    }
    desc.html(data.Intro);

    if (data.IsLocked == true) {
        pass.show();
    } else {
        iconLock = "";
        pass.hide();
    }

    if (btn_down.length) {
        if (data.DownloadURL != "") {
            btn_down[0].outerHTML = `<button data-book-name="'` + data.Name + `'" data-category="'` + (data.CourseId == 4 ? "TOEIC Book" : "IELTS Book") + `'" class="btn-download ga-book-download" onclick="window.open('` + data.DownloadURL + `', '_blank');" data-value="` + data.Id + `"> Download</button>`;
        } else {
            btn_down[0].outerHTML = `<button class="btn-download disabled">Coming soon</button>`;
        }
    }

    if (btn_test.length) {
        btn_test[0].outerHTML = `<button data-book-name="'` + data.Name + `'" data-category="'` + (data.CourseId == 4 ? "TOEIC Book" : "IELTS Book") + `'" class="btn-practice ga-book-share" onclick="window.open('` + data.PracticeUrl + `', '', 'width=500,height=500');">Share</button>`;
    }

    incVD_lib(data.Id, 1, data.ViewTotal);
    incVD_lib(data.Id, 2, data.DownloadTotal);

    $('.comments_box').css('height', '200px')
    _utils.spinOn($('.comments_box'), 5);
    FB.XFBML.parse(modal.find('comment_box')[0], function () {
        _utils.spinOff();
        $('.comments_box').css('height', '');
    });
}

var incVD_lib = function (id, type, val) {
    var el = $('#B-' + id);
    el = (type == 1) ? el.find('.view-count span') : el.find('.download-count span');
    if (val == null) {
        el.text(parseInt(el.text().trim()) + 1);
    } else {
        el.text(val);
    }
}

var incD_info = function (id) {
    if (!$("#show-book-info .modal-dialog").hasClass('fadeOutDown')) {
        var el = $('.down-total').first();
        el.text(parseInt(el.text().trim()) + 1);
        incVD_lib(id, 2, el.text());
    } else {
        incVD_lib(id, 2, null);
    }
}

var getInfo = function (id) {
    $.ajax({
        'url': '/Home/AddViewDown',
        'type': 'GET',
        'data': {
            '_examInstanceId': id,
            'type': 1
        },
        'success': function () { detailBook(id); }
    });


}

var detailBook = function (id) {
    $.ajax({
        url: "/Search/DetailInformationBook",
        method: "POST",
        data: { idBook: id },
        success: function (resp) {
            spinOff();
            appendBookInfo(resp);
        }
    });
}

var spinOn = function () {
    $('#show-book-info .modal-loader').show();
}

var spinOff = function () {
    $('#show-book-info .modal-loader').hide();
}

var show_book = function (id) {
    getInfo(id);
}

$(document).on('click', $('.book-download, .btn-download').not('.disabled'), function (e) {
    let temp = $(e.target).attr("data-value");
    if (temp) {
        $.ajax({
            'url': '/Home/AddViewDown',
            'type': 'GET',
            'data': {
                '_examInstanceId': temp,
                'type': 2
            }
        });
        incD_info(temp);
    }
});

var book_width_desktop = 240;
var book_width_tablet = 225;
var book_width_mobile = 170;
var default_lib = "";

if ($('#bookLibrary').length) {
    default_lib = document.getElementById('bookLibrary').innerHTML;
}

function setting(curr = null, num = null) {
    curr = curr ? (--curr ? ++curr : 1) : null;

    var windowWidth = $(window).width();
    default_width = windowWidth <= 1024 ? windowWidth <= 768 ? windowWidth <= 375 ? windowWidth <= 320 ? 135 : book_width_mobile - 10 : book_width_mobile : book_width_tablet : book_width_desktop;

    var width = parseInt($(window).width()) * 90 / 100;
    width = width > 1700 ? 1700 : width;
    var perBook = Math.floor(width / default_width);
    var listElement = $('#bookLibrary');
    listElement.css('padding-left', (width - perBook * default_width) / 2);
    listElement.children().css('width', default_width);
    listElement.children().find('.book-frame').css('height', default_width + 40);
    listElement.children().find('.book-frame img').css('height', default_width);
    listElement.children().find('div.pos_rel').css('max-width', default_width + 40);

    var perPage = perBook * 5;
    var numItems = listElement.children().length;
    var numPages = Math.ceil(numItems / perPage);

    if (curr != null && num != null) {
        $('.pager').data("curr", Math.ceil(curr * num / perPage));
    } else {
        $('.pager').data("curr", 1);
    }

    $('.pager').data("num", perPage);
    if (parseInt($('.pager').data("num")) == numPages * perPage || parseInt($('.pager').data("curr")) == numPages) {
        $('.pager').hide();
    } else {
        $('.pager').show();
    }

    listElement.children().css('display', 'none');
    if (curr != null && num != null) {
        listElement.children().slice(0, Math.ceil(curr * num / perPage) * perPage).css('display', 'block');
    } else {
        listElement.children().slice(0, perPage).css('display', 'block');
    }

    $('.pager a').off('click');

    $('.pager a').on('click', function (e) {
        goToPage = parseInt($('.pager').data("curr")) + 1;
        if (goToPage <= numPages) {
            goTo(goToPage);
        }
        if (goToPage == numPages) {
            $('.pager').hide();
        }
    });

    function goTo(page) {
        var startAt = 0,
            endOn = startAt + perPage * page;

        listElement.children().css('display', 'none').slice(startAt, endOn).css('display', 'block');
        $('.pager').data("curr", page);
    }

    $('.book-count .max-count').text($('#bookLibrary').find('.book-frame').length);

    loaded();
}

$(document).ready(function () {
    loading_on();
    setting();
});

$(window).on('resize', function () {
    if ($(window).width() > 1024) {
        loading_on();
    }
    setting($('.pager').data("curr"), $('.pager').data("num"));
});

var loading_on = function () {
    $('#bookLoader').addClass('shown');
}

var loaded = function () {
    window.setTimeout(function () {
        $('#bookLoader').removeClass('shown');
    }, 400);
}

var refillLibrary = function (lib = null) {
    if (!lib) {
        document.getElementById('bookLibrary').innerHTML = default_lib;
    } else {
        $('#bookLibrary').html(lib);
    }
    loaded();
}

var noResult = function () {
    $('#bookLibrary').empty().append('<div class="no-result">No result found</div>');
}

var show_result = function (els, qt, sr, sort) {
    if (els && els.length) {
        $('#bookLibrary').empty().append(els);
        if (sort) {
            var divList = $('#bookLibrary .book-container');
            divList.sort(function (a, b) {
                return $(a).attr("sort-order") - $(b).attr("sort-order")
            });
            refillLibrary(divList);
        }
    } else if (els && els.length == 0 && (qt != "." || sr != "")) {
        noResult();
    } else
        refillLibrary();

    loading_on();
    setting();
}

$(document).ready(function () {
    var availableTags = [];

    $('.book-frame .book-name-CS').each(function () {
        availableTags.push($(this).text());
    });

    if ($('#search-by-name').length) {
        $('#search-by-name').autocomplete({
            source: availableTags,
            select: function (event, ui) {
                loading_on();
                $(this).val(ui.item.value);
                query();
            },
            minChars: 3,
            matchContains: "word"
        });
    }
});
