describe('Carrinho de Compras', () => {
  it('Deve adicionar um item ao carrinho com sucesso', () => {
    cy.visitLuma()
    cy.interceptRequest();
    cy.waitRequest();
    cy.searchByField('Jacket');
    cy.waitRequest();
    cy.selectColor('Black')
    cy.selectSize('XS')
    cy.addToCart();
    cy.waitRequest();
    cy.verifyNotification("added to cart");
  });
  
  it("Remover item do carrinho", () => {
    cy.visitLuma()
    cy.interceptRequest();
    cy.waitRequest();
    cy.searchByField('Jacket');
    cy.waitRequest();
    cy.selectColor('Black')
    cy.selectSize('XS')
    cy.addToCart();
    cy.waitRequest();
    cy.verifyNotification("added to cart");
    cy.VisitCart();
    cy.viewCart();
    cy.waitRequest();
    cy.removeItemFromCart("Jacket");
    cy.waitRequest();
    cy.validateItemisRemoved("Jacket");
  })

  it('Deve tentar adicionar um item ao carrinho sem escolher tamanho/cor', () => {
    cy.visitLuma()
    cy.interceptRequest();
    cy.searchByField('Jacket');
    cy.waitRequest();
    cy.addToCart();
    cy.verifyNotification("missing");
  });
})
