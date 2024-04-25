const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost', //defiinindo uma url base que nunca muda
    env:{
      hideCredentials: true, //guarda o token e o proteje ou seja não deixa exposto esse token
      requestMode:true,//feedback visual ao realizar uma requisição
    },
    experimentalRunAllSpecs: true,//possibilita executar todos os testes no APP
  },
  fixturesFolder: false, //não criar novas pastas de fixtures
  video: false, //não gerar videos a cada execução
})