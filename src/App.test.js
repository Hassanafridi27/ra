import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.scrollTo = jest.fn();
});

test("opens a sample tyre modal and checks the entered postcode", () => {
  render(<App />);

  const tyreSizeFields = screen.getAllByRole("combobox");
  ["205", "55", "16", "V"].forEach((value, index) => {
    fireEvent.change(tyreSizeFields[index], { target: { value } });
  });
  fireEvent.click(screen.getByRole("button", { name: /search tyres/i }));

  expect(screen.getByRole("dialog")).toHaveTextContent("205/55 R16 V");
  expect(screen.getByText("RA RoadPro Touring")).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", { name: /check fitting availability/i }),
  );
  fireEvent.change(screen.getByLabelText(/your postcode/i), {
    target: { value: "M43 7UR" },
  });
  fireEvent.click(screen.getByRole("button", { name: /check postcode/i }));

  expect(screen.getByRole("status")).toHaveTextContent("M43 7UR");
});

test("opens an area page when selecting an area from the site", () => {
  render(<App />);

  const manchesterButtons = screen.getAllByRole("button", {
    name: /Manchester/i,
  });
  fireEvent.click(manchesterButtons[0]);

  expect(
    screen.getByRole("heading", {
      name: /mobile tyre fitting in manchester/i,
    }),
  ).toBeInTheDocument();
});

test("loads the correct area page from its URL route", () => {
  window.history.pushState({}, "", "/areas/manchester");

  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /mobile tyre fitting in manchester/i,
    }),
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
