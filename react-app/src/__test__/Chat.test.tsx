import React from 'react';
import { render, cleanup, waitForElement, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from '../Chat';
import { FetchMock } from 'jest-fetch-mock';

afterEach(cleanup);

beforeEach(() => {
    (fetch as FetchMock).resetMocks()
})
  
const messageMock = {
    picURL: 'http://www.example.com/cat.png',
    fromUser: 'Cat',
    timestamp: 100,
    text: 'This is cat talking'
};

it("matches snapshot", () => {
  const { asFragment } = render(<Chat />);
  expect(asFragment()).toMatchSnapshot();
});

it('displays no messages initially', () => {
    (fetch as FetchMock).mockResponseOnce(JSON.stringify([]));
    const { queryByTestId } = render(<Chat />);
    const messageBubble = queryByTestId('MessageBubble');
    expect(messageBubble).toBeNull();
});

it('displays one message', async () => {
    (fetch as FetchMock).mockResponse(JSON.stringify([messageMock]))

    const { getByTestId } = render(<Chat />);
    const firstMessage = await waitForElement(() =>
        getByTestId('MessageBubble')
    );
    expect(firstMessage.children.length).toBeGreaterThan(0);

    const picture = within(firstMessage).getByTestId('userPic') as HTMLImageElement;
    expect(picture.src).toBe(messageMock.picURL);
    expect(within(firstMessage).getByTestId('timeStamp').textContent).toBe('10:00 am');
    expect(within(firstMessage).getByTestId('message').textContent).toBe(messageMock.text);
});