var consultancy = (function () {
    var initConsultancy  = function () {
        dob_picker();
        item_select();
        text_input_count();
        budget_plan();
        personal_info();
        result_form();
        initTabs();
        initTimeTable();
        toggleIcon();
    };

    function toggleIcon() {
        $(".user-dashboard__information .teacher-list .panel .panel-heading").click(function(){
            $(".user-dashboard__information .teacher-list .panel .panel-heading").each(function(){
              $(this).removeClass("active");
            });
            $(this).addClass("active");
        });
    }
 
    function initTabs() {
        setTimeout(function(){
            $('#step1').find('.skeleton-loading').css('display', 'none');
            $('#step1').find('.step-content').css('display', 'block');
        }, 500);

        // $('.steps-panel a').click(function(){
        //     $('.tab-content > div').css('display', 'none');
        //     $($(this).attr('href')).css('display', 'block');

        //     $($(this).attr('href')).find('.skeleton-loading').css('display', 'block');
        //     $($(this).attr('href')).find('.step-content').css('display', 'none');

        //     var el = $(this).attr('href');
        //     var f = function(){
        //         $(el).find('.skeleton-loading').css('display', 'none');
        //         $(el).find('.step-content').css('display', 'block');
        //     }
        //     setTimeout(f, 500);
        // });
    }


    function dob_picker() {
        var currYear = (new Date()).getFullYear();
        $('.datepicker').datepicker(
            {
                defaultDate: new Date(currYear - 20, 1, 31),
                setDefaultDate: new Date(2000, 0, 0),
                maxDate: new Date(currYear - 10, 12, 31),
                yearRange: [1970, currYear - 10],
                format: "dd/mm/yyyy",
                i18n: {
                    cancel: "Hủy",
                    done: 'Chọn',
                    months: [
                        'Thg 1',
                        'Thg 2',
                        'Thg 3',
                        'Thg 4',
                        'Thg 5',
                        'Thg 6',
                        'Thg 7',
                        'Thg 8',
                        'Thg 9',
                        'Thg 10',
                        'Thg 11',
                        'Thg 12',
                    ],
                    monthsShort: [
                        'Tháng 1',
                        'Tháng 2',
                        'Tháng 3',
                        'Tháng 4',
                        'Tháng 5',
                        'Tháng 6',
                        'Tháng 7',
                        'Tháng 8',
                        'Tháng 9',
                        'Tháng 10',
                        'Tháng 11',
                        'Tháng 12',
                    ],
                    weekdays: [
                        'Thứ hai',
                        'Thứ ba',
                        'Thứ tư',
                        'Thứ năm',
                        'Thứ sáu',
                        'Thứ bảy',
                        'Chủ nhật'
                    ],
                    weekdaysShort: [
                        'Thứ 2',
                        'Thứ 3',
                        'Thứ 4',
                        'Thứ 5',
                        'Thứ 6',
                        'Thứ 7',
                        'Chủ Nhật'
                    ],
                    weekdaysAbbrev: [
                        'T2',
                        'T3',
                        'T4',
                        'T5',
                        'T6',
                        'T7',
                        'CN'
                    ]
                }
            }
        );
    }
    function item_select() {
        $('select').formSelect();
    }
    function text_input_count() {
        $('textarea#note').characterCounter();
    }
    function initTimeTable() {
        $('.tooltipped').tooltip();
        
        $('.mnop > tbody > tr > td').on('mouseenter', function (e) {
            $(this).addClass('mouseon');
            var num = ($(this).closest('tr').find('td')).index($(this).closest('td')) + 1;
            $(`.mnop > tbody > tr > td:nth-child(${num})`).css({ background: '#F5F5F5' });
            $(`.mnop > thead > tr > th:nth-child(${num})`).css({ background: '#F5F5F5' });
            var mel = ($(this).closest('tbody').find('tr')).index($(this).closest('tr')) + 1;
            $(`.setting > tbody > tr:nth-child(${mel})`).css({ background: '#F5F5F5' });
        }).on('mouseleave', function (e) {
            $(this).removeClass('mouseon');
            $(`.mnop > tbody > tr > td`).css({ background: '' });
            $(`.mnop > thead > tr > th`).css({ background: '' });
            $(`.setting > tbody > tr`).css({ background: '' });

        });
        $('.mnop > tbody > tr > td').on('click', function (e) {
            $(this).removeClass('mouseon').toggleClass('chosen');

            $(this).mouseenter();
        });

        $('.mnop > thead > tr > th').on('mouseenter', function (e) {
            $(this).addClass('mouseon');
            var num = ($(this).closest('tr').find('th')).index($(this).closest('th')) + 1;
            $(`.mnop > tbody > tr > td:nth-child(${num}):not(.chosen)`).addClass('hovering');
            $(`.setting > tbody > tr`).css({ background: '#F5F5F5' });
        }).on('mouseleave', function (e) {
            $(this).removeClass('mouseon');
            $(`.mnop > tbody > tr > td`).removeClass('hovering');
            $(`.setting > tbody > tr`).css({ background: '' });
        });
        $('.mnop > thead > tr > th').on('click', function (e) {
            var num = ($(this).closest('tr').find('th')).index($(this).closest('th')) + 1;

            if ($(`.mnop > tbody > tr > td:nth-child(${num}):not(.chosen)`).length > 0) {
                $(`.mnop > tbody > tr > td:nth-child(${num})`).removeClass('hovering').addClass('chosen');
            } else {
                $(`.mnop > tbody > tr > td:nth-child(${num})`).removeClass('hovering').removeClass('chosen');
            }

            $(this).mouseenter();
        });

        $('.setting > tbody > tr').on('mouseenter', function (e) {
            $(this).addClass('mouseon');
            var num = ($(this).closest('tbody').find('tr')).index($(this).closest('tr')) + 1;
            $(`.mnop > tbody > tr:nth-child(${num}) > td:not(.chosen)`).addClass('hovering');
            $(`.mnop > thead > tr > th`).css({ background: '#F5F5F5' });
        }).on('mouseleave', function (e) {
            $(this).removeClass('mouseon');
            $(`.mnop > tbody > tr > td`).removeClass('hovering');
            $(`.mnop > thead > tr > th`).css({ background: '' });
        });
        $('.setting > tbody > tr').on('click', function (e) {
            var num = ($(this).closest('tbody').find('tr')).index($(this).closest('tr')) + 1;
            if ($(`.mnop > tbody > tr:nth-child(${num})`).find(`td:not(.chosen)`).length > 0) {
                $(`.mnop > tbody > tr:nth-child(${num})`).find(`td`).removeClass('hovering').addClass('chosen');
            } else {
                $(`.mnop > tbody > tr:nth-child(${num}`).find(`td`).removeClass('hovering').removeClass('chosen');
            }

            $(this).mouseenter();
        });

        $('#delete-table').on('click', function(){
            $(`.mnop > tbody > tr > td`).removeClass('hovering').removeClass('chosen');
        });
    }

    function getTimeTableData($array = false) {
        var $rs;
        if ($array == false) {

            $rs = [];

            $('.mnop td.chosen').each(function () {
                var buoi = $(this).closest('tr').attr('id');
                var ngay = $(this).closest('tr').find('td').index($(this)) + 1;
                var thu = $(this).closest('table').find(`thead tr th:nth-child(${ngay})`).attr('id');

                $rs.push(thu + '-' + buoi);
            });


            M.toast({ html: $rs.join(', ') });
        } else {
            $rs = Array(3).fill(0).map(x => Array(7).fill(0));
            $('.mnop td.chosen').each(function () {
                var x = $(this).closest('tr').attr('value') - 1;
                var y = $(this).closest('tr').find('td').index($(this));

                $rs[x][y] = 1;
            });

            
            M.toast({ html: $rs[0] + '<br>' + $rs[1] + '<br>' + $rs[2] });
        }
        return $rs;
    }

    var pipFormats = {'2500000':'< 3,000,000', '12500000':'> 12,000,000'};
    var tooltipFormats = function(a){
        if (a < '3000000')
            return '< 3,000,000 VNĐ';
        else if (a > '12000000')
            return '> 12,000,000 VNĐ';
            else return wNumb({
                decimals: 0,
                postfix: ' VNĐ',
                thousand: ',',
            }).to(a);
    };

    function toNumber(a){
        var str = "";

        if (a){
            a.split('').map((r, i) => {
                if($.isNumeric(r))
                    str += r;
            });
        }
        return str;
    }

    function shortenNumber(a){
        if(a == '> 12,000,000 VNĐ' || a == '< 3,000,000 VNĐ')
            return '';
        var now = toNumber(a);

        var pow = Math.pow, floor = Math.floor, abs = Math.abs, log = Math.log;
        var abbrev = 'KMB';

        function round(n, precision) {
            var prec = Math.pow(10, precision);
            return Math.round(n*prec)/prec;
        }

        function format(n) {
            var base = floor(log(abs(n))/log(1000));
            var suffix = abbrev[Math.min(2, base - 1)];
            base = abbrev.indexOf(suffix) + 1;
            return suffix ? round(n/pow(1000,base),2)+suffix : ''+n;
        }

        return format(now);
    }

    function budget_plan() {
        var slider = document.getElementById('test-slider');
        noUiSlider.create(slider, {
            start: [3000000, 6000000],
            connect: true,
            step: 500000,
            tooltips: [true, {
                to: function(a){
                    return tooltipFormats(a);
                }
            }],
            orientation: 'horizontal',
            range: {
                'min': 2500000,
                'max': 12500000
            },
            format: {
                to: function(a){
                    return tooltipFormats(a);
                },
                from: function(a){
                    return (a);
                }
            },
            pips: {
                mode: 'range',
                format: {
                    to: function(a){
                        return pipFormats[a];
                    }
                }
            }
        });

        $('.noUi-handle').append('<div class="cur-value"></div>');

        var value = slider.noUiSlider.get();
        $('.cur-value').each((index, r) => {
            $(r).text(shortenNumber(value[index]));
        })

        slider.noUiSlider.on('end.one', function () { 
            var value = slider.noUiSlider.get();

            $('.cur-value').each((index, r) => {
                $(r).text(shortenNumber(value[index]));
            })
        });
    }

    function changeTab(from, to){
        from.removeClass('active');
        to.addClass('active');

        divFrom = $(from.find('a').attr("href"));
        divTo = $(to.find('a').attr("href"));

        
        divFrom.fadeOut(200);
        divTo.fadeIn(300);

        divTo.find('.skeleton-loading').css('display', 'block');
        divTo.find('.step-content').css('display', 'none');    

        window.scrollTo({top: 0, behavior: 'smooth'});
        setTimeout(function(){
            divTo.find('.skeleton-loading').css('display', 'none');
            divTo.find('.step-content').css('display', 'block');    
        }, 500);
    }

    function personal_info() {
        var stepsS = ['step1', 'step2'];
        var steps = [$(".steps-panel li").eq(0), $(".steps-panel li").eq(1)];
        
        $('.js-next').click(function () {
            var step = $(this).closest('.step-content').parent().attr('id');
            var indFrom = stepsS.indexOf(step);
            var indTo = indFrom + 1 >= steps.length ? steps.length : indFrom + 1;

            changeTab(steps[indFrom], steps[indTo]);
        });
        $('.btn-reset').click(function () {
            $("input").val('');
        });
        $('.btn-prev').click(function () {
            var step = $(this).closest('.step-content').parent().attr('id');
            var indFrom = stepsS.indexOf(step);
            var indTo = indFrom - 1 >= 0 ? indFrom - 1 : 0;

            changeTab(steps[indFrom], steps[indTo]);
        });
    }

    function result_form() {
        $(".js-result-form").click(function() { 
            window.location.replace('consultancy-result.html')
        });
        $('.btn-reload').click(function () {
            location.reload();
        });
    }

    return {
        initConsultancy,
        getTimeTableData
    }

})();