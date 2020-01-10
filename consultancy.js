var consultancy = (function () {
    var initConsultancy  = function () {
        dobPicker();
        itemSelect();
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
    
    return {
        initConsultancy
    }

})();