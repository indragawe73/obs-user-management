import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import UserList from "../components/UserList";

test("renders user list", () => {
  const { getByText } = render(
    <Provider store={store}>
      <UserList onSelectUser={jest.fn()} onEditUSer={jest.fn()} />
    </Provider>,
  );
  const linkElement = getByText(/User Management/i);
  expect(linkElement).toBeInTheDocument();
});
