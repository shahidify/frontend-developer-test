import React from "react";
import { shallow, mount } from "enzyme";
import { App } from "./App";

describe("<App />", () => {
  let wrapper;
  // const setState = jest.fn();
  // const useStateSpy = jest.spyOn(React, "useState");
  // useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe("render()", () => {
    it("renders the Grid", () => {
      expect(wrapper.find({ "data-testid": "app-grid" })).toHaveLength(1);
    });
  });
  describe("load more", () => {
    it("renders load more button", () => {
      expect(wrapper.find({ "data-testid": "btn-load-more" })).toHaveLength(1);
    });
    it("click renders the Grid", () => {
      const wrapper = mount(<App />);
      expect(
        wrapper.find({ "data-testid": "loading-svg" }).hostNodes().first()
      ).toHaveLength(1);
    });
  });
});
