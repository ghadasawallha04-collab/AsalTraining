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
        const searchOptions={destination:"Paris",checkInDate:"2026-05-10",checkOutDate:"2026-05-15",
             occupancyData:{adults:2,children:[5,8],rooms:1}
        };
        search.performSearch(searchOptions); 
    });
    it("Should perform the filtering functionality",()=>{
        const filters={
            [FILTER_NAMES.PROPERTY_TYPE]: ['Apartments'],
            [FILTER_NAMES.PROPERTY_RATING]: ['5 stars'],
            [FILTER_NAMES.BEDROOM_BATHROOM]: {bedrooms: 1,bathrooms: 3}
        };
        filter.applyAllFilters(filters);
});
});