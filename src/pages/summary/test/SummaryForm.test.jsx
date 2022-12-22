import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test('initial conditions', () => {
    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole('button', { name: /confirm order/i });
    expect(button).toBeDisabled();
})

test('checkbox enables button code spec', () => {
    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const button = screen.getByRole('button', { name: /confirm order/i })

    // Checking checkbox enables button
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();

    // Unchecking again disables button
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();

})