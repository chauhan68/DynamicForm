import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Checkbox from './Components/Checkbox/Checkbox';

test('renders label and submit button', () => {
  render(<App />);
  const firstName = screen.getByLabelText('first Name(required)');
  expect(firstName).toBeVisible();

  const submit = screen.getByText('Submit');
  expect(submit).toBeVisible();
});


test('renders checbox and selecting works as expected', () => {
  const checboxLabel = "Checkbox Label";
  render(
    <Checkbox
        value="Test"
        uid="TestId"
        label={checboxLabel}
        isRequired={false}
    />);
  const label = screen.getByLabelText(checboxLabel);
  expect(label).toBeVisible();
  userEvent.click(label);
  expect(label).toBeChecked();
  userEvent.click(label);
  expect(label).not.toBeChecked();
});
