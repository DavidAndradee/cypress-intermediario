import { faker } from '@faker-js/faker'

describe('Create Wiki', () => {

    it('successfully create', () => {
        const project = cy.api_getAllProjects()
        cy.get(project[0]).click()
    });
})