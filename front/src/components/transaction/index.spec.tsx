import React from "react";
import { Transaction } from ".";
import { render } from "@testing-library/react";

describe("src/components/transaction/index.tsx", () => {
  test("Render Transaction component", () => {
    const transaction = {
      hash: "hash",
      amount: 0,
      time: 1234,
    };

    const renderedTransaction = render(
      <Transaction transaction={transaction} />,
    );
    expect(renderedTransaction.container).toMatchSnapshot();
  });
  test("Render Transaction component", () => {
    const transaction = {
      hash: "hash",
      amount: -90,
      time: 1234,
    };

    const renderedTransaction = render(
      <Transaction transaction={transaction} />,
    );
    expect(renderedTransaction.container).toMatchSnapshot();
  });
});
