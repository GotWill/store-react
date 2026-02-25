import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>./setupTests.ts"],
  verbose: true,
  transform: {
    // Essa linha força o Jest a usar o ts-jest para arquivos .ts e .tsx
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.json", // Aponta para o arquivo que editamos no passo 1
      },
    ],
  },
  moduleNameMapper: {
    // Caso você use o @/ no futuro
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  coverageProvider: "v8",
};

export default config;
