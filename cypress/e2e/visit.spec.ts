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
 it('Should perform the full search in correct way',()=>{
    search.chooseRandomDestination();
    search.selectCheckInAndCheckOutDates();
    search.setOccupancy();
    search.clickSearch();
  });
});