import * as components from '@/entry.esm';
const plugin = {}
type NamedExports = Exclude<typeof components, 'default'>;
type ExtendedPlugin = NamedExports;
Object.entries(components).forEach(([componentName, component]) => {
  if (componentName !== 'default') {
    const key = componentName as Exclude<keyof NamedExports, 'default'>;
    const val = component as Exclude<ExtendedPlugin, typeof plugin>;
    (plugin as ExtendedPlugin)[key] = val;
  }
});

export default plugin;