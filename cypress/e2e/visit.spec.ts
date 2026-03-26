import { searchGenericFunctions } from '../pages/actions/searchGenericFunctions';
describe('Booking Search Functionality',() => {
  const search=new searchGenericFunctions();
  it('Should perform the full search in correct way',()=>{
    search.openWebsite();
    search.alertHandle();
    search.enterDestination("Paris");
    search.selectDates('2026-04-10','2026-04-15');
    search.openGuests();
    search.clickSearch();
  });
});