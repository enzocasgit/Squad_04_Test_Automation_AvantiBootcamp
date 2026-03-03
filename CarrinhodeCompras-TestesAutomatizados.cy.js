describe('Carrinho de Compras', () => {
  it('Deve adicionar um item ao carrinho com sucesso', () => {
    //Primeiro, precisamos entrar no site
    cy.visit('https://luma-demo.scandipwa.com/')
    cy.wait(15000) //Utilizado para dar tempo dos recursos do site serem carregados 

    //Em seguida, procurar um item
    cy.get('input[id="search-field"]').should('be.visible').type('Jacket{enter}')
    cy.wait(10000) //Utilizado para dar tempo dos recursos do site serem carregados
    cy.url().should('include', 'search') //Verificar se entrou na página certa

    //Selecionar o primeiro item que aparecer
    cy.get('.ProductList').should('exist').contains('Jacket')
    cy.get('.ProductCard').first().click();
    cy.wait(15000) //Utilizado para dar temop dos recursos do site serem carregados

    //Selecionar a cor do item
    cy.get('#color_wrapper', {timeout: 1000}).click(); //Clica na seleção de cores
    cy.get('#o395116', {timeout: 1000}).click(); //Clica na cor preta

    //Selecionar o tamanho do item
    cy.get('#size_wrapper', {timeout: 1000}).click(); //Clica na seleção de tamanho
    cy.get('#o395233', {timeout: 1000}).click(); //Clica no menor tamanho

    //Adicionar ao carrinho
    cy.wait(5000) //Tempo para carregar os recursos da página
    cy.contains('button', 'Add to cart').should('be.visible').click(); //Clica no botão de enviar ao carrinho
    cy.wait(10000)//Tempo para carregar os recursos da página

    //Validar se é adicionado ao carrinho com sucesso
    cy.get('.NotificationList', {timeout: 60000}).should('be.visible').and('contain', 'added to cart');
  });

  it('Deve tentar adicionar um item ao carrinho sem escolher tamanho/cor', () => {
    //Primeiro, precisamos entrar no site
    cy.visit('https://luma-demo.scandipwa.com/')
    cy.wait(15000) //Utilizado para dar tempo dos recursos do site serem carregados 

    //Em seguida, procurar um item
    cy.get('input[id="search-field"]').should('be.visible').type('Jacket{enter}')
    cy.wait(10000) //Utilizado para dar tempo dos recursos do site serem carregados
    cy.url().should('include', 'search') //Verificar se entrou na página certa

    //Selecionar o primeiro item que aparecer
    cy.get('.ProductList').should('exist').contains('Jacket')
    cy.get('.ProductCard').first().click();
    cy.wait(15000) //Utilizado para dar temop dos recursos do site serem carregados

    //Tentar adicionar ao carrinho
    cy.contains('button', 'Add to cart', {timeout:15000}).should('be.visible').click(); //Clica no botão de enviar ao carrinho

    //Validar se é adicionado ao carrinho com sucesso
    cy.get('.NotificationList', {timeout: 60000}).should('be.visible').and('contain', 'missing');
  });
})