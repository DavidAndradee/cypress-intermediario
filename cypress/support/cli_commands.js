Cypress.Commands.add('cloneViaSSH', project => {
    const domain = Cypress.config('baseUrl').replace('http://', '')

    cy.exec(`cd cypress-intermediario-v2/cypress/downloads/ && git clone git@${domain}:${Cypress.env('user_name')}/${project.name}.git`)
})