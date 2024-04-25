import { faker } from '@faker-js/faker'

const options = { env:{ snapshotOnly: true } } //permite que mesmo em testes GUI ter o feedback visual de chamadas de API

describe('Create Issue', options, () => {
  const issue = { //objeto issue
    title: 'um issue - VIA Graphical User Interface',
    description: faker.random.words(3),
    project: { //objeto projeto
      name: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }
  }

  beforeEach(() => {
    cy.api_deleteProjects() //deletando todos os outros projetos anteriores
    cy.login()
    cy.api_createProject(issue.project) //mandando o objeto project pre-criado e setando para de fato no commands criar o projeto
  })

  it('successfully', () => {
    cy.gui_createIssue(issue) //chamadnbo a criação de issue

    cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
  })

  // it('add new issue', () => {
  //   cy.get('UM PROJETO - VIA Graphical User Interface')
  // });
})
