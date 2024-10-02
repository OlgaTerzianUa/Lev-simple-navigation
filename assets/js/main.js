jQuery(function ($) {
    $('a.nav-link').removeClass('active');
    let url = window.location.pathname;
    if (url === '/') {
        $('a.nav-link.main').addClass('active');
    } else {
        let action = url.replace('/', '');

        $(`a.nav-link.${action}`).addClass('active');
    }

    $('.modal-button-consulting').on('click', function () {
        $('#myModal').modal('show');
    });

    $('.close-modal').on('click', function () {
        $('#myModal').modal('hide');
    });

    $('.header-navbar__btn').on('click', function () {
        $(this).toggleClass('active');
        $('.header-navbar__list').toggleClass('active');
    });

    // Обработчик события прокрутки для кнопки прокрутки вверх
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > window.innerHeight) {
            $('.up-button__wrapper').addClass('is_visible');
        } else {
            $('.up-button__wrapper').removeClass('is_visible');
        }
    });

    // Прокрутка вверх при нажатии на кнопку
    $('.up-button__wrapper').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    });
});