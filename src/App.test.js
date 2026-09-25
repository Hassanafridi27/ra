import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.scrollTo = jest.fn();
});

test("opens an area page when selecting an area from the site", () => {
  render(<App />);

  const manchesterButtons = screen.getAllByRole("button", {
    name: /Manchester/i,
  });
  fireEvent.click(manchesterButtons[0]);

  expect(
    screen.getByText(/mobile tyre fitting in manchester/i),
  ).toBeInTheDocument();
});

test("loads the correct area page from its URL route", () => {
  window.history.pushState({}, "", "/areas/manchester");

  render(<App />);

  expect(
    screen.getByText(/mobile tyre fitting in manchester/i),
  ).toBeInTheDocument();
});

test("shows the Droylsden service copy and review section on its area page", () => {
  window.history.pushState({}, "", "/areas/droylsden");

  render(<App />);

  expect(
    screen.getByText(/same day fitting in droylsden, manchester/i),
  ).toBeInTheDocument();
  expect(screen.getByText(/customer feedback/i)).toBeInTheDocument();
});
