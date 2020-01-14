var consultancy = (function () {
    var initConsultancy = function () {
        dobPicker();
        itemSelect();
        initTimeTable();
    };

    function dobPicker() {
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
    function itemSelect() {
        $('select').formSelect();
    }

    function initTimeTable() {
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

    return {
        initConsultancy,
        getTimeTableData
    }

})();