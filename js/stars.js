function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");

  const size = Math.random() * 3 + 1; // Размер звезды от 1 до 4 пикселей
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 2;

  star.style.left = `${x}px`;
  star.style.top = `${y}px`;

  const duration = Math.random() * 200 + 100; // Длительность анимации от 100 до 150 секунд
  star.style.animationDuration = `${duration}s`;

  // Звезды будут разных цветов: белый, голубой, желтый
  const colors = ["#fff", "#add8e6", "#ffd700"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  star.style.backgroundColor = color;

  return star;
}

function generateStars(count) {
  const starsContainer = document.getElementById("stars-container");
  for (let i = 0; i < count; i++) {
    const star = createStar();
    starsContainer.appendChild(star);
  }
}

generateStars(200); // Генерируем 300 звезд
