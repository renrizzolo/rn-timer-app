/**
 * @format
 */

import 'react-native';
import React from 'react';
import NumberPad from '../src/components/NumberPad';
import Root from '../src/components/Root'
import {fireEvent, render, wait, getByLabelText} from '@testing-library/react-native';

const numberPadProps = {
  form: {},
  setForm: jest.fn(() => {}),
};

test('it renders input time correctly', async () => {
  const {getByTestId, getByText, queryByTestId, getByLabelText, baseElement} = render(
    <Root>
      <NumberPad  {...numberPadProps}/>
    </Root>,
  );
  const btn1 = getByText('1');
  const btn3 = getByText('3');
  const btn7 = getByText('7');

  fireEvent.press(btn1)
  fireEvent.press(btn3)
  fireEvent.press(btn3)
  fireEvent.press(btn7)


  // wait for appearance
  await wait(() => expect(getByLabelText('Time')).toBeTruthy());
  // check the text
  expect(getByLabelText('Time').props.children).toBe('00:13:37');

});

test('it resets input time correctly', async () => {
  const {getByTestId, getByText, getByLabelText, queryByTestId, baseElement} = render(
    <Root>
      <NumberPad {...numberPadProps} />
    </Root>,
  );
  const btn1 = getByText('1');
  const btn3 = getByText('3');
  const btn7 = getByText('7');
  const reset = getByText('reset');

  fireEvent.press(btn1);
  fireEvent.press(btn3);
  fireEvent.press(btn3);
  fireEvent.press(btn7);
  fireEvent.press(reset);

  // wait for appearance
  await wait(() => expect(getByLabelText('Time')).toBeTruthy());
  // check the text
  expect(getByLabelText('Time').props.children).toBe('00:00:00');
});

test('it allows changing of time units threshold', async () => {
  const {
    getByTestId,
    getByText,
    getByLabelText,
    queryByTestId,
    baseElement,
  } = render(
    <Root>
      <NumberPad {...numberPadProps} settings={{length: 4}} />
    </Root>,
  );
  const btn1 = getByText('1');
  const btn3 = getByText('3');
  const btn7 = getByText('7');
  const reset = getByText('reset');

  fireEvent.press(btn1);
  fireEvent.press(btn3);
  fireEvent.press(btn3);
  fireEvent.press(btn7);
  fireEvent.press(reset);

  // wait for appearance
  await wait(() => expect(getByLabelText('Time')).toBeTruthy());
  // check the text
  expect(getByLabelText('Time').props.children).toBe('13:37');
});
