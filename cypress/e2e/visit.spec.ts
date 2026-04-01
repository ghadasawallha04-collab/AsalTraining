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
  });
});