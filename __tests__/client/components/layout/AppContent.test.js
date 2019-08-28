import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AppContent } from "../../../../client/components/layout/AppContent";

Enzyme.configure({ adapter: new Adapter() });

describe("AppContent", () => {
    describe("checking props", () => {
        it("should render if authorized", () => {
            const component = shallow(<AppContent authorized={true} />);

            expect(component.exists("[data-test-component='AppContent']"))
                .toBe(true);
        });

        it("should not render if not authorized", () => {
            const component = shallow(<AppContent authorized={false} />);

            expect(component.exists("[data-test-component='AppContent']"))
                .toBe(false);
        });
    });
});