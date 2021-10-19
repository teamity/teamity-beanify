import { Teamity, PluginOptions } from 'teamity'
import { BeanifyOptions } from 'beanify'
import { AutoloadOptions } from 'beanify-autoload'

export class TeamityBeanifyOptions extends PluginOptions {
  beanify: BeanifyOptions
  autoloads: Array<string | AutoloadOptions>
}

export type TeamityBeanify = {
  (teamity: Teamity, opts: TeamityBeanifyOptions): Promise<void>
}
