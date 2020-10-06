import React from "react";
import { shallow, mount } from "enzyme";
import { App } from "./App";

/*
Note: Due to my time limitation, I could not write as many test
for App comnponent as I'd have liked.
I also got into an issue of Enzyme supporting React Hooks' State.
I feel I should have used `testing-library` by KCD as 
it provides easier state manipulation for tests.
*/

// TODO: Use 'testing-library' by Kent C Dodds instead of Enzyme for Hooks

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
