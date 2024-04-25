import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
    beforeEach(() => cy.api_deleteProjects())

    it('successfully create', () => {
        const issue = { //variavel objeto issue
            title: 'olha criei uma issue - via Api', //title da issue a ser criada
            description: faker.random.words(3), //descrição da issu a ser criada
            project: { //objeto projeto pois para inserir a issue deve haver um projeto que sera definido os atributos aqui
                name: 'projeto criado para adicionar a issue nova da API',
                description: 'estou criando uma issue dentro de um projeto recem criado tbm'
            }
        }

        cy.api_createIssue(issue).then(response => { //passando o projeto e os atributo e chamando a requisição 
            //verificando os resultados do response após a requisição ser realizada
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal(issue.title)
            expect(response.body.description).to.equal(issue.description)
        })
    });
})