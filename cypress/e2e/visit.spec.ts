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
 it('Should Perform Search',()=>{
  search.performSearch();
  });
});