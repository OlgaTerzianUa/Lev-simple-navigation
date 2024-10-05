jQuery(function ($) {
  // Убираем класс active со всех ссылок
  $("a.nav-link").removeClass("active");

  // Получаем текущий URL
  let url = window.location.pathname;
  console.log("Текущий URL:", url); // Логирование текущего URL

  // Форматируем action на основе URL
  let action = url
    .replace("/assets/pages/", "") // Убираем путь до страницы
    .replace(".html", "") // Убираем .html
    .replace(/\/+/g, ".") // Заменяем слэши на точки
    .replace(/^\.|\.$/g, ""); // Удаление точек в начале и в конце

  console.log("Сформированный action:", action); // Логирование action

  // Проверка на активную ссылку на основе action
  if (action) {
    // Добавляем класс active к соответствующей ссылке
    const $activeLink = $(`a.nav-link.${action}`);
    if ($activeLink.length) {
      $activeLink.addClass("active");
    } else {
      // В случае если селектор не найден, выведем ошибку
      console.error("Селектор не найден:", action);
    }
  } else {
    // Если URL соответствует главной странице, добавляем класс active к главной ссылке
    $("a.nav-link.main").addClass("active");
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

  // Функция валидации для каждого поля
  function validateField(field) {
    const value = $(field).val().trim();
    const fieldName = $(field).attr("id");

    // Сбрасываем ошибку
    $(field).next(".help-block-error").text("");

    if (fieldName === "contactform-name") {
      if (!value) {
        $(field)
          .next(".help-block-error")
          .text("Пожалуйста, введите ваше имя.");
      }
    } else if (fieldName === "contactform-email") {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // Простой паттерн для email
      if (!value) {
        $(field)
          .next(".help-block-error")
          .text("Пожалуйста, введите ваш email.");
      } else if (!value.match(emailPattern)) {
        $(field)
          .next(".help-block-error")
          .text("Пожалуйста, введите корректный email.");
      }
    } else if (fieldName === "contactform-phone") {
      if (!value) {
        $(field)
          .next(".help-block-error")
          .text("Пожалуйста, введите номер телефона.");
      }
    } else if (fieldName === "contactform-question") {
      if (!value) {
        $(field)
          .next(".help-block-error")
          .text("Пожалуйста, введите короткое вопрос.");
      }
    }
  }

  // Применяем валидацию при потере фокуса
  $("#contactform-name").on("blur", function () {
    validateField(this);
  });

  $("#contactform-email").on("blur", function () {
    validateField(this);
  });

  $("#contactform-phone").on("blur", function () {
    validateField(this);
  });

  $("#contactform-question").on("blur", function () {
    validateField(this);
  });

  // Обработчик отправки формы
  $("#contact-form").on("submit", function (e) {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    // Сбрасываем ошибки
    $(".help-block-error").text("");

    let isValid = true;

    // Проверка каждого поля перед отправкой
    $(
      "#contactform-name, #contactform-email, #contactform-phone, #contactform-question"
    ).each(function () {
      validateField(this);
      if ($(this).next(".help-block-error").text()) {
        isValid = false; // Если есть ошибка, то форма не валидна
      }
    });

    // Если форма валидна, можно отправить ее
    if (isValid) {
      console.log("Форма валидна, отправляем данные...");
      // Здесь можно выполнить AJAX запрос или другое действие

      // Очистка полей формы
      $("#contactform-name").val("");
      $("#contactform-email").val("");
      $("#contactform-phone").val("");
      $("#contactform-question").val("");

      // Уведомление об успешной отправке (по желанию)
      // alert("Форма успешно отправлена!");
    }
  });
});
