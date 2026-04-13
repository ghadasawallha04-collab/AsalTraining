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
         const occupancyData={adults:2,children:[5,8],rooms:1}
         const searchOptions={destination:"Paris",checkInDate:"2026-05-10",checkOutDate:"2026-05-15",occupancyData}
        search.setDestination(searchOptions.destination);
        search.setCheckInAndCheckOutDates(searchOptions.checkInDate,searchOptions.checkOutDate);
        search.setOccupancy(searchOptions.occupancyData); 
        search.clickSearch();
    });
    it("Should perform the filtering functionality",()=>{
    });
});