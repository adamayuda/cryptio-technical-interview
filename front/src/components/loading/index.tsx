import "src/components/loading/style.sass";

import React, { FC } from "react";

import logo from "src/assets/png/cryptio.png";

export const Loading: FC = () => {
  return (
    <div className="loading">
      <img src={logo} alt="cryptio" />
    </div>
  );
};
