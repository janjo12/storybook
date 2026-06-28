import { screen, userEvent } from "@testing-library/react-native";

const user = userEvent.setup();
await user.press(screen.getByRole("button", { name: "Submit" }));
await user.type(screen.getByPlaceholderText("Enter name"), "Jane");

/*
Include at least 6 tests
Use userEvent from @testing-library/react-native to simulate realistic user interactions
Include tests for:
One component that fetches async data
One synchronous/client-side component
Use at least 4 different query predicates, such as:
getByRole
getByText
getByTestId
getByLabelText
queryByText
findByText (async — resolves as a Promise)
Using userEvent
Import userEvent directly from @testing-library/react-native:

import { render, screen, userEvent } from '@testing-library/react-native';

const user = userEvent.setup();
await user.press(screen.getByRole('button', { name: 'Submit' }));
await user.type(screen.getByPlaceholderText('Enter name'), 'Jane');
For async tests, use findBy* queries — these return a Promise and wait up to 1000ms for a matching element to appear.
*/

