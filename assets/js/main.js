jQuery(function ($) {
  // Видаляємо клас active з усіх посилань
  $("a.nav-link").removeClass("active");

  // Отримуємо поточний URL
  let url = window.location.pathname;
  // console.log("Поточний URL:", url); // Логування поточного URL

  // Форматуємо action на основі URL
  let action = url
    .replace("/assets/pages/", "") // Видаляємо шлях до сторінки
    .replace(".html", "") // Видаляємо .html
    .replace(/\/+/g, ".") // Замінюємо слеші на крапки
    .replace(/^\.|\.$/g, ""); // Видалення крапок на початку і в кінці

  // console.log("Сформований action:", action); // Логування action

  // Перевірка на активне посилання на основі action
  if (action) {
    // Додаємо клас active до відповідного посилання
    const $activeLink = $(`a.nav-link.${action}`);
    if ($activeLink.length) {
      $activeLink.addClass("active");
    } else {
      // Якщо селектор не знайдено, виведемо помилку
      console.error("Селектор не знайдено:", action);
    }
  } else {
    // Якщо URL відповідає головній сторінці, додаємо клас active до головного посилання
    $("a.nav-link.main").addClass("active");
  }

  // Обробник для кнопки модального вікна
  $(".modal-button-consulting").on("click", function () {
    $("#myModal").modal("show");
  });

  // Обробник для закриття модального вікна
  $(".close-modal").on("click", function () {
    $("#myModal").modal("hide");
  });

  // Обробник для кнопки меню
  $(".header-navbar__btn").on("click", function () {
    $(this).toggleClass("active");
    $(".header-navbar__list").toggleClass("active");
  });

  // Обробник події прокручування для кнопки прокрутки вгору
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > window.innerHeight) {
      $(".up-button__wrapper").addClass("is_visible");
    } else {
      $(".up-button__wrapper").removeClass("is_visible");
    }
  });

  // Прокрутка вгору при натисканні на кнопку
  $(".up-button__wrapper").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "smooth");
  });

  // Функція валідації для кожного поля
  function validateField(field) {
    const value = $(field).val().trim();
    const fieldName = $(field).attr("id");

    // Скидаємо помилку
    $(field).removeClass("has-error"); // Видаляємо клас помилки з самого елемента
    $(field).parent().removeClass("has-error"); // Видаляємо клас помилки з батька
    $(field).next(".help-block-error").text(""); // Очищаємо текст помилки

    if (fieldName === "contactform-name") {
      if (!value) {
        $(field)
          .addClass("has-error") // Додаємо клас помилки самому елементу
          .next(".help-block-error")
          .text("Будь ласка, введіть ваше ім'я.")
          .parent()
          .addClass("has-error"); // Додаємо клас помилки до батьківського елемента
      }
    } else if (fieldName === "contactform-email") {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; // Простий патерн для email
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
      if (!value) {
        $(field)
          .addClass("has-error")
          .next(".help-block-error")
          .text("Будь ласка, введіть номер телефону.")
          .parent()
          .addClass("has-error");
      }
    } else if (fieldName === "contactform-question") {
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

  // Застосовуємо валідацію при втраті фокусу
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

  // Обробник відправки форми
  $("#contact-form").on("submit", function (e) {
    e.preventDefault(); // Зупиняємо стандартну поведінку форми

    // Скидаємо помилки
    $(".help-block-error").text("");

    let isValid = true;

    // Перевірка кожного поля перед відправкою
    $(
      "#contactform-name, #contactform-email, #contactform-phone, #contactform-question"
    ).each(function () {
      validateField(this);
      if ($(this).next(".help-block-error").text()) {
        isValid = false; // Якщо є помилка, то форма не валідна
      }
    });

    // Якщо форма валідна, можна відправити її
    if (isValid) {
      console.log("Форма валідна, відправляємо дані...");
      // Тут можна виконати AJAX запит або іншу дію

      // Очищення полів форми
      $("#contactform-name").val("");
      $("#contactform-email").val("");
      $("#contactform-phone").val("");
      $("#contactform-question").val("");

      // Повідомлення про успішне відправлення (за бажанням)
      // alert("Форма успішно відправлена!");
    }
  });
});
