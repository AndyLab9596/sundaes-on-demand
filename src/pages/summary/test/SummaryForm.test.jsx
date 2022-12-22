import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from '@testing-library/user-event';

test('initial conditions', () => {

    render(<SummaryForm />);

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole('button', { name: /confirm order/i });
    expect(button).toBeDisabled();
});

test('checkbox enables button code spec', async () => {
    const user = userEvent.setup();

    render(<SummaryForm />)

    const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
    const button = screen.getByRole('button', { name: /confirm order/i })

    // Checking checkbox enables button
    await user.click(checkbox);
    expect(button).toBeEnabled();

    // Unchecking again disables button
    await user.click(checkbox);
    expect(button).toBeDisabled();

});

test('popover responds to hover', async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
    expect(nullPopover).not.toBeInTheDocument();
    // popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await user.hover(termsAndConditions);
    const popover = screen.getByText(/no ice cream will actually be delivered/i);
    expect(popover).toBeInTheDocument();
    // popover disappears when we mouse out
    await user.unhover(termsAndConditions);
    expect(popover).not.toBeInTheDocument();
});