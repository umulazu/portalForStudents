import getClassnames from "../../../client/utilities/getClassnames";

describe("getClassNames utility", () => {
    describe("some cases", () => {
        it("empty args", () => {
            expect(getClassnames({})).toBe("");
        });

        it("excluded: class1;", () => {
            expect(getClassnames({
                "class1": false,
            })).toBe("");
        });

        it("included: class1;", () => {
            expect(getClassnames({
                "class1": true,
            })).toBe("class1 ");
        });

        it("included: class1, class3; excluded: class2;", () => {
            expect(getClassnames({
                "class1": true,
                "class2": false,
                "class3": true
            })).toBe("class1 class3 ");
        });

        it("included: class1 class2 class3;", () => {
            expect(getClassnames({
                "class1": true,
                "class2": true,
                "class3": true
            })).toBe("class1 class2 class3 ");
        });
    });
});