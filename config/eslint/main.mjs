import antfu from '@antfu/eslint-config'

function mainConfig(
  /** @type {Parameters<typeof antfu>[0]} */
  options,
  /** @type {Parameters<typeof antfu>[1][]} */
  ...userConfigs
) {
  return antfu({
    type: 'lib',
    typescript: true,
    stylistic: {
      indent: 2,
      quotes: 'double',
      semi: true,
    },
    rules: {
      'antfu/top-level-function': 'off',
      'ts/explicit-function-return-type': 'off',
    },
    formatters: {
      html: true,
      css: true,
    },
    ignores: ['**/dist/**/*'],

    ...options,
  }, ...userConfigs)
}

export default mainConfig
