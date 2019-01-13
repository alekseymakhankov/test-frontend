/// <reference types="Cypress" />

context('Profile page', () => {
  beforeEach(() => {
    cy.visit('/profile/0')
  })

  it('should contain user name', () => {
    cy.get('#header > :nth-child(2)').should('contain', 'Tobus Quickwhistle');
    cy.get('.user-name').should('contain', 'Tobus Quickwhistle');
  })

  it('should exist avatar', () => {
    cy.get('.custom-image')
      .should('exist')
      .should('have.class', 'avatar')
      .should('have.css', 'border-radius', '50%');
  })

  it('should be four description blocks', () => {
    cy.get('.description-item').should('exist').should('have.length', 4);
  })

  it('should have pink hair color', () => {
    cy.get(':nth-child(4) > .value')
      .should('exist')
      .should('contain', 'Pink')
      .should('have.css', 'color', 'rgb(255, 192, 203)');
  })

  it('should exist friends title', () => {
    cy.get('.friends-title').should('exist').should('contain', 'Friends');
  })

  it('should have two friends', () => {
    cy.get('.friends-wrapper .item-wrapper').should('exist').should('have.length', 2);
  })
})
