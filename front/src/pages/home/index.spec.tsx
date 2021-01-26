import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { ITransaction } from "src/types/transaction";
import { Home } from ".";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import { render } from "@testing-library/react";

configure({ adapter: new Adapter() });
describe("src/pages/home/index.tsx", () => {
  it("Render Home page", async () => {
    const renderedHome = render(
      <Router>
        <Home />
      </Router>,
    );

    expect(renderedHome.container).toMatchSnapshot();
  });

  it("should pass a selected value to the onChange function", () => {
    const component = shallow(<Home />);
    component
      .find("input")
      .at(0)
      .simulate("change", {
        target: {
          value: "Change function",
        },
      });

    expect(component).toMatchSnapshot();
  });

  it("should add an item based on the value in the state", () => {
    const component = shallow(<Home />);
    const preventDefault = jest.fn();
    // component.setState({
    //   address: "ok",
    // });
    axios.get = jest.fn().mockResolvedValue({
      data: {
        balance: 0,
        transactions: [
          {
            hash: "hash",
            amount: 1,
            time: 123,
          },
          {
            hash: "hash",
            amount: -1,
            time: 123,
          },
        ],
      },
    });
    component.find("form").simulate("submit", { preventDefault });
    expect(component).toMatchSnapshot();
    expect(preventDefault).toBeCalled();
  });
});
