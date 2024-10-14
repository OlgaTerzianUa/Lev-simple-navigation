jQuery(function ($) {
  // Функция для скрытия всех секций
  function hideAllSections() {
    $(".page-section").hide(); // Скрываем все секции
  }

  // Функция для показа активной секции
  function showSection(sectionId) {
    const section = $(`#${sectionId}`);
    section.show(); // Показываем выбранную секцию
    const headerHeight = $(".header").outerHeight(); // Получаем высоту хедера
    $("html, body").animate({ scrollTop: 0 }, 600); // Прокручиваем на высоту хедера
  }
  // Убираем класс active со всех ссылок в навигации
  function removeActiveClass() {
    $("a.nav-link").removeClass("active");
  }

  // Обработчик кликов по ссылкам меню
  $("a.nav-link").on("click", function (e) {
    e.preventDefault(); // Предотвращаем стандартное поведение

    const targetSectionId = $(this).attr("href").replace("#", ""); // Получаем ID секции

    removeActiveClass(); // Убираем класс active со всех ссылок
    $(this).addClass("active"); // Добавляем класс active к текущей ссылке

    hideAllSections(); // Скрываем все секции
    showSection(targetSectionId); // Показываем только нужную секцию
  });

  // Показываем первую секцию при загрузке страницы
  const firstSectionId = $("section").first().attr("id");
  hideAllSections(); // Скрываем все секции
  showSection(firstSectionId); // Показываем первую секцию по умолчанию

  // ============ гамбургер-меню
  // Получаем элементы гамбургера и меню
  const hamburger = document.querySelector(".header-navbar__btn");
  const menu = document.querySelector(".header-navbar__list");

  // Добавляем обработчик клика на гамбургер
  hamburger.addEventListener("click", function () {
    // Переключаем класс active для меню и гамбургера
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Кнопка Прокрутка вверх
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > window.innerHeight) {
      $(".up-button__wrapper").addClass("is_visible");
    } else {
      $(".up-button__wrapper").removeClass("is_visible");
    }
  });

  $(".up-button__wrapper").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  // Функция для закрытия модального окна и сброса формы
  function closeModalAndResetForm() {
    $("#myModal")
      .css("display", "none")
      .attr("aria-hidden", "true")
      .attr("inert", "");
    $("#contact-form").trigger("reset"); // Очищаем поля формы
    $(".help-block-error").text(""); // Убираем сообщения об ошибках
  }

  $(".modal-button-consulting").on("click", function () {
    $("#myModal")
      .css("display", "block")
      .attr("aria-hidden", "false")
      .removeAttr("inert");
  });

  $(".close-modal, .close").on("click", closeModalAndResetForm);

  $(window).on("click", function (event) {
    if ($(event.target).is("#myModal")) {
      closeModalAndResetForm();
    }
  });

  function resetFormErrors() {
    $(".has-error").removeClass("has-error");
    $(".help-block-error").text("");
  }

  function validateField($field, emptyMessage, formatMessage, pattern) {
    const value = $field.val().trim();
    $field.removeClass("has-error").next(".help-block-error").text("");

    if (!value) {
      $field.addClass("has-error").next(".help-block-error").text(emptyMessage);
      return false;
    }

    if (pattern && !pattern.test(value)) {
      $field
        .addClass("has-error")
        .next(".help-block-error")
        .text(formatMessage);
      return false;
    }

    return true;
  }

  $("#contactform-name").on("blur", function () {
    validateField($(this), "Будь ласка, введіть ваше ім'я.", "", null);
  });

  $("#contactform-email").on("blur", function () {
    validateField(
      $(this),
      "Будь ласка, введіть ваш email.",
      "Заповніть коректно email у форматі: example@domain.com.",
      /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i
    );
  });

  $("#contactform-phone").on("blur", function () {
    validateField(
      $(this),
      "Будь ласка, введіть номер телефону.",
      "Заповніть коректно номер телефону у форматі: +38 (012) 345-67-89.",
      /^\+38 \(\d{3}\) \d{3}-\d{2}-\д{2}$/
    );
  });

  $("#contactform-question").on("blur", function () {
    validateField($(this), "Будь ласка, введіть коротке питання.", "", null);
  });

  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    let isValid = true;
    resetFormErrors();

    isValid &= validateField(
      $("#contactform-name"),
      "Будь ласка, введіть ваше ім'я.",
      "",
      null
    );
    isValid &= validateField(
      $("#contactform-email"),
      "Будь ласка, введіть ваш email.",
      "Заповніть коректно email у форматі: example@domain.com.",
      /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i
    );
    isValid &= validateField(
      $("#contactform-phone"),
      "Будь ласка, введіть номер телефону.",
      "Заповніть коректно номер телефону у форматі: +38 (012) 345-67-89.",
      /^\+38 \(\д{3}\) \д{3}-\д{2}-\д{2}$/
    );
    isValid &= validateField(
      $("#contactform-question"),
      "Будь ласка, введіть коротке питання.",
      "",
      null
    );

    if (isValid) {
      closeModalAndResetForm(); // Закрываем модальное окно
    }
  });
});
