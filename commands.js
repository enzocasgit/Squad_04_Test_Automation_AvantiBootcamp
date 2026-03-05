Cypress.Commands.add('visitLuma', () => {
    cy.visit("https://luma-demo.scandipwa.com/");
});
Cypress.Commands.add('searchItem', (item) => {
    cy.get('.ProductList').should('exist');
    cy.contains('.ProductCard-Name', item).should('be.visible').click()
    cy.get('h1[itemprop="name"]').should('be.visible').and('contain', item);
});  

Cypress.Commands.add('selectColor', (color) => {
    cy.get('#color_wrapper').click(); 
    cy.contains('[role="menuitem"]', color).should('be.visible').click();   
})

Cypress.Commands.add('selectSize', (size) => {
    cy.get('#size_wrapper').click();
    cy.get('.FieldSelect-OptionsWrapper_isExpanded').should('be.visible').within(() => {
        cy.contains('.FieldSelect-Option:not(.FieldSelect-Option_isPlaceholder)', size).should('be.visible').click();
    });
});

Cypress.Commands.add('addToCart', () => {
    cy.contains('button', 'Add to cart').should('be.visible').click();
});
    
Cypress.Commands.add('verifyNotification', (message) => { 
    cy.get('.NotificationList').should('be.visible').and('contain', message);
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

Cypress.Commands.add('interceptRequest', () => {
    cy.intercept("POST", "**/graphql**").as("gqlRequest");
});

Cypress.Commands.add('waitRequest', () => {
    cy.wait("@gqlRequest");
});

Cypress.Commands.add('searchByField', (searchEntry) => {
    cy.get('input[id="search-field"]').should('be.visible').type(searchEntry + '{enter}')
    cy.get('.ProductList').should('exist').contains(searchEntry)
    cy.get('.ProductCard').first().click();
});   