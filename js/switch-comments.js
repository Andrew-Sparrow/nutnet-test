const comments = [
  {
    author: 'ja galadriel',
    comment: 'This version of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.',
    position: 'ceo tengkurep',
  },
  {
    author: 'dik adalin',
    comment: 'This is Photoshops version of vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.',
    position: 'engineering',
  },
  {
    author: 'jeng kol',
    comment: 'Thid non mauris vitae erat consequat auctor eu in elit.',
    position: 'designer',
  },
  {
    author: 'pet romak',
    comment: 'Thid non mauris vitae erat consequat auctor eu in elit. ion of vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a orn',
    position: 'ceo',
  },
  {
    author: 'atti dbnumak',
    comment: 'Thid non mauris vitae erat consequat auctor eu in elit. version of vulputate cursus a sit amet mauris. Morbi accu. ion of vulputateor a orn',
    position: 'marketing',
  }
];


const showComment = (elem) => {
  document.querySelector('.quote__text').innerHTML = elem.comment;
  document.querySelector('.quote__author').innerHTML = elem.author;
  document.querySelector('.quote__position').innerHTML = elem.position;
};

const person_1 = document.querySelector('.quote__picture--1');
person_1.addEventListener("click", () => showComment(comments[0]));

const person_2 = document.querySelector('.quote__picture--2');
person_2.addEventListener("click", () => showComment(comments[1]));

const person_3 = document.querySelector('.quote__picture--3');
person_3.addEventListener("click", () => showComment(comments[2]));

const person_4 = document.querySelector('.quote__picture--4');
person_4.addEventListener("click", () => showComment(comments[3]));

const person_5 = document.querySelector('.quote__picture--5');
person_5.addEventListener("click", () => showComment(comments[4]));
