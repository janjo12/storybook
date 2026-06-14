jest.mock("expo-router", () => {
  const React = require("react");
  const mockRouter = {
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
    push: jest.fn(),
    replace: jest.fn(),
  };

  const Link = ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children);
  const Stack = Object.assign(
    ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    {
      Screen: () => null,
    },
  );

  return { __mockRouter: mockRouter, Link, Stack, useRouter: () => mockRouter };
});

jest.mock("expo-status-bar", () => ({
  StatusBar: () => null,
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  let storage: Record<string, string> = {};

  return {
    clear: jest.fn(() => {
      storage = {};
      return Promise.resolve();
    }),
    getItem: jest.fn((key: string) => Promise.resolve(storage[key] ?? null)),
    removeItem: jest.fn((key: string) => {
      delete storage[key];
      return Promise.resolve();
    }),
    setItem: jest.fn((key: string, value: string) => {
      storage[key] = value;
      return Promise.resolve();
    }),
  };
});
