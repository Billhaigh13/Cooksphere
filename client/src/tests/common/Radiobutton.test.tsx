import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Radiobutton } from "./../../components/common/Radiobutton";

describe("Radiobutton Component", () => {
  const setup = (props: Partial<React.ComponentProps<typeof Radiobutton>> = {}) => {
    const defaultProps = {
      id: "test-radio",
      name: "test-group",
      value: "radio-value",
      text: "Select this option",
      handleChange: vi.fn(),
      ...props,
    };

    return render(<Radiobutton {...defaultProps} />);
  };

  test("should render the component with given props", () => {
    setup();

    expect(screen.getByLabelText(/select this option/i)).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: /select this option/i })).not.toBeChecked();
  });

  test("should call handleChange when the radio button is clicked", () => {
    const handleChange = vi.fn();
    setup({ handleChange });

    const radio = screen.getByRole("radio", { name: /select this option/i });
    fireEvent.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({
        checked: true,
      }),
    }));
  });

  test("should apply the correct class to the radio button", () => {
    setup();

    const radio = screen.getByRole("radio", { name: /select this option/i });
    expect(radio).toHaveClass("accent-softyellow");
  });
});