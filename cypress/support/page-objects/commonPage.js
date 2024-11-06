export class CommonPage {

    open(url = '/') {
        cy.visit(url)
    }
}