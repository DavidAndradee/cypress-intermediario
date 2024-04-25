import { faker } from '@faker-js/faker'

describe('Create Project',() => {
    beforeEach(() => cy.api_deleteProjects()) //deletando todo os pprojetos existentes antes de executar o CT

    it('successfull create', () => {
        const project = {
            name: 'criado pela API do meu jeito DavidAndrade',
            description: 'descrição da criação de um projeto - via api'
        }

        cy.api_createProject(project).then(response => { //passando o projeto e os atributo e chamando a requisição 
            //verificando os resultados do response após a requisição ser realizada
            expect(response.status).to.equal(201) 
            expect(response.body.name).to.equal(project.name)
            expect(response.body.description).to.equal(project.description)
        })
    });
})