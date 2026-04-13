import { FiltersActions } from "../pages/filter_page/FilterActions";
import { BaseActions } from "../pages/base_page/BaseActions";
import { SearchActions } from "../pages/search_page/SearchActions";
const base=new BaseActions();
const search=new SearchActions();
const filter=new FiltersActions();
describe("Booking Filters functionality",()=>{
    //Preconditions:
    beforeEach(()=>{
        base.openBookingWebsite();
        base.closeSignInPopup();
        search.performSearch();

    });
    it("Should perform the filtering functionality",()=>{
        cy.log("Hello world")
    });
});