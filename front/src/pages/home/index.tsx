import "src/pages/home/style.sass";
import { ITransaction, ITransactionsMatrix } from "src/types/transaction";
import React, { FC, useState } from "react";
import { Transaction } from "src/components/transaction";
import axios from "axios";

export const Home: FC = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    console.log(address);
    const { data } = await axios.get<ITransactionsMatrix>(
      `http://localhost:3000/crypto/${address}/balance`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    setTransactions(data.transactions);
    setBalance(data.balance);
  };

  return (
    <>
      <div className="home">
        <div className="container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input type="submit" value="Search" className="submit" />
          </form>
          {transactions[0] && (
            <>
              <div className="balance">Balance: {balance * 0.00000001}BTC</div>
              <div className="transactions">
                {transactions.map((transaction, index) => {
                  return (
                    <Transaction
                      key={`transaction-${index}`}
                      transaction={transaction}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
