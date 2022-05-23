document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');

  const getSuperPower = () => {
    container.addEventListener('keydown', (event) => {
      event.preventDefault();

      const { target } = event;
      const enemyRight = target.nextElementSibling;
      const enemyLeft = target.previousElementSibling;

      if (
        (event.key === 'ArrowRight' && !enemyRight) ||
        (event.key === 'ArrowLeft' && !enemyLeft)
      ) {
        return;
      }

      if (event.key === 'ArrowRight' && enemyRight.textContent) {
        target.value = enemyRight.textContent;
        enemyRight.remove();
      }

      if (event.key === 'ArrowRight' && !enemyRight.textContent) {
        target.value = enemyRight.value;
        enemyRight.remove();
      }

      if (event.key === 'ArrowLeft' && enemyLeft.textContent) {
        target.value = enemyLeft.textContent;
        enemyLeft.remove();
      }

      if (event.key === 'ArrowLeft' && !enemyLeft.textContent) {
        target.value = enemyLeft.value;
        enemyLeft.remove();
      }
    });

    container.removeEventListener('focus', getSuperPower, true);
  };

  container.addEventListener('focus', getSuperPower, true);
});
