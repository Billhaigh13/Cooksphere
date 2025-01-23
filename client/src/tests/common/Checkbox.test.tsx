import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Checkbox } from "./../../components/common/Checkbox";

describe("Checkbox Component", () => {
  const setup = (
    props: Partial<React.ComponentProps<typeof Checkbox>> = {}
  ) => {
    const defaultProps = {
      id: "test-checkbox",
      value: "checkbox-value",
      text: "Check this box",
      handleChange: vi.fn(),
      ...props,
    };

    return render(<Checkbox {...defaultProps} />);
  };

  test("should render the component with given props", () => {
    setup();

    expect(screen.getByLabelText(/check this box/i)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: /check this box/i })
    ).not.toBeChecked();
  });

  test("should call handleChange when the checkbox is clicked", () => {
    const handleChange = vi.fn();
    setup({ handleChange });

    const checkbox = screen.getByRole("checkbox", { name: /check this box/i });
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }),
      })
    );

    fireEvent.click(checkbox); // Toggle off
    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: false,
        }),
      })
    );
  });

  test("should apply the correct class to the checkbox", () => {
    setup();

    const checkbox = screen.getByRole("checkbox", { name: /check this box/i });
    expect(checkbox).toHaveClass("accent-softyellow");
  });
});
