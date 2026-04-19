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
        const filtersArray=[
            {name:FILTER_NAMES.PROPERTY_TYPE,value:['Apartments'] },
            {name:FILTER_NAMES.PROPERTY_RATING,value: ['5 stars'] },
            {name: FILTER_NAMES.BEDROOM_BATHROOM,value:{bedrooms:2,bathrooms:1}}
        ];
        filter.applyFiltersArray(filtersArray);
});
});