jQuery(function ($) {
  $("a.nav-link").removeClass("active");
  let url = window.location.pathname;

  console.log("Текущий URL:", url); // Логирование текущего URL

  if (url === "/index.html") {
    $("a.nav-link.main").addClass("active");
  } else {
    // Форматирование action
    let action = url
      .replace("/index.html", "")
      .replace(/\/+/g, ".")
      .replace(".html", "")
      .replace(/^\.|\.$/g, ""); // Удаление точек в начале и в конце

    console.log("Сформированный action:", action); // Логирование action

    const $activeLink = $(`a.nav-link.${action}`);
    if ($activeLink.length) {
      $activeLink.addClass("active");
    } else {
      console.error("Селектор не найден:", action); // Логирование ошибки
      action = url.replace("/", "").replace(".html", ""); // Убрать расширение .html
    }
  }

  // Обработчик для кнопки модального окна
  $(".modal-button-consulting").on("click", function () {
    $("#myModal").modal("show");
  });

  // Обработчик для закрытия модального окна
  $(".close-modal").on("click", function () {
    $("#myModal").modal("hide");
  });

  // Обработчик для кнопки меню
  $(".header-navbar__btn").on("click", function () {
    $(this).toggleClass("active");
    $(".header-navbar__list").toggleClass("active");
  });

  // Обработчик события прокрутки для кнопки прокрутки вверх
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > window.innerHeight) {
      $(".up-button__wrapper").addClass("is_visible");
    } else {
      $(".up-button__wrapper").removeClass("is_visible");
    }
  });

  // Прокрутка вверх при нажатии на кнопку
  $(".up-button__wrapper").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });
});
