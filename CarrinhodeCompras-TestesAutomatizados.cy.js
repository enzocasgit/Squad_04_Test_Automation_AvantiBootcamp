describe('Carrinho de Compras', () => {
  it('Deve adicionar um item ao carrinho com sucesso', () => {
    cy.visitLuma()
    cy.interceptRequest();
    cy.searchByField('Jacket');
    cy.selectColor('Black')
    cy.selectSize('XS')
    cy.waitRequest();
    cy.addToCart();
    cy.verifyNotification("added to cart");
  });

  it('Deve tentar adicionar um item ao carrinho sem escolher tamanho/cor', () => {
    cy.visitLuma()
    cy.interceptRequest();
    cy.searchByField('Jacket');
    cy.addToCart();
    cy.verifyNotification("missing");
  });

  it("Adicionar dois items diferentes ao carrinho", () => {
    cy.visitLuma()
    cy.interceptRequest();
    cy.searchByField("Breathe-Easy Tank");
    cy.selectColor("Purple");
    cy.selectSize("S");
    cy.addToCart();
    cy.waitRequest();
    cy.verifyNotification("added to cart");

    cy.visitLuma();
    cy.searchByField("Radiant Tee");
    cy.selectColor("Blue");
    cy.selectSize("M");
    cy.addToCart();
    cy.waitRequest();
    cy.verifyNotification("added to cart");
  });

  it("Remover item do carrinho", () => {
    cy.visitLuma()
    cy.interceptRequest();
    cy.searchByField("Breathe-Easy Tank");
    cy.selectColor("Purple");
    cy.selectSize("S");
    cy.addToCart();
    cy.waitRequest();
    cy.verifyNotification("added to cart");

    cy.visitLuma();
    cy.searchByField("Radiant Tee");
    cy.selectColor("Blue");
    cy.selectSize("M");
    cy.addToCart();
    cy.waitRequest();
    cy.verifyNotification("added to cart");

    cy.VisitCart();
    cy.viewCart();
    cy.removeItemFromCart("Breathe-Easy Tank");
    cy.validateItemisRemoved("Breathe-Easy Tank");
  })
})