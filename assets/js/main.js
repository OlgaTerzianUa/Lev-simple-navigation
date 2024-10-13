jQuery(function ($) {
  // Убираем класс active со всех ссылок в навигации
  $("a.nav-link").removeClass("active");

  // Получаем текущий URL
  let url = window.location.pathname;

  // Форматируем action на основе URL
  let action = url
    .replace("/assets/pages/", "") // Убираем путь к странице
    .replace(".html", "") // Убираем .html
    .replace(/\/+/g, ".") // Заменяем слеши на точки
    .replace(/^\.|\.$/g, ""); // Убираем точки в начале и конце

  // Проверяем на активное ссылку на основе action
  if (action) {
    // Добавляем класс active к соответствующей ссылке
    const $activeLink = $(`a.nav-link.${action}`);
    if ($activeLink.length) {
      $activeLink.addClass("active");
    } else {
      // Если селектор не найден, выводим ошибку
      console.error("Селектор не найден:", action);
    }
  } else {
    // Если URL соответствует главной странице, добавляем класс active к главному ссылке
    $("a.nav-link.main").addClass("active");
  }

  // Ожидаем загрузку документа
  document.addEventListener("DOMContentLoaded", function () {
    // Получаем элементы модального окна и кнопки
    const modal = document.getElementById("myModal");
    const btn = document.querySelector(".modal-button-consulting");
    const closeBtn = document.querySelector(".close-modal");

    // Открытие модального окна
    btn.onclick = function () {
      modal.style.display = "block"; // Показываем модальное окно
    };

    // Закрытие модального окна
    closeBtn.onclick = function () {
      modal.style.display = "none"; // Скрываем модальное окно
    };

    // Закрытие модального окна при клике вне его
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none"; // Скрываем модальное окно
      }
    };
  });

  // Обработчик для кнопки меню
  $(".header-navbar__btn").on("click", function () {
    $(this).toggleClass("active"); // Переключаем класс active на кнопке
    $(".header-navbar__list").toggleClass("active"); // Переключаем класс active на списке
  });

  // Обработчик события прокрутки для кнопки прокрутки вверх
  $(window).on("scroll", function () {
    // Проверяем, прокручен ли экран больше высоты окна
    if ($(window).scrollTop() > window.innerHeight) {
      $(".up-button__wrapper").addClass("is_visible"); // Показываем кнопку
    } else {
      $(".up-button__wrapper").removeClass("is_visible"); // Скрываем кнопку
    }
  });

  // Прокрутка вверх при нажатии на кнопку
  $(".up-button__wrapper").on("click", function (e) {
    e.preventDefault(); // Предотвращаем стандартное поведение
    $("html, body").animate({ scrollTop: 0 }, 600); // Анимация прокрутки
  });

  // Функция валидации для каждого поля
  function validateField(field) {
    const value = $(field).val().trim(); // Получаем значение поля
    const fieldName = $(field).attr("id"); // Получаем id поля

    // Сбрасываем ошибки
    $(field).removeClass("has-error"); // Убираем класс ошибки с элемента
    $(field).parent().removeClass("has-error"); // Убираем класс ошибки с родительского элемента
    $(field).next(".help-block-error").text(""); // Очищаем текст ошибки

    // Проверка каждого поля
    if (fieldName === "contactform-name") {
      // Проверка имени
      if (!value) {
        $(field)
          .addClass("has-error") // Добавляем класс ошибки к элементу
          .next(".help-block-error")
          .text("Будь ласка, введіть ваше ім'я.") // Сообщение об ошибке
          .parent()
          .addClass("has-error"); // Добавляем класс ошибки к родителю
      }
    } else if (fieldName === "contactform-email") {
      // Проверка email
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // Шаблон для email
      if (!value) {
        $(field)
          .addClass("has-error")
          .next(".help-block-error")
          .text("Будь ласка, введіть ваш email.")
          .parent()
          .addClass("has-error");
      } else if (!value.match(emailPattern)) {
        $(field)
          .addClass("has-error")
          .next(".help-block-error")
          .text("Будь ласка, введіть правильний email.")
          .parent()
          .addClass("has-error");
      }
    } else if (fieldName === "contactform-phone") {
      // Проверка номера телефона
      if (!value) {
        $(field)
          .addClass("has-error")
          .next(".help-block-error")
          .text("Будь ласка, введіть номер телефону.")
          .parent()
          .addClass("has-error");
      }
    } else if (fieldName === "contactform-question") {
      // Проверка вопроса
      if (!value) {
        $(field)
          .addClass("has-error")
          .next(".help-block-error")
          .text("Будь ласка, введіть коротке питання.")
          .parent()
          .addClass("has-error");
      }
    }
  }

  // Применяем валидацию при потере фокуса
  $("#contactform-name").on("blur", function () {
    validateField(this); // Валидация поля имени
  });

  $("#contactform-email").on("blur", function () {
    validateField(this); // Валидация поля email
  });

  $("#contactform-phone").on("blur", function () {
    validateField(this); // Валидация поля телефона
  });

  $("#contactform-question").on("blur", function () {
    validateField(this); // Валидация поля вопроса
  });

  // Обработчик отправки формы
  $("#contact-form").on("submit", function (e) {
    e.preventDefault(); // Останавливаем стандартное поведение формы

    // Сбрасываем ошибки
    $(".help-block-error").text(""); // Очищаем текст ошибок

    let isValid = true; // Флаг для проверки валидности формы

    // Проверка каждого поля перед отправкой
    $(
      "#contactform-name, #contactform-email, #contactform-phone, #contactform-question"
    ).each(function () {
      validateField(this); // Валидация каждого поля
      if ($(this).next(".help-block-error").text()) {
        isValid = false; // Если есть ошибка, форма не валидна
      }
    });

    // Если форма валидна, выполняем действия
    if (isValid) {
      console.log("Форма валидна, данные могут быть обработаны...");

      // Очищение полей формы
      $("#contactform-name").val("");
      $("#contactform-email").val("");
      $("#contactform-phone").val("");
      $("#contactform-question").val("");
    }
  });
});
