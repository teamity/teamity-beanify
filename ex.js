const Teamity = require('teamity')
const TeamityBeanify = require('./index')

const teamity = Teamity({
  pino: {
    level: 'debug',
    prettyPrint: true
  },
  server: {
    port: 4780,
    host: '0.0.0.0'
  }
})

teamity.register(TeamityBeanify, {
  autoloads: ['asd']
})

teamity.ready(e => {
  console.log(e)
  teamity.print()
  teamity.$beanify.print()
})
