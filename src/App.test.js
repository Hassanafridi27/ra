import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

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
