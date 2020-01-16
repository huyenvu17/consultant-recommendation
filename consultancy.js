var consultancy = (function () {
    var initConsultancy  = function () {
        dob_picker();
        item_select();
        text_input_count();
        personal_info();
        personalized_learning_course();
        result_form();
        initTabs();
        initTimeTable();
        toggleIcon();
    };

    function toggleIcon() {
        $('.teacher-list .panel .panel-collapse').on('show.bs.collapse', function () {
            $(this).siblings('.teacher-list .panel .panel-heading').addClass('active');
          });
        $('.teacher-list .panel .panel-collapse').on('hide.bs.collapse', function () {
          $(this).siblings('.teacher-list .panel .panel-heading').removeClass('active');
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
                format: "dd/mm/yyyy"
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


    function budget_plan() {
        var slider = document.getElementById('test-slider');
        noUiSlider.create(slider, {
            start: [0, 5000000],
            connect: true,
            step: 500000,
            tooltips: true,
            orientation: 'horizontal',
            range: {
                'min': 3000000,
                'max': 12000000
            },
            format: wNumb({
                decimals: 0,
                postfix: 'đ',
                thousand: ',',
            }),
            pips: {
                mode: 'range',
                stepped: true,
                density: 4
            }
        });
    }
    function personal_info() {
        $('.js-next').click(function () {
            var step1 = $(".steps-panel li").eq(0);
            setTimeout(function(){
                $('#step2').find('.skeleton-loading').css('display', 'none');
                $('#step2').find('.step-content').css('display', 'block');
            }, 1000);
            $('#step2').fadeIn('slow');
            $('#step1').fadeOut();
            $('.active').next().addClass('active');
            step1.removeClass('active');

        });
        $('.btn-reset').click(function () {
            $("input").val('');
        });
    }
    function personalized_learning_course() {
        var step1 = $(".steps-panel li").eq(0);
        var step2 = $(".steps-panel li").eq(1);
        $('.js-personal-info').click(function () {
            $('.active').next().addClass('active active1');
            step2.removeClass('active');
            setTimeout(function(){
                $('#step2').find('.skeleton-loading').css('display', 'none');
                $('#step3').find('.step-content').css('display', 'block');
            }, 1000);
            $('#step3').fadeIn('slow');
            $('#step2').hide();
        });
        $('.btn-prev').click(function () {
            step2.removeClass('active');
            step1.addClass('active');
            setTimeout(function(){
                $('#step1').find('.skeleton-loading').css('display', 'none');
                $('#step1').find('.step-content').css('display', 'block');
            }, 1000);
            $('#step1').fadeIn('slow');
            $('#step2').fadeOut();
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
        getTimeTableData,
        budget_plan
    }

})();