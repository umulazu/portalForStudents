import { init, tableLoad, tableClose } from "../../../../client/components/WorkdaysContainer/actions";
import reducer from "../../../../client/components/WorkdaysContainer/reducer";

describe('StatusTeble reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
                workdays: []
        })
    });

    // it('should handle ADD_TODO', () => {
    //     expect(
    //         reducer([], {
    //             type: types.ADD_TODO,
    //             text: 'Run the tests'
    //         })
    //     ).toEqual([
    //         {
    //             text: 'Run the tests',
    //             completed: false,
    //             id: 0
    //         }
    //     ])
    //
    //     expect(
    //         reducer(
    //             [
    //                 {
    //                     text: 'Use Redux',
    //                     completed: false,
    //                     id: 0
    //                 }
    //             ],
    //             {
    //                 type: types.ADD_TODO,
    //                 text: 'Run the tests'
    //             }
    //         )
    //     ).toEqual([
    //         {
    //             text: 'Run the tests',
    //             completed: false,
    //             id: 1
    //         },
    //         {
    //             text: 'Use Redux',
    //             completed: false,
    //             id: 0
    //         }
    //     ])
    // })
});