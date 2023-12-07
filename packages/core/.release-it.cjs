module.exports = {
  npm: {
    publish: true,
    skipChecks: true,
  },
  github: {
    release: true,
  },
  git: {
    requireCleanWorkingDir: false,
    addFiles: ["package.json", "CHANGELOG.md"],
    commitMessage: ":bookmark: release @takuma-ru/vue-swipe-modal@${version}",
  },
  plugins: {},
}
