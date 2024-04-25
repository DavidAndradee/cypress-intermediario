const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}` //pega o token criado para acesso a API

Cypress.Commands.add('api_createProject', project => {
  cy.request({ //requisição de api
    method: 'POST', //o tipo de requisição
    url: `/api/v4/projects/`, //qual endPoint deve acessar, ou seja o espaço na Web para realizar a requisição
    body: {// dados passados para realizar o post na requisição
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken }, //autorização para requisições dentro da API
  })
})

Cypress.Commands.add('api_getAllProjects', () => { //Reaqlizxa um get, pegaando todos os projetos dentro do endpoint PROJECTS
  cy.request({
    method: 'GET',
    url: '/api/v4/projects/',
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_deleteProjects', () => {
  //encadeia o get de pegar todos os projetos e joga em uma função
  cy.api_getAllProjects().then(res => res.body.forEach(project => cy.request({ // realiza um nova request depois de pegar todoas os projetos em cada projeto
      method: 'DELETE', //deletar cada projeto
      url: `/api/v4/projects/${project.id}`, //o id de cada projeto puxado pelo primeido request ALL
      headers: { Authorization: accessToken },
    }))
  )
})

Cypress.Commands.add('api_createIssue', issue => {
  cy.api_createProject(issue.project).then(response => {//cria o projeto que recebra a issue, a apartir do informado no CT
      cy.request({//craiação da issue
        method: 'POST',
        url: `/api/v4/projects/${response.body.id}/issues`,
        body: {
          title: issue.title,
          description: issue.description
        },
        headers: { Authorization: accessToken },
      })
    })
})

Cypress.Commands.add('api_createLabel', (projectId, label) => {
  cy.request({ //criação da label
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels`,
    body: {
      name: label.name,
      color: label.color
    },
    headers: { Authorization: accessToken },
  })
})

Cypress.Commands.add('api_createMilestone', (projectId, milestone) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/milestones`,
    body: { title: milestone.title },
    headers: { Authorization: accessToken },
  })
})

// >>>>>>>> MINHAS DIDEIA DE TESTS FORA O CURSO <<<<<<<<<<

Cypress.Commands.add('api_createWiki', projectId => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/wikis/home`,
    body: { title: projectId.title },
    headers: { Authorization: accessToken },
  })
})