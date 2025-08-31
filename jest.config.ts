import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
	preset: "ts-jest",
	testEnvironment: "node",
	moduleFileExtensions: ["ts", "js"],
	testMatch: [
		// Tests unitarios y de integración junto al código
		"**/__tests__/**/*.test.ts",
		"**/*.test.ts",
		// Tests E2E en carpeta separada
		"e2e/**/*.test.ts",
	],
	transform: {
		"^.+\\.ts$": "ts-jest",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	collectCoverageFrom: ["src/**/*.ts", "!src/types/**/*.ts", "!src/**/*.d.ts"],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
};

export default config;
