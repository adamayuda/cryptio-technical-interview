import "src/components/transaction/style.sass";

import React, { FC } from "react";
import { ITransaction } from "src/types/transaction";
import Moment from "react-moment";
import PropTypes from "prop-types";

interface ITransactionProps {
  transaction: ITransaction;
}

export const Transaction: FC<ITransactionProps> = ({ transaction }) => {
  return (
    <div className="transaction">
      <div className="header">
        <h3>{transaction.hash}</h3>
        <div className={`amount ${transaction.amount < 0 ? "red" : "green"}`}>
          {transaction.amount * 0.00000001}
        </div>
      </div>
      <div className="date">
        <Moment format="YYYY/MM/DD hh:mm">{transaction.time * 1000}</Moment>
      </div>
    </div>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.any,
};
