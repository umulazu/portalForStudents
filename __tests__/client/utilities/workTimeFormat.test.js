import workTimeFormat from "../../../client/utilities/workTimeFormat";

describe("workTimeFormat utility", () => {
    describe("some cases", () => {
        it("0, 0 => 0:00", () => {
            expect(workTimeFormat(0, 0)).toBe("0:00");
        });
        it("2, 2 => 2:02", () => {
            expect(workTimeFormat(2, 2)).toBe("2:02");
        });
        it("127, 0 => 127:11", () => {
            expect(workTimeFormat(127, 11)).toBe("127:11");
        });

        it("127, 8000099 => ?", () => {
            expect(workTimeFormat(127, 8000099)).toBe("127:99");
        });
    });

    describe.each([[0, 0],[25, 0], [11, 11], [1, 12], [12 ,1]])(
        "regEx matches %i:%i",
        (hours, minutes) => {
            test("return in respective format", () => {
                expect(workTimeFormat(hours, minutes)).toMatch(/\d{1,3}:\d{2}/);
            });
        }
    );
});
