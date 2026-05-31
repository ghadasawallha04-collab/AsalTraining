import { BaseActions } from "../pages/base_page/BaseActions";
import { SearchActions } from "../pages/search_page/SearchActions";
import { FilterActions } from "../pages/filter_page/FilterActions";
import { SearchValidations } from "../pages/search_page/SearchValidation";
import { FilterValidations } from "../pages/filter_page/FilterValidation";
import { FILTER_NAMES } from "../pages/filter_page/FilterConstants";
import searchTestData from "../fixtures/searchData.json";
describe('Search Functionality Sanity Tests',() =>{
  const base=new BaseActions();
  const search=new SearchActions();
  const filter=new FilterActions();
  const verifyForSearch=new SearchValidations();
  const verifyAfterApplyFilters=new FilterValidations();
  //Preconditions
  beforeEach(()=>{
    base.openBookingWebsite();
    base.closeSignInPopup();
  });
  searchTestData.forEach((searchOptions)=>{
    it(`Should search successfully for ${searchOptions.destination}`,()=>{
      search.performSearch(searchOptions);
      verifyForSearch.assertNightsAndOccupancy(searchOptions.checkInDate,searchOptions.checkOutDate,searchOptions.occupancyData.adults,
        searchOptions.occupancyData.children.length);
    });
  });
 it("Should show validation when perform search and destination is empty",()=>{
    cy.contains("Check-in date").click();// cy contains: make it in a separate function
    search.setCheckInAndCheckOutDates("2026-06-22","2026-06-24");
    search.setOccupancy({
        adults:2,
        children:[14,3],
        rooms:1
    });
    search.clickSearch();
    cy.contains("Enter a destination").should('be.visible');
  });
  it("Should perform a new search after modifying search criteria",()=>{
    const searchOptions1={destination:"Rosewood",checkInDate:"2026-06-22",checkOutDate:"2026-06-24",
    occupancyData:{adults:2,children:[14,3],rooms:1}};
    search.performSearch(searchOptions1);
    searchOptions1.destination="Capella Bangkok";
    search.setDestination(searchOptions1.destination);
    search.clickSearch();
    verifyForSearch.verifyCardSearchDetails(searchOptions1);
  })
  it("Should search and apply single filter successfully",()=>{
    const searchOptions={destination:"Rosewood",checkInDate:"2026-06-22",checkOutDate:"2026-06-24",
    occupancyData:{adults:3,children:[14,3],rooms:2}};
    search.performSearch(searchOptions);
    verifyForSearch.verifyCardSearchDetails(searchOptions);
    const filters={[FILTER_NAMES.PROPERTY_RATING]:['5 stars']};
    filter.applyAllFilters(filters);
    verifyForSearch.verifyCardSearchDetails(searchOptions);
    verifyAfterApplyFilters.validateCardFilters(filters);
  })
  it("Should search and apply multiple filters successfully",()=>{
    const searchOptions={destination:"Rosewood",checkInDate:"2026-06-22",checkOutDate:"2026-06-24",
    occupancyData:{adults:3,children:[14,3],rooms:2}};
    search.performSearch(searchOptions);
    verifyForSearch.verifyCardSearchDetails(searchOptions);
    const filters={[FILTER_NAMES.PROPERTY_RATING]:['5 stars'],
      [FILTER_NAMES.REVIEW_SCORE]:['Wonderful: 9+'],
    };
    filter.applyAllFilters(filters);
    verifyForSearch.verifyCardSearchDetails(searchOptions);
    verifyAfterApplyFilters.validateCardFilters(filters);
  })
});