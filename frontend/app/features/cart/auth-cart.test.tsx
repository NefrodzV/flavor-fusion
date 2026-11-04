import { render, screen, waitFor, within } from "@testing-library/react";
import { expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { CartRouteComponent } from "./test-helpers";
import { useAuth } from "~/providers/AuthProvider";

test("Running mock test", () => {
  render(<CartRouteComponent initialUser={{ username: "John Mark" }} />);
});
