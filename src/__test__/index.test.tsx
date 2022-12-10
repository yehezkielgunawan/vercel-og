import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Home from "../pages/index";

import "@testing-library/jest-dom";

test("render successfully!", () => {
  render(<Home />);
  const heading = screen.getByText("Yehez OG Image Generator");
  const pageTitle = screen.getByDisplayValue("Title");
  const pageDesc = screen.getByDisplayValue("Description");
  expect(heading).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();
  expect(pageDesc).toBeInTheDocument();
});

test("Fill Form Test", async () => {
  render(<Home />);
  const pageTitle = screen.getByDisplayValue("Title");
  await waitFor(() => {
    fireEvent.change(pageTitle, { target: { value: "Test123" } });
  });
  expect(screen.getByDisplayValue("Test123")).toBeInTheDocument();
});
