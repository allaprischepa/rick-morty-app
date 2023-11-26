module.exports = {
  "**/*.{ts,tsx}": ["prettier --write", "eslint --report-unused-disable-directives --max-warnings 0"],
  "**/*.{css,scss}": "prettier --write",
}
