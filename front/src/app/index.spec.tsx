import { cleanup, render } from "@testing-library/react";

import { App } from ".";
import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

global.fetch = jest.fn();

describe("src/app/index.tsx", () => {
  afterEach(() => cleanup());
  beforeEach(() => {
    global.fetch.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolve({
            json: () =>
              new Promise((resolve) =>
                resolve({
                  picture: "Post litle",
                  username: "Post Boby",
                }),
              ),
          });
        }),
    );
  });

  test("Render App page", async () => {
    const renderedApp = render(
      <Router>
        <App />
      </Router>,
    );

    expect(renderedApp.container).toMatchSnapshot();
  });

  test("Render App page with laptop device", async () => {
    const renderedApp = render(
      <Router>
        <App />
      </Router>,
    );

    expect(renderedApp.container).toMatchSnapshot();
  });
});
