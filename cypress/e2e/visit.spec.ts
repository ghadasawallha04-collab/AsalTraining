import { BaseActions } from "../pages/base_page/BaseActions";
import { SearchActions } from "../pages/search_page/SearchActions";
import { SearchValidations } from "../pages/search_page/SearchValidation";
describe('Booking Search Functionality',() =>{
  const base=new BaseActions();
  const search=new SearchActions(); 
  const verify=new SearchValidations();
  //Preconditions
  beforeEach(()=>{
    base.openBookingWebsite();
    base.closeSignInPopup();
  });
  //Test
 it('Should Perform Search',()=>{
  const searchOptions={destination:"Rosewood",checkInDate:"2026-05-10",checkOutDate:"2026-05-15",
    occupancyData:{adults:2,children:[],rooms:1}
  };
  search.performSearch(searchOptions);
  verify.verifyCardSearchDetails(searchOptions);
});
});