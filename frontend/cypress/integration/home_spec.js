import { PRODUCT_CARD, SEARCH_FIELD } from '../support/selectors/home-selectors';
import { SUBMIT_BUTTON } from '../support/selectors/login-selectors';
import { PRODUCT_QUATITY_INPUT } from '../support/selectors/product-selectors';

describe('Search products', () => {
  it('Find products by title', () => {
    cy.visit('/');
    cy.get(SEARCH_FIELD).type('sony');
    cy.get(SUBMIT_BUTTON).contains('Search').click();

    cy.url().should('include', '/search/sony');

    cy.get(PRODUCT_CARD).should('have.length', 2);
  });

  it('Add product into shopping cart', () => {
    cy.get(PRODUCT_CARD).first().click();
    cy.get(PRODUCT_QUATITY_INPUT).first().type('{downarrow}{enter}');
    cy.get(SUBMIT_BUTTON).contains('Add To Cart').click();
  });
});
