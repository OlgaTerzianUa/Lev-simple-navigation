jQuery(function ($) {
  // Убираем класс active со всех ссылок в навигации
  $("a.nav-link").removeClass("active");

  // Получаем путь
  const pathname = window.location.pathname;
  const action = pathname
    .replace("/assets/pages/", "")
    .replace(".html", "")
    .replace(/^\/+/, ""); // Убираем начальный слэш

  console.log("Значение action:", action); // Отладочное сообщение

  // Если action пустой, используем ссылку на главную страницу
  const $activeLink = action
    ? $(`a.nav-link[href*="${action}"]`)
    : $("a.nav-link[href*='index']");

  if ($activeLink.length) {
    $activeLink.addClass("active");
  } else {
    console.error("Селектор не найден:", action);
  }

  // Обработчик для кнопки меню
  $(".header-navbar__btn").on("click", function () {
    $(this).toggleClass("active");
    $(".header-navbar__list").toggleClass("active");
  });

  // =============== Кнопка Прокрутка вверх
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

  // =========== Модальное окно

  // Функция для закрытия модального окна и очистки формы
  function closeModalAndResetForm() {
    $("#myModal")
      .css("display", "none")
      .attr("aria-hidden", "true")
      .attr("inert", "");
    $("#contact-form").trigger("reset"); // Очищаем поля формы
    $(".help-block-error").text(""); // Убираем сообщения об ошибках
  }

  // Открытие модального окна
  $(".modal-button-consulting").on("click", function () {
    $("#myModal")
      .css("display", "block")
      .attr("aria-hidden", "false")
      .removeAttr("inert");
  });

  // Закрытие модального окна при клике на кнопку закрытия
  $(".close-modal, .close").on("click", closeModalAndResetForm);

  // Закрытие модального окна при клике вне его
  $(window).on("click", function (event) {
    if ($(event.target).is("#myModal")) {
      closeModalAndResetForm();
    }
  });

  // ========== Валидация каждого поля отдельно ==========

  // Функция для проверки и валидации
  function validateField($field, emptyMessage, formatMessage, pattern) {
    const value = $field.val().trim();
    $field.removeClass("has-error").next(".help-block-error").text("");

    if (!value) {
      console.log(`Проверка пустого поля: ${$field.attr("id")}`);
      console.log(`Сообщение для пустого поля: ${emptyMessage}`);
      $field.addClass("has-error").next(".help-block-error").text(emptyMessage);
      return false; // Возвращаем false, если поле пустое
    }

    if (pattern && !pattern.test(value)) {
      console.log(
        `Некорректное значение: ${value}, сообщение: ${formatMessage}`
      );
      $field
        .addClass("has-error")
        .next(".help-block-error")
        .text(formatMessage);
      return false; // Возвращаем false, если формат некорректен
    }

    return true; // Возвращаем true, если всё корректно
  }

  // Валидация имени
  $("#contactform-name").on("blur", function () {
    validateField($(this), "Будь ласка, введіть ваше ім'я.", "", null);
  });

  // Валидация email
  $("#contactform-email").on("blur", function () {
    validateField(
      $(this),
      "Будь ласка, введіть ваш email.",
      "Заповніть коректно email у форматі: example@domain.com.",
      /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i
    );
  });

  // Валидация телефона
  $("#contactform-phone").on("blur", function () {
    validateField(
      $(this),
      "Будь ласка, введіть номер телефону.",
      "Заповніть коректно номер телефону у форматі: +38 (012) 345-67-89.",
      /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
    );
  });

  // Валидация вопроса
  $("#contactform-question").on("blur", function () {
    validateField($(this), "Будь ласка, введіть коротке питання.", "", null);
  });

  // =============== Обработчик отправки формы
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Проверяем каждое поле на валидность
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
      /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
    );
    isValid &= validateField(
      $("#contactform-question"),
      "Будь ласка, введіть коротке питання.",
      "",
      null
    );

    if (isValid) {
      console.log("Форма валидна, данные могут быть обработаны...");
      closeModalAndResetForm(); // Закрываем модальное окно после успешной отправки
    } else {
      console.log("Ошибка валидации, форма не отправлена.");
    }
  });
});
