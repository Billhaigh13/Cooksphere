import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Input } from "./../../components/common/Input";

describe("Input Component", () => {
  const setup = (props: Partial<React.ComponentProps<typeof Input>> = {}) => {
    const defaultProps = {
      id: "test-input",
      name: "username",
      value: "",
      text: "Enter your username",
      error: false,
      handleChange: vi.fn(),
      ...props,
    };

    return render(<Input {...defaultProps} />);
  };

  test("should render the component with given props", () => {
    setup();

    expect(screen.getByLabelText(/enter your username/i)).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /enter your username/i })
    ).toHaveValue("");
  });

  test("should display error message when error is false", () => {
    setup({ error: false });

    expect(screen.getByText(/username is required\./i)).toBeInTheDocument();
  });

  test("should not display error message when error is true", () => {
    setup({ error: true });

    expect(
      screen.queryByText(/username is required\./i)
    ).not.toBeInTheDocument();
  });

  test("should apply the correct class when error is true", () => {
    setup({ error: true });

    const input = screen.getByRole("textbox", { name: /enter your username/i });
    expect(input).not.toHaveClass("outline-error");
  });

  test("should apply the correct class when error is false", () => {
    setup({ error: false });

    const input = screen.getByRole("textbox", { name: /enter your username/i });
    expect(input).toHaveClass("outline-error");
  });
});
