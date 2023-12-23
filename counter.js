// Ожидаем событие "DOMContentLoaded", чтобы код выполнился после загрузки всего контента страницы
document.addEventListener('DOMContentLoaded', () => {
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
        this.incrementBtn.addEventListener('click', () => this.increment());
      }

      if (this.decrementBtn) {
        this.decrementBtn.addEventListener('click', () => this.decrement());
      }

      if (this.resetBtn) {
        this.resetBtn.addEventListener('click', () => this.reset());
      }
    }

    // Метод для увеличения значения счётчика
    increment() {
      this.value++;
      this.updateValue();
      updateEsc(); // Обновляем значение "escc"
      updateRR();
      this.saveValue(); // Сохраняем значение в локальное хранилище
    }

    // Метод для уменьшения значения счётчика
    decrement() {
      this.value--;
      this.updateValue();
      updateEsc(); // Обновляем значение "escc"
      updateRR();
      this.saveValue(); // Сохраняем значение в локальное хранилище
    }

    // Метод для сброса значения счётчика
    reset() {
      this.value = 0;
      this.updateValue();
      updateEsc(); // Обновляем значение "escc"
      updateRR();
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
  const callsCounter = new Counter('calls', 'callsCounterKey');
  const escalationsCounter = new Counter('escalations', 'escalationsCounterKey');
  const rrCounter = new Counter('rrlations', 'rrlationsCounterKey');

  // Получаем элемент для вывода значения "escc"
  const esccValue = document.getElementById('escc-value');

  // Метод для обновления значения "escc"
  function updateEsc() {
    const counterEsc = (escalationsCounter.value / callsCounter.value) * 100;
    esccValue.textContent = isNaN(counterEsc) ? '0.00' : counterEsc.toFixed(2);
  }
    // Получаем элемент для вывода значения "rr"
    const rrValue = document.getElementById('rr-value');

  // Метод для обновления значения "rr"
  function updateRR() {
    const counterrrlations = (rrCounter.value / callsCounter.value) * 100;
    rrValue.textContent = isNaN(counterrrlations) ? '0.00' : counterrrlations.toFixed(2);
  }
  // Получаем элементы кнопок сброса
  const resetCallsBtn = document.getElementById('reset-calls');
  const resetEscalationsBtn = document.getElementById('reset-escalations');
  const resetRRlationsBtn = document.getElementById('reset-rrlations');
  // Добавляем обработчики событий для кнопок сброса
  resetCallsBtn.addEventListener('click', () => {
    callsCounter.reset();
    updateEsc();
    updateRR();
  });

  resetEscalationsBtn.addEventListener('click', () => {
    escalationsCounter.reset();
    updateEsc();
    updateRR();
  });

  resetRRlationsBtn.addEventListener('click', () => {
    rrCounter.reset();
    updateEsc();
    updateRR();
  });
// Переключение темы сайта и сохранение значения
const toggle = document.getElementById('theme-toggle'); // Получаем элемент переключателя

let theme = window.localStorage.getItem("theme"); // Получаем значение темы из локального хранилища

if (theme === 'dark-theme') {
  document.body.classList.add('dark-theme'); // Если тема - dark-theme, добавляем класс dark-theme к телу документа
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle('dark-theme'); // Переключаем класс dark-theme у тела документа
  theme = document.body.classList.contains('dark-theme') ? 'dark-theme' : null; // Обновляем значение темы в зависимости от наличия класса dark-theme
  window.localStorage.setItem("theme", theme); // Сохраняем значение темы в локальном хранилище
});

// Проверяем, сохранено ли состояние скрытия
if (localStorage.getItem("winterHidden") === "true") {
  var winterDiv = document.getElementById("winter");
  winterDiv.style.display = "none";
}

// Обработчик клика на кнопку winter-toggle
document.getElementById("winter-toggle").addEventListener("click", function() {
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
  // Инициализация значения "escc" при загрузке страницы
  updateEsc();    updateRR();
});