import { faker } from '@faker-js/faker'

describe('git clone', () => {
  const project = { //variavel aleatoria
    name: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5)
  }

  beforeEach(() => { // pre condições
    cy.api_deleteProjects() // deleta tudo
    cy.api_createProject(project) // cria um novo
  })

  it('successfully git clone on project', () => {
    cy.cloneViaSSH(project)//recebe um projeto no qual foi criado
    //ler o README e identificar a informações
    cy.readFile(`cypress/downloads/${project.name}/README.md`).should('contain', `# ${project.name}`)
    .and('contain', project.description)
  })
})
