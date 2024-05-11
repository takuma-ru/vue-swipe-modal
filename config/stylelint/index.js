/** @type {import('stylelint').Configuration} */
const config = {
  extends: [
    "stylelint-scss",
    "stylelint-config-recess-order",
  ],
  rules: {
    "selector-class-pattern": ["(-|[a-z])[a-z]+"],
    "no-invalid-double-slash-comments": null,
  },
};

module.exports = config;