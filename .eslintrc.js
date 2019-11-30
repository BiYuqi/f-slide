module.exports = {
  root: true,
  extends: ["plugin:prettier/recommended"],
  plugins: ["prettier"],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "prettier/prettier": "error",
    "indent": ["error", 2],
    'generator-star-spacing': 'off',
    "quotes": ["error", "single"],
    "eqeqeq": 2,
    "default-case": 2
  }
}