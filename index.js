const Beanify = require('beanify')
const beanifyAutoload = require('beanify-autoload')
const path = require('path')

module.exports = function (teamity, opts, done) {
  const { beanify: beanifyOptions, autoloads = [] } = opts

  const { $log, $root } = teamity
  const beanify = Beanify(
    beanifyOptions || {
      pino: teamity.$options.pino
    }
  )

  $root.addHook('onClose', function () {
    $log.info('beanify closing')
    beanify.close(err => {
      if (err) {
        return $log.error(`beanify close error:${err.message}`)
      }
      $log.info('beanify closed')
    })
  })

  for (let loadOptions of autoloads) {
    if (typeof loadOptions === 'string') {
      loadOptions = {
        dir: loadOptions
      }
    }

    beanify.register(beanifyAutoload, {
      dir: path.join(process.cwd(), loadOptions.dir),
      dirAsScope: loadOptions.dirAsScope || false,
      prefix: opts.prefix
    })
  }

  $root.decorate('$beanify', beanify)
  $root.decorateReply('inject', function (route) {
    return beanify.inject(route).then(data => {
      this.send(data)
    })
  })

  beanify.decorate('$teamity', $root)
  beanify.ready(done)
}
