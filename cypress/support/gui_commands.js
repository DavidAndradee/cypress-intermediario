// Cypress.Commands.add('login', (
//   user = Cypress.env('user_name'), //puxa o dado descrito o cypress jsopn
//   password = Cypress.env('user_password'), //puxa o dado do cypress json
// ) => {
//   const login = () => {
//     cy.visit('/users/sign_in')

//     cy.get("[data-qa-selector='login_field']").type(user)
//     cy.get("[data-qa-selector='password_field']").type(password, { log: false })
//     cy.get("[data-qa-selector='sign_in_button']").click()
//   }

//   login()
// })

Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timneout: 1000 }).should('not.eq', '/users/sign_in') //valida a seção s enão estiva ativa ele recria
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) { //reaproveita a sessão para não precisar realizar login sempre
    cy.session(user, login, options)
  } else {
    login()
  }
})


Cypress.Commands.add('logout', () => {
  cy.get('.qa-user-avatar').click()
  cy.contains('Sign out').click()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')

  cy.get('#project_name').type(project.name) //recebe o nome criado pelo faker
  cy.get('#project_description').type(project.description) //recebe a descrição criada pelo faker
  cy.get('.qa-initialize-with-readme-checkbox').check() //marcar readme na criação do project
  cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`);

  cy.get('.qa-issuable-form-title').type(issue.title)
  cy.get('.qa-issuable-form-description').type(issue.description)
  cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})