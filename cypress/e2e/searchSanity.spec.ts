import { BaseActions } from "../pages/base_page/BaseActions";
import { SearchActions } from "../pages/search_page/SearchActions";
import { SearchValidations } from "../pages/search_page/SearchValidation";
import searchTestData from "../fixtures/searchData.json";
describe('Search Functionality Sanity Tests',() =>{
  const base=new BaseActions();
  const search=new SearchActions();
  const verify=new SearchValidations();
  //Preconditions
  beforeEach(()=>{
    base.openBookingWebsite();
    base.closeSignInPopup();
  });
  searchTestData.forEach((searchOptions)=>{
    it(`Should search successfully for ${searchOptions.destination}`,()=>{
      search.performSearch(searchOptions);
    });
  });
  it("Should show validation when perform search and destination is empty",()=>{
    cy.contains("Check-in date").click();
    search.setCheckInAndCheckOutDates("2026-06-22","2026-06-24");
    search.setOccupancy({
        adults:2,
        children:[14,3],
        rooms:1
    });
    search.clickSearch();
    cy.contains("Enter a destination").should('be.visible');
  });
  //The three tests bellow are not read yet
  it("Should prevent selecting past dates when perform search",()=>{
    const searchOptions={destination:"Rosewood",checkInDate:"2026-05-15",checkOutDate:"2026-05-20",
    occupancyData:{adults:2,children:[14,3],rooms:1}};
    search.performSearch(searchOptions);
    //Add assertion
  });
  it("Should prevent select a check-out date earlier than the check-in date when perform search",()=>{
    const searchOptions={destination:"Rosewood",checkInDate:"2026-06-24",checkOutDate:"2026-06-22",
    occupancyData:{adults:2,children:[14,3],rooms:1}};
    search.performSearch(searchOptions);
    //Add assertion
  });
  it("Should perform a new search after modifying search criteria",()=>{
    const searchOptions1={destination:"Rosewood",checkInDate:"2026-06-22",checkOutDate:"2026-06-24",
    occupancyData:{adults:2,children:[14,3],rooms:1}};
    const searchOptions2={destination:"London",checkInDate:"2026-06-22",checkOutDate:"2026-06-24",
    occupancyData:{adults:2,children:[14,3],rooms:1}};
    search.performSearch(searchOptions2);
    //Add assertion
  })
});