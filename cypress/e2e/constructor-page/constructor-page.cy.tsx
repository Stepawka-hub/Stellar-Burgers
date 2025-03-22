import { mount } from 'cypress/react18';

const host = 'http://localhost:4000';
const cySelector = (value: string) => `[data-cyid=${value}]`;

describe('Проверка доступности страницы', () => {
  it(`Страница должна быть доступна по адресу ${host}`, () => {
    cy.visit(host);
  });
});

describe('Проверка модальных окон (Ингредиенты)', () => {
  beforeEach(() => {
    cy.visit(host);
  });

  const ingredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  };

  it('Открытие модального окна при клике на ингредиент', () => {
    // Клик по карточке ингредиента
    cy.get(cySelector(ingredient._id)).click();

    // Проверка, что модальное окно открылось
    cy.get(cySelector('modal')).should('exist');
  });

  it('Проверка, что в модальном окне указан правильный ингредиент', () => {
    // Клик по карточке ингредиента
    cy.get(cySelector(ingredient._id)).click();

    // Проверка, что в модальном окне указан правильный ингредиент
    cy.get(cySelector('modal'))
      .find(cySelector('ingredient-name'))
      .should('contain', ingredient.name);
  });

  it('Закрытие модального окна при клике по кнопке закрытия', () => {
    // Клик по карточке ингредиента
    cy.get(cySelector(ingredient._id)).click();

    // Клик по кнопке закрытия модального окна
    cy.get(cySelector('btn-close-modal')).click();

    // Модального окна не должно быть
    cy.get(cySelector('modal')).should('not.exist');
  });

  it('Закрытие модального окна при клике по оверлею', () => {
    // Клик по карточке ингредиента
    cy.get(cySelector(ingredient._id)).click();

    // Клик по оверлею
    cy.get(cySelector('overlay')).click({ force: true });

    // Модального окна не должно быть
    cy.get(cySelector('modal')).should('not.exist');
  });
});

// describe('Проверка работы конструктора', () => {
//   beforeEach(() => {
//     cy.visit(host);
//   });

//   const bun = {
//     _id: '643d69a5c3f7b9001cfa093c',
//     name: 'Краторная булка N-200i',
//     type: 'bun',
//     proteins: 80,
//     fat: 24,
//     carbohydrates: 53,
//     calories: 420,
//     price: 1255,
//     image: 'https://code.s3.yandex.net/react/code/bun-02.png',
//     image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
//     image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
//     __v: 0
//   };

//   it('Добавление ингредиента в конструктор', () => {
//     // Проверяем, что конструктор пуст
//     cy.get(cySelector('burger-constructor'))
//       .find(cySelector('no-bun-top'))
//       .should('exist');

//     cy.get(cySelector('burger-constructor'))
//       .find(cySelector('no-filling'))
//       .should('exist');

//     cy.get(cySelector('burger-constructor'))
//       .find(cySelector('no-bun-bottom'))
//       .should('exist');
//   });
// });
