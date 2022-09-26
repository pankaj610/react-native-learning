import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native'
import { Example } from './Example';

afterAll(()=> {

},);

test('examples of some things', async () => {
    const expectedUsername = 'Ada Lovelace'

    render(<Example prop="1"/>)

    fireEvent.changeText(screen.getByTestId("input"), "Pankaj");
    fireEvent.press(screen.getByText("Click here!"))
    const userOutput = await screen.findByTestId('output');
    expect(userOutput)

    // fireEvent.changeText(screen.getByTestId('input'), expectedUsername)
    // fireEvent.press(screen.getByText('Print Username'))

    // // Using `findBy` query to wait for asynchronous operation to finish
    // const usernameOutput = await screen.findByTestId('printed-username')

    // // Using `toHaveTextContent` matcher from `@testing-library/jest-native` package.
    // expect(usernameOutput).toHaveTextContent(expectedUsername)

    // expect(screen.toJSON()).toMatchSnapshot()
})