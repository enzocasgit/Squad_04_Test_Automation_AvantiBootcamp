// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('visitPage', (url) => {
    cy.visit(url);
});
Cypress.Commands.add('searchItem', (item) => {
    cy.get('.ProductList', { timeout: 10000 }).should('exist');
    cy.contains('.ProductCard-Name', item, { timeout: 10000 }).should('be.visible').click()
    cy.get('h1[itemprop="name"]').should('be.visible').and('contain', item);
});  

Cypress.Commands.add('selectColor', (color) => {
    cy.get('#color_wrapper', { timeout: 1000 }).click(); 
    cy.contains('[role="menuitem"]', color).should('be.visible').click();   
})

Cypress.Commands.add('selectSize', (size) => {

    cy.get('#size_wrapper').click();

    cy.get('.FieldSelect-OptionsWrapper_isExpanded', { timeout: 8000 }).should('be.visible').within(() => {cy.contains('.FieldSelect-Option:not(.FieldSelect-Option_isPlaceholder)', size).should('be.visible').click();
    });
});
Cypress.Commands.add('addToCart', () => {
    cy.intercept('POST', '**/graphql**').as('cartAction');
    cy.contains('button', 'Add to cart').should('be.visible').click();
    cy.wait('@cartAction');
});
    
Cypress.Commands.add('validadeCartAction', (message) => { 
    cy.get('.NotificationList',).should('be.visible').and('contain', message);
});

Cypress.Commands.add('VisitCart', () => {
    cy.get('button[aria-label="Cart"]').should('be.visible').click();
});

Cypress.Commands.add('viewCart', () => {
    cy.contains('a', 'View Cart').should('be.visible').click();
});

Cypress.Commands.add('removeItemFromCart', (item) => {
    cy.contains('.CartItem', item).should('exist').within(() => {
        cy.get('button[aria-label="Remove item from cart"]').should('be.visible').click();
    });
});

Cypress.Commands.add('validateItemisRemoved', (item) => {
    cy.contains('.CartItem', item).should('not.exist');
});