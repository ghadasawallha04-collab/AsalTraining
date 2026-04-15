import { FilterActions } from "../pages/filter_page/FilterActions";
import { BaseActions } from "../pages/base_page/BaseActions";
import { SearchActions } from "../pages/search_page/SearchActions";
import { FILTER_NAMES } from "../pages/filter_page/FilterConstants";
const base=new BaseActions();
const search=new SearchActions();
const filter=new FilterActions();
describe("Booking Filters functionality",()=>{
    //Preconditions:
    beforeEach(()=>{
        base.openBookingWebsite();
        base.closeSignInPopup();
        search.performSearch();
    });
    it("Should perform the filtering functionality",()=>{
      filter.applyFilters({[FILTER_NAMES.PROPERTY_TYPE]:["Hotels","Apartments"],[FILTER_NAMES.REVIEW_SCORE]:["Wonderful: 9+"],
            [FILTER_NAMES.PROPERTY_RATING]:["5 stars","4 stars"]
        });

    });
});