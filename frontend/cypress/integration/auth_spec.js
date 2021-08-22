import {
  PASSWORD_FIELD,
  SUBMIT_BUTTON,
  USERNAME_FIELD,
  VALID_EMAIL,
  VALID_PASSWORD,
} from '../support/selectors/login-selectors';

describe('Login page', () => {
  it('Login user error', () => {
    cy.visit('/login');
    cy.get(USERNAME_FIELD).type(VALID_EMAIL);
    cy.get(PASSWORD_FIELD).type('abc');

    cy.get(SUBMIT_BUTTON).contains('Sign In').click();

    cy.url().should('include', '/login');
    cy.get('.MuiAlert-message').contains('Invalid email or password');
  });

  it('Login user', () => {
    cy.visit('/login');
    cy.get(USERNAME_FIELD).type(VALID_EMAIL);
    cy.get(PASSWORD_FIELD).type(VALID_PASSWORD);

    cy.get(SUBMIT_BUTTON).contains('Sign In').click();
    cy.url().should('include', '/');
  });
});
