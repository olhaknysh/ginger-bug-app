const fermentationDays = [
  {
    day: 1,
    description:
      "Початок ферментації. Наріжте свіжий імбир разом зі шкіркою. У банку налийте 2 склянки фільтрованої води, додайте 1 ст. ложку імбиру та 1 ст. ложку тростинного цукру. Добре перемішайте. Накрийте тканиною і залиште в темному місці при кімнатній температурі.",
  },
  {
    day: 2,
    description:
      "Додайте 2 ч. ложки свіжого імбиру та 2 ч. ложки тростинного цукру. Добре перемішайте. Зберігайте в темному місці при кімнатній температурі.",
  },
  {
    day: 3,
    description:
      "Продовжуйте щоденне годування: 2 ч. ложки імбиру + 2 ч. ложки цукру. Перевіряйте запах і наявність перших бульбашок. Це може свідчити про початок бродіння.",
  },
  {
    day: 4,
    description:
      "Додаємо по 2 ч. ложки імбиру та цукру. Закваска починає шипіти й видавати кислуватий аромат. Це ознака активної ферментації.",
  },
  {
    day: 5,
    description:
      "Продовжуйте годувати: 2 ч. ложки імбиру + 2 ч. ложки цукру. Закваска повинна давати багато бульбашок. Можна побачити легкий шар піни зверху.",
  },
  {
    day: 6,
    description:
      "Закваска майже готова. Продовжуйте годувати. Смак повинен бути кисло-солодким, із чітким імбирним ароматом. Газоутворення збільшується.",
  },
  {
    day: 7,
    description:
      "Ферментація завершена! Закваска активно шипить, має яскравий кислий запах і смак. Можна використовувати для приготування імбирного пива чи інших напоїв.",
  },
];

$(document).ready(function () {
  const daysContainer = $("#days-container");
  fermentationDays.forEach((item) => {
    const dayDiv = $(
      `<div class="day" data-day="${item.day}">${item.day}</div>`
    );
    dayDiv.click(function () {
      showDayInfo(item.day);
      $(".day").removeClass("selected");
      $(this).addClass("selected");
    });
    daysContainer.append(dayDiv);
  });

  function showDayInfo(day) {
    const dayInfo = fermentationDays.find((item) => item.day === day);
    $("#day-description").text(
      dayInfo ? dayInfo.description : "Виберіть день."
    );

    const progress = (day / fermentationDays.length) * 100;
    $("#progress").css("width", progress + "%");
  }

  showDayInfo(currentDay);
  $(`.day[data-day="${currentDay}"]`).addClass("selected");
});
