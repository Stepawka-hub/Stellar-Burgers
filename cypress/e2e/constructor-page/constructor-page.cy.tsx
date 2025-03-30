import { host, mockAccessToken } from 'cypress/utils/constants';
import { cySelector } from 'cypress/utils/helpers';
import { TIngredient, TOrder } from '../../../src/utils/types';

import ingredientsData from '../../fixtures/ingredients.json';
import orderBurger from '../../fixtures/order-burger.json';

const ingredients: TIngredient[] = ingredientsData.data;

beforeEach(() => {
  // Подставляем моковый токен
  cy.setCookie('accessToken', mockAccessToken);

  // Перехватываем запросы
  cy.intercept('GET', '/api/auth/user', {
    fixture: 'user.json'
  }).as('user');

  cy.intercept('GET', '/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('ingredients');

  cy.visit(host);

  cy.wait('@ingredients');
});

afterEach(() => {
  // Очищаем куки
  cy.clearCookie('accessToken');
});

describe('Проверка модальных окон (Ингредиенты)', () => {
  const ingredient = ingredients[0];

  it('Открытие модального окна при клике на ингредиент', () => {
    cy.log('Клик по карточке ингредиента');
    cy.get(cySelector(ingredient._id)).click();

    cy.log('Проверка, что модальное окно открылось');
    cy.get(cySelector('modal')).should('exist');
  });

  it('В модальном окне указан правильный ингредиент', () => {
    cy.log('Клик по карточке ингредиента');
    cy.get(cySelector(ingredient._id)).click();

    cy.log('Проверка, что в модальном окне указан правильный ингредиент');
    cy.get(cySelector('modal'))
      .find(cySelector('ingredient-name'))
      .should('contain', ingredient.name);
  });

  it('Закрытие модального окна при клике по кнопке закрытия', () => {
    cy.log('Клик по карточке ингредиента');
    cy.get(cySelector(ingredient._id)).click();

    cy.log('Клик по кнопке закрытия модального окна');
    cy.get(cySelector('btn-close-modal')).click();

    cy.log('Модального окна не должно быть');
    cy.get(cySelector('modal')).should('not.exist');
  });

  it('Закрытие модального окна при клике по оверлею', () => {
    cy.log('Клик по карточке ингредиента');
    cy.get(cySelector(ingredient._id)).click();

    cy.log('Клик по оверлею');
    cy.get(cySelector('overlay')).click({ force: true });

    cy.log('Модального окна не должно быть');
    cy.get(cySelector('modal')).should('not.exist');
  });
});

describe('Работа конструктора', () => {
  it('Проверка, что конструктор пуст', () => {
    cy.log('Проверяем, что конструктор пуст');
    cy.get(cySelector('burger-constructor'))
      .find(cySelector('no-bun-top'))
      .should('exist');

    cy.get(cySelector('burger-constructor'))
      .find(cySelector('no-filling'))
      .should('exist');

    cy.get(cySelector('burger-constructor'))
      .find(cySelector('no-bun-bottom'))
      .should('exist');
  });

  it('Добавление булочки в конструктор', () => {
    const bun = ingredients.filter((i) => i.type === 'bun')[0];

    cy.log('Клик по кнопке добавления булочки');
    cy.get(cySelector(bun._id)).contains('Добавить').click();

    cy.log('Верхняя и нижняя секция не пусты');
    cy.get(cySelector('bun-top')).should('exist');
    cy.get(cySelector('bun-bottom')).should('exist');

    cy.log('Отображается корректная булочка');
    cy.get(cySelector('bun-top')).contains(bun.name).should('exist');
    cy.get(cySelector('bun-bottom')).contains(bun.name).should('exist');
  });

  it('Добавление ингредиентов в конструктор', () => {
    const elements = ingredients.filter((i) => i.type !== 'bun');

    cy.log('Клик по кнопке добавления ингредиента');
    elements.forEach((el) => {
      cy.get(cySelector(el._id)).contains('Добавить').click();
    });

    cy.log('Секция для ингредиентов не пуста');
    cy.get(cySelector('filling')).should('exist');

    cy.log('Секция содержит выбранные ингредиенты');
    elements.forEach((el) => {
      cy.get(cySelector('filling')).contains(el.name).should('exist');
    });
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/orders', {
      fixture: 'order-burger.json'
    }).as('order-burger');
  });

  it('Создание заказа', () => {
    const expectedOrder: TOrder = orderBurger.order;
    const bun = ingredients.filter((i) => i.type === 'bun')[0];
    const ingredient = ingredients.filter((i) => i.type !== 'bun')[0];

    cy.log('Клик по кнопке добавления булочки');
    cy.get(cySelector(bun._id)).contains('Добавить').click();

    cy.log('Клик по кнопке добавления ингредиента');
    cy.get(cySelector(ingredient._id)).contains('Добавить').click();

    cy.log('Клик по кнопке оформления заказа');
    cy.get(cySelector('burger-constructor')).contains('Оформить заказ').click();

    cy.wait('@order-burger');

    cy.log('Открылось модальное окно с номером заказа');
    cy.get(cySelector('modal')).should('exist');

    cy.log('Модальное окно содержит корректный номер заказа');
    cy.get(cySelector('modal')).contains(expectedOrder.number);

    cy.log('Клик по кнопке закрытия модального окна');
    cy.get(cySelector('btn-close-modal')).click();

    cy.log('Модального окна не должно быть');
    cy.get(cySelector('modal')).should('not.exist');

    cy.log('Проверяем, что конструктор пуст');
    cy.get(cySelector('burger-constructor'))
      .find(cySelector('no-bun-top'))
      .should('exist');

    cy.get(cySelector('burger-constructor'))
      .find(cySelector('no-filling'))
      .should('exist');

    cy.get(cySelector('burger-constructor'))
      .find(cySelector('no-bun-bottom'))
      .should('exist');
  });
});
