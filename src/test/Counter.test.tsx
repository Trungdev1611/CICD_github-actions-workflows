import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "../components/Counter";

test("renders initial count", () => {
  render(<Counter />);
  const countText = screen.getByTestId("count-value");
  expect(countText).toHaveTextContent("Count: 0");
});

test("increases count when Increase button clicked", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Increase"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 1");
});

test("decreases count when Decrease button clicked", () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("Decrease"));
  expect(screen.getByTestId("count-value")).toHaveTextContent("Count: -1");
});
