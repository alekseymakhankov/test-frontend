/// <reference types="Cypress" />

context('Landing page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show correct title', () => {
    cy.get('.title > :nth-child(2)').should('contain', 'Network');
  })

  it('should exist grid container', () => {
    cy.get('.grid-container').should('exist');
  })

  it('should input has placeholder', () => {
    cy.get('.search-input').should('have.attr', 'placeholder', 'Search...');
  })
})
