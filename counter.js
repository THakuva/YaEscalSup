// Ожидаем событие "DOMContentLoaded", чтобы код выполнился после загрузки всего контента страницы
document.addEventListener("DOMContentLoaded", () => {
  // Класс для управления счётчиками
  class Counter {
    constructor(id, storageKey) {
      // Получаем элементы счётчика из DOM по их ID и классам
      this.counterValue = document.querySelector(`#${id} .counter-value`);
      this.incrementBtn = document.querySelector(`#${id} .btn-increment`);
      this.decrementBtn = document.querySelector(`#${id} .btn-decrement`);
      this.resetBtn = document.querySelector(`#${id} .btn-reset`);

      // Уникальный ключ хранилища для сохранения значения счётчика
      this.storageKey = storageKey;
      this.value = 0;

      // Проверяем, есть ли сохранённое значение в локальном хранилище
      const storedValue = localStorage.getItem(this.storageKey);
      if (storedValue !== null) {
        // Если есть, используем его и обновляем отображение
        this.value = parseInt(storedValue);
        this.updateValue();
      }

      // Добавляем обработчики событий для кнопок счётчика
      if (this.incrementBtn) {
        this.incrementBtn.addEventListener("click", () => this.increment());
      }

      if (this.decrementBtn) {
        this.decrementBtn.addEventListener("click", () => this.decrement());
      }

      if (this.resetBtn) {
        this.resetBtn.addEventListener("click", () => this.reset());
      }
    }

    // Метод для увеличения значения счётчика
    increment() {
      this.value++;
      this.updateValue();
      updateEsc(); // Обновляем значение "escc"
      updateRR();
      updateEarnings();
      this.saveValue(); // Сохраняем значение в локальное хранилище
    }

    // Метод для уменьшения значения счётчика
    decrement() {
      if (this.value > 0) {
        this.value--;
        this.updateValue();
        updateEsc(); // Обновляем значение "escc"
        updateRR();
        updateEarnings();
        this.saveValue(); // Сохраняем значение в локальное хранилище
      }
    }

    // Метод для сброса значения счётчика
    reset() {
      this.value = 0;
      this.updateValue();
      updateEsc(); // Обновляем значение "escc"
      updateRR();
      updateEarnings();
      this.saveValue(); // Сохраняем значение в локальное хранилище
    }

    // Метод для обновления отображения значения счётчика
    updateValue() {
      this.counterValue.textContent = this.value;
    }

    // Метод для сохранения значения в локальное хранилище
    saveValue() {
      localStorage.setItem(this.storageKey, this.value);
    }
  }

  // Создаём экземпляры счётчиков с уникальными ключами хранилища
  const callsCounter = new Counter("calls", "callsCounterKey");
  const escalationsCounter = new Counter(
    "escalations",
    "escalationsCounterKey"
  );
  const rrCounter = new Counter("rrlations", "rrlationsCounterKey");

  // Получаем элемент для вывода значения "escc"
  const esccValue = document.getElementById("escc-value");

  // Метод для обновления значения "escc"
  function updateEsc() {
    const counterEsc = (escalationsCounter.value / callsCounter.value) * 100;
    esccValue.textContent = isNaN(counterEsc) ? "0.00" : counterEsc.toFixed(2);
  }
  // Получаем элемент для вывода значения "rr"
  const rrValue = document.getElementById("rr-value");

  // Метод для обновления значения "rr"
  function updateRR() {
    const counterrrlations = (rrCounter.value / callsCounter.value) * 100;
    rrValue.textContent = isNaN(counterrrlations)
      ? "0.00"
      : counterrrlations.toFixed(2);
  }
  // Получаем элементы кнопок сброса
  const resetCallsBtn = document.getElementById("reset-calls");
  const resetEscalationsBtn = document.getElementById("reset-escalations");
  const resetRRlationsBtn = document.getElementById("reset-rrlations");
  // Добавляем обработчики событий для кнопок сброса
  resetCallsBtn.addEventListener("click", () => {
    callsCounter.reset();
    updateEsc();
    updateRR();
  });

  resetEscalationsBtn.addEventListener("click", () => {
    escalationsCounter.reset();
    updateEsc();
    updateRR();
  });

  resetRRlationsBtn.addEventListener("click", () => {
    rrCounter.reset();
    updateEsc();
    updateRR();
  });
  // Проверяем, сохранено ли состояние скрытия
  if (localStorage.getItem("winterHidden") === "true") {
    var winterDiv = document.getElementById("winter");
    winterDiv.style.display = "none";
  }

  // Обработчик клика на кнопку winter-toggle
  document
    .getElementById("winter-toggle")
    .addEventListener("click", function () {
      var winterDiv = document.getElementById("winter");

      // Проверяем текущее состояние скрытия
      if (winterDiv.style.display === "none") {
        winterDiv.style.display = "block";

        // Сохраняем состояние скрытия в localStorage
        localStorage.setItem("winterHidden", "false");
      } else {
        winterDiv.style.display = "none";

        // Сохраняем состояние скрытия в localStorage
        localStorage.setItem("winterHidden", "true");
      }
    });
  // Получаем поля ввода для стоимости звонка и стоимости эскалации
  const callCostInput = document.getElementById("callCostInput");
  const escalationCostInput = document.getElementById("escalationCostInput");

  // Получаем элемент для отображения заработка
  const earningsValue = document.getElementById("earningsValue");

  // Добавляем функцию для расчета заработка
  function updateEarnings() {
    const earningsPerCall = parseFloat(callCostInput.value);
    const earningsPerEscalation = parseFloat(escalationCostInput.value);
    const totalCalls = callsCounter.value - escalationsCounter.value; // Учтено количество звонков без эскалаций
    const totalEscalations = escalationsCounter.value;
    const earnings =
      totalCalls * earningsPerCall + totalEscalations * earningsPerEscalation;
    earningsValue.textContent = earnings.toFixed(2);
  }

  // Сохраняем значения стоимости в localStorage
  callCostInput.addEventListener("change", function () {
    localStorage.setItem("callCost", callCostInput.value);
  });
  escalationCostInput.addEventListener("change", function () {
    localStorage.setItem("escalationCost", escalationCostInput.value);
  });

  // Загружаем сохраненные значения стоимости из localStorage
  const savedCallCost = localStorage.getItem("callCost");
  const savedEscalationCost = localStorage.getItem("escalationCost");
  if (savedCallCost) {
    callCostInput.value = savedCallCost;
  }
  if (savedEscalationCost) {
    escalationCostInput.value = savedEscalationCost;
  }
  const winterToggle = document.getElementById("winter-toggle");

  winterToggle.addEventListener("click", () => {
    winterToggle.classList.toggle("on");
  });
  const timeLeftEl = document.getElementById("time-left");
  const startBtn = document.getElementById("start");
  const pauseBtn = document.getElementById("pause");
  const resetBtn = document.getElementById("reset");
  const timeButtons = document.querySelectorAll(".time-button");
  const hideTimerBtn = document.getElementById("hide-timer");
  
  let intervalId;
  let isPaused = false;
  let remainingSeconds;
  
  // Функция для обновления отображаемого времени
  function updateDisplay(secondsLeft, forceUpdate = false) {
    if (!intervalId && !forceUpdate) {
      return;
    }
  
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    timeLeftEl.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  
  // Запуск таймера
  startBtn.addEventListener("click", () => {
    clearInterval(intervalId); // Очистка существующего интервала
    const selectedInterval = parseInt(
      document.querySelector(".time-button.active").dataset.interval
    );
    remainingSeconds = selectedInterval * 60;
    isPaused = false; // Сброс флага паузы
    intervalId = startTimer(remainingSeconds);
    pauseBtn.textContent = "Пауза";
  
    // Скрыть кнопки времени
    timeButtons.forEach((button) => button.classList.add("hidden"));
  });
  
  // Пауза/продолжение таймера
  pauseBtn.addEventListener("click", () => {
    if (intervalId) {
      if (!isPaused) {
        clearInterval(intervalId);
        isPaused = true;
        pauseBtn.textContent = "Продолжить";
      } else {
        intervalId = startTimer(remainingSeconds);
        isPaused = false;
        pauseBtn.textContent = "Пауза";
      }
    }
  });
  
  // Сброс таймера
  resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    updateDisplay(15 * 60); // Установка 15:00
    document.querySelector(".time-button.active").classList.remove("active");
    document
      .querySelector(".time-button[data-interval='15']")
      .classList.add("active");
    intervalId = null; // Сброс интервала
    isPaused = false; // Сброс флага паузы
    pauseBtn.textContent = "Пауза";
  
    // Показать кнопки времени
    timeButtons.forEach((button) => button.classList.remove("hidden"));
  });
  
  // Функция для логики таймера (детали реализации зависят от вашей библиотеки таймера)
  function startTimer(seconds) {
    updateDisplay(seconds);
  
    intervalId = setInterval(() => {
      remainingSeconds--;
      updateDisplay(remainingSeconds);
  
      if (remainingSeconds === 0) {
        clearInterval(intervalId);
        // Обработка завершения таймера (например, звук, оповещение)
      }
    }, 1000); // Обновление каждую секунду
  
    return intervalId;
  }
  
  // Обработка кнопок выбора времени
  timeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedInterval = parseInt(button.dataset.interval);
      document.querySelector(".time-button.active").classList.remove("active");
      button.classList.add("active");
  
      // Сброс таймера
      clearInterval(intervalId);
      isPaused = false;
      pauseBtn.textContent = "Пауза";
  
      // Обновление отображения таймера
      remainingSeconds = selectedInterval * 60;
      updateDisplay(remainingSeconds, true);
    });
  });
  
  // Скрытие/отображение таймера
  hideTimerBtn.addEventListener("click", () => {
    const timerContainer = document.querySelector(".timer-container");
    timerContainer.classList.toggle("hidden");
  
    // Обновление текста кнопки
    if (timerContainer.classList.contains("hidden")) {
      hideTimerBtn.textContent = "Показать таймер";
    } else {
      hideTimerBtn.textContent = "Скрыть таймер";
    }
  });
  
  // Вызываем функцию updateEarnings при загрузке страницы
  updateEarnings();

  // Инициализация значения "escc" при загрузке страницы
  updateEsc();
  updateRR();
});
