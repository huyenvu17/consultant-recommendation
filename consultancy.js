var consultancy = (function () {
    var initConsultancy  = function () {
        dobPicker();
        itemSelect();
        textInputCount();
        budgetPlan();
    };

    function dobPicker() {
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
    function itemSelect() {
        $('select').formSelect();
    }
    function textInputCount() {
        $('textarea#note').characterCounter();
    }
    function budgetPlan() {
        var slider = document.getElementById('test-slider');
        noUiSlider.create(slider, {
            start: [0, 5000000],
            connect: true,
            step: 500000,
            tooltips: true,
            orientation: 'horizontal', // 'horizontal' or 'vertical'
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
    return {
        initConsultancy
    }

})();