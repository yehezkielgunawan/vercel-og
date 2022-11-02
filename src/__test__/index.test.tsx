import { render } from "@testing-library/react";

import Home from "../pages/index";

import "@testing-library/jest-dom";

test("render successfully!", () => {
  render(<Home />);
});
