var consultancy = (function () {
    var initConsultancy  = function () {
        dob_picker();
        item_select();
        text_input_count();
        budget_plan();
        personal_info();
        personalized_learning_course();
        result_form();
    };

    function dob_picker() {
        var currYear = (new Date()).getFullYear();
        $('.datepicker').datepicker(
            {
                defaultDate: new Date(currYear-20,1,31),
                setDefaultDate: new Date(2000,0,0),
                maxDate: new Date(currYear-10,12,31),
                yearRange: [1970, currYear-10],
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
            $('#step3').fadeIn('slow');
            $('#step2').hide();
            $('.active').next().addClass('active active1');
            step2.removeClass('active');
        });
        $('.btn-prev').click(function () {
            $('#step1').fadeIn('slow');
            $('#step2').fadeOut();
            step2.removeClass('active');
            step1.addClass('active');
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
        initConsultancy
    }

})();