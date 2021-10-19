import { Teamity } from 'teamity'
import { TeamityBeanify, TeamityBeanifyOptions } from './types/options'
import { Beanify, Inject } from 'beanify'

declare const beanify: TeamityBeanify

export = beanify

declare module 'teamity' {
  interface TeamityPlugin {
    (plugin: TeamityBeanify, opts: TeamityBeanifyOptions): Teamity
  }

  interface Teamity {
    $beanify: Beanify
  }

  interface Reply {
    inject(route: Inject): PromiseLike<void>
  }
}

declare module 'beanify' {
  interface Beanify {
    $teamity: Teamity
  }
}
