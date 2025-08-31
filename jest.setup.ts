// Aumentar el timeout para tests de integración y E2E
jest.setTimeout(30000);

// Limpiar todos los mocks después de cada test
afterEach(() => {
	jest.clearAllMocks();
});
