import { faker } from '@faker-js/faker' //biblioteca que criar dados aleatoprios

const options = { env:{ snapshotOnly: true } } //

describe('Create Project', options, () =>{
    beforeEach(()=>{ //pre-condições
        cy.api_deleteProjects()
        cy.login()
    })

    it('successfully create',() =>{
        const project = {
            name :'UM PROJETO - VIA Graphical User Interface', //cria um nome id com dado aleatorio
            description: faker.random.words(5) //criar uma descrição aleatoria de 5 palavras
        }

        cy.gui_createProject(project)
    })

})