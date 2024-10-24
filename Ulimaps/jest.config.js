export default {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleFileExtensions: ["js"],
  testEnvironment: "node",
  transformIgnorePatterns: [
    "/node_modules/(?!(@babel/runtime)/)"
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};