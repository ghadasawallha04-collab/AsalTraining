import { BaseActions } from "../pages/base_page/BaseActions";
import { SearchActions } from "../pages/search_page/SearchActions";

describe('Booking Search Functionality',() =>{
  const base=new BaseActions();
  const search=new SearchActions(); 
  //Preconditions
  beforeEach(()=>{
    base.openBookingWebsite();
    base.closeSignInPopup();
  });
  //Test
 it('Test 01: Should perform the full search in correct way using static data',()=>{
    const occupancyData={adults:2,children:[5,8],rooms:1}
    const searchOptions={destination:"Paris",checkInDate:"2026-05-10",checkOutDate:"2026-05-15",occupancyData};
    search.setDestination(searchOptions.destination);
    search.setCheckInAndCheckOutDates(searchOptions.checkInDate,searchOptions.checkOutDate);
    search.setOccupancy(searchOptions.occupancyData); 
    search.clickSearch();
  });
});