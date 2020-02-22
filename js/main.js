;(function($){

    $('#intro').slick({
        dots: false,
        autoplay: true,
        speed: 100,
        fade: true
    });

    $('#slider2').slick({
        dots: true,
        autoplay: true,
        speed: 100,
        fade: true,
        prevArrow: false,
        nextArrow: false
    });

    $('#accordion a').on('click', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        var p = $(this).next('p');
        if (p.is(':visible')) p.hide();
        else p.show().siblings('p').hide();
    });
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
        getSortData: {
            webdesign: '[data-category]'
        }
    });

// bind sort button click
    $('.sort-by-button-group').on( 'click', 'button', function() {
        var sortValue = $(this).attr('data-sort-value');
        $grid.isotope({ sortBy: sortValue });
    });
// change is-checked class on buttons
    $('.button-group button').on('click', function () {
        $(this)
            .addClass('is-checked')
            .siblings('button')
            .removeClass('is-checked')
    });
    var $grid = $('.grid').isotope({
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
// filter functions
    var filterFns = {};
// bind filter button click
    $('.filters-button-group').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });

    function Circle(el) {
       $(el).circleProgress({fill: {color: '#FF0034'}}).on('circle-animation-progress',function (event, progress, stepValue) {
           $(this).find('strong').text(String(stepValue.toFixed(2)).substr(2)+'%');
       });
    };

    var s1Top = $('#circles-graphs')[0].offsetTop,
        windowHeight = $(window).height(),
        played = false;
    $(window).on('scroll',function () {
        if (window.scrollY + windowHeight > s1Top && !played) {
            Circle('.round');
            played = true;
        }
    });
})(jQuery);