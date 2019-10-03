module.exports = {
	automock: false,
  setupFiles: [
    "./src/setupTests.ts"
  ],
  roots: [
    "<rootDir>/src"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
}
