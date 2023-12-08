module.exports = {
  npm: {
    publish: true,
  },
  github: {
    release: true,
  },
  git: {
    requireCleanWorkingDir: false,
    addFiles: ["package.json"],
    commitMessage: ":bookmark: release @takuma-ru/vue-swipe-modal@${version}",
  },
  plugins: {},
}
