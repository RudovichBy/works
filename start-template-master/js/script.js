$(document).ready(function () {
  $('.fullpage').fullpage({
    scrollOverflow: true,
    continuousHorizontal: true,
    scrollOverflowOptions: {
      click: false
    },
    menu: '.menu',
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'lastPage'],
    afterRender: function () {
      $('.projects__last').html($('.projects__slides').length);
    },
    afterSlideLoad: function (section, origin, destination) {
      $('.projects__first').html(++destination.index);
    }
  });

  $(document).on('click', '.scroll-down', function () {
    fullpage_api.moveSectionDown();
  });

  $(document).on('click', '.fixed__hamburger', openMenu);
  $(document).on('click', '.main-menu__close', closeMenu);
  $(document).on('click', '.projects__mini a', changeImg);
  $(document).on('input', '.calc', changeInput);

  function changeImg(event) {
    event.preventDefault();
    $('.projects__big img').attr('src', $(this).attr('data-src'));
  }

  function changeInput(event) {
    event.preventDefault();
    $(this).find('.calc__range output').val($(this).find('.calc__range input').val());
  }

  function openMenu(event) {
    $('.main-menu').addClass('main-menu--active');
  }

  function closeMenu(event) {
    $('.main-menu').removeClass('main-menu--active');
  }

  // Скрываем меню при клике на него на смартфоне и планцете
  // По клику на ссылку в меню запускаем ф-ю fnstart();
  var menu = $('.main-menu__list');
  var pull = $('.main-menu');
  $('.main-menu__list a').on("click", function () {
    fnstart();
  });

  // В ф-ии fnstart(); проверяем - если меню открыто (проверяем по наличию класса --active у кнопки pull)
  // тогда убираем класс модификатор --active у кнопки pull
  // и сворачиваем/скрываем меню
  function fnstart() {
    if ($(".main-menu").hasClass("main-menu--active")) {
      // pull.toggleClass('main-menu--active');
      // pull.removeClass('main-menu--active');
      closeMenu();
      // menu.slideToggle();
    }
  };

});