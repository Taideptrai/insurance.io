// Project Stylelint Rules
// Docs: https://stylelint.io/user-guide/rules/list
//
// NOTE: when adding new extend, please be careful.
// Some Stylelint packages may overwrite others, making linter not work properly.
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-config-css-modules'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    // CSS RULES
    indentation: 2,
    'string-quotes': 'single',
    'no-duplicate-selectors': true,
    'color-hex-case': 'lower',
    'color-named': 'never',
    'selector-max-id': 0,
    'selector-combinator-space-after': 'always',
    'selector-attribute-quotes': 'always',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-brackets-space-inside': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'number-leading-zero': 'always',
    'function-url-quotes': 'always',
    'font-weight-notation': 'numeric',
    'font-family-name-quotes': 'always-unless-keyword',
    'comment-whitespace-inside': 'always',
    'comment-empty-line-before': 'always',
    'selector-pseudo-element-colon-notation': 'single',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-max-universal': 0,
    'media-feature-range-operator-space-before': 'always',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-colon-space-before': 'never',
    'media-feature-colon-space-after': 'always',
    'declaration-empty-line-before': null,
    'selector-type-no-unknown': [true, { ignoreTypes: ['/^v-/'] }],
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['/^v-/'] }],

    // SASS RULES
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
}
