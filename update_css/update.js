const controls = document.querySelectorAll('.controls input');

controls.forEach((input) => input.addEventListener('change', handleUpdate));
controls.forEach((input) => input.addEventListener('mousemove', handleUpdate));


function handleUpdate() {
  const suffix = this.dataset.suffix || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}
