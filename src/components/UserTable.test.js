import React from "react";
import { mount } from "enzyme";
import UserTable from "./UserTable";
import { testUsersData } from "../testData";

describe('<UserTable >', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<UserTable data={testUsersData.data} />);
  });

  describe('render()', () => {
    it('renders table rows', () => {
      expect(wrapper.find({ 'data-testid': 'table-row' }).hostNodes()).toHaveLength(3);
    });

    it('Row contains all fields ', () => {
      expect(wrapper.find({ 'data-testid': 'cell-id' }).hostNodes().first().text()).toEqual('e28d290a-a2f2-48c2-9001-ff43884e271b');
      expect(wrapper.find({ 'data-testid': 'cell-date' }).hostNodes().first().text()).toEqual('2020-02-13');
      expect(wrapper.find({ 'data-testid': 'cell-oldvalue' }).hostNodes().first().text()).toEqual('John');
      expect(wrapper.find({ 'data-testid': 'cell-newvalue' }).hostNodes().first().text()).toEqual('Bruce');
    });

    it('date click applies sorting ', () => {
      expect(wrapper.find({ 'data-testid': 'cell-date' }).hostNodes().first().text()).toEqual('2020-02-13');
      expect(wrapper.find({ 'data-testid': 'cell-date' }).hostNodes().last().text()).toEqual('2020-02-15');
      wrapper.find({ 'data-testid': 'header-sort' }).hostNodes().first().simulate("click");
      expect(wrapper.find({ 'data-testid': 'cell-date' }).hostNodes().first().text()).toEqual('2020-02-15');
      expect(wrapper.find({ 'data-testid': 'cell-date' }).hostNodes().last().text()).toEqual('2020-02-13');
    });

  });

  // describe("sortListData", () => {
  //   it("should sort the table data by date", () => {
  //     const sortedListData = sortListData(data, true);
  //     const isDecending = sortedListData.every((data, index) => {
  //       return (
  //         index === 0 || data.timestamp <= sortedListData[index - 1].timestamp
  //       );
  //     });
  //     expect(isDecending).toBeTruthy();
  //   });
  // });
  // describe("sortListData", () => {
  //   it("should sort the table data by date", () => {
  //     const sortedListData = instance.sortListData();
  //     const isAsc = sortedListData.every((data, index) => {
  //       return (
  //         index === 0 || data.timestamp <= sortedListData[index - 1].timestamp
  //       );
  //     });
  //     console.log(isAsc);
  //     expect(isAsc).toBeTruthy();
  //   });

  //   it("should sort the table data by date according to users preference", () => {
  //     instance.state.isAsc = true;
  //     const sortedListData = instance.sortListData();
  //     const isAsc = sortedListData.every((data, index) => {
  //       return (
  //         index === 0 || data.timestamp >= sortedListData[index - 1].timestamp
  //       );
  //     });
  //     expect(isAsc).toBeTruthy();
  //   });
  // });

});
// describe("<UserTable />", () => {
//   let wrapper;
//   let instance;
//   const data= [
//     {
//       id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
//       timestamp: 1581631200000,
//       diff: [
//         {
//           field: "name",
//           oldValue: "John",
//           newValue: "Bruce",
//         },
//       ],
//     },
//   ];
//   // beforeEach(() => {
//   //   console.log(data);
//   //   wrapper = shallow(<UserTable data={ data } />);
//   //   instance = wrapper.instance();
//   //   console.log(wrapper);
//   // });

//   describe("render()", () => {
//     //console.log(wrapper);
//     it('renders list-rows', () => {
//       const wrapper = shallow(<UserTable data={data} />);
//       console.log(wrapper);
//       // Expect the wrapper object to be defined
//       expect(wrapper.find('.table-row')).toBeDefined();
//       //expect(wrapper.find({ "data-testid": "table-row" })).toHaveLength(1);
//     });

//     it("should render the table", () => {
//       expect(wrapper.find({ "data-testid": "table" })).toHaveLength(
//         1
//       );
//     });
//     it("should render table rows from data", () => {
//       expect(wrapper.find({ "data-testid": "table-row" })).toHaveLength(3);
//     });
//   });



//   // describe("sortDate", () => {
//   //   it("should switch state of sorting", () => {
//   //     expect(instance.state.chronological).toBeFalsy();
//   //     instance.sortDate();
//   //     expect(instance.state.chronological).toBeTruthy();
//   //   });
//   // });
// });