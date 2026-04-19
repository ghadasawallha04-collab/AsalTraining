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
        search.performSearch(); //Adding array to pass
    });
    it("Should perform the filtering functionality",()=>{
        /*filter.setRooms("Bathrooms",3)
        filter.setRooms("Bedrooms",1)*/
        const filters={
            [FILTER_NAMES.PROPERTY_TYPE]: ['Apartments'],
            [FILTER_NAMES.PROPERTY_RATING]: ['5 stars'],
            [FILTER_NAMES.BEDROOM_BATHROOM]: {bedrooms: 1,bathrooms: 3}
        };
        filter.applyAllFilters(filters);
});
});