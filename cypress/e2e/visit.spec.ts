import { BaseActions } from "../Pages/BasePage/BaseActions";
import { SearchActions } from "../Pages/SearchPage/SearchActions";
describe('Booking Search Functionality',() =>{
  const base=new BaseActions();
  const search=new SearchActions(); 
  //Preconditions:
  beforeEach(()=>{
    base.openWebsite();
    base.alertHandle();
  });
 it('Should perform the full search in correct way',()=>{
    search.ChooseRandomDestination();
    search.selectDates();
    search.setOccupancy();
    search.clickSearch();


    // set guests
    /*search.openGuests();
    search.setOccupancy({
      adults: 3,
      children: [{ age: 5 }, { age: 8 }],
      rooms: 2
    });
    */

  });
});