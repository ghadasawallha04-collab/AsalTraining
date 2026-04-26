import { BaseActions } from "../pages/base_page/BaseActions";
import { FilterActions } from "../pages/filter_page/FilterActions";
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
 it('Should Perform Search',()=>{
  const searchOptions={destination:"Rosewood",checkInDate:"2026-05-10",checkOutDate:"2026-05-15",
    occupancyData:{adults:2,children:[5,8],rooms:1}
  };
  search.performSearch(searchOptions);
  search.searchInfoAssertFirstCard(searchOptions.destination,searchOptions.checkInDate,searchOptions.checkOutDate,
    searchOptions.occupancyData.adults,searchOptions.occupancyData.children.length);
});
});