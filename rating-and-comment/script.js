document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const formRating = document.querySelectorAll('.form__rating');
  const formError = document.querySelector('.form__error');
  const ratingBox = document.querySelector('.rating-box');
  const stars = document.querySelectorAll('.stars');
  const starArr = Array.from(stars);

  for (const star of starArr) {
    star.addEventListener('click', () => {
      formError.classList.add('form__error__hidden');

      for (let i = starArr.indexOf(star); i < starArr.length; i++) {
        starArr[i].classList.remove('star__active');
        formRating[i].checked = false;
      }

      for (let i = 0; i < starArr.indexOf(star) + 1; i++) {
        starArr[i].classList.add('star__active');
      }

      for (let i = 0; i < starArr.indexOf(star); i++) {
        formRating[i].checked = true;
      }
    });

    star.addEventListener('mouseover', () => {
      for (let i = 0; i < starArr.indexOf(star) + 1; i++) {
        starArr[i].classList.add('color-star');
      }
    });

    star.addEventListener('mouseleave', () => {
      star.classList.remove('color-star');
    });
  }

  ratingBox.onmouseleave = () => {
    stars.forEach((star) => {
      star.classList.remove('color-star');
    });
  };

  const checkForm = () => {
    let ratingValue = 0;
    const formComment = document.querySelector('.form__comment');

    formRating.forEach((checkBox) => {
      if (checkBox.checked) {
        ratingValue += 1;
      }
    });

    let finalFeedback = {
      rating: ratingValue,
      comment: formComment.value,
    };

    if (!formRating[0].checked) {
      formError.classList.remove('form__error__hidden');
    } else {
      console.log(finalFeedback);
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkForm();
  });
});
