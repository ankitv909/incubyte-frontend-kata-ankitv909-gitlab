import "@testing-library/jest-dom/vitest";
import { server } from "./testServer";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());