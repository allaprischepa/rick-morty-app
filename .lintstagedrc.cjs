module.exports = {
  "./src/*.{ts,tsx}": ["prettier --write", "eslint --report-unused-disable-directives --max-warnings 0"],
}
