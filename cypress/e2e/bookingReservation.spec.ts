import { BaseActions } from "../pages/base_page/BaseActions";
import { HotelActions } from "../pages/hotel_page/HotelActions";
import { SearchActions } from "../pages/search_page/SearchActions";
import { SearchValidations } from "../pages/search_page/SearchValidation";
describe('Booking reservation flow',() =>{
  const base=new BaseActions();
  const search=new SearchActions(); 
  const verify=new SearchValidations();
  const hotel=new HotelActions();
  //Preconditions
  beforeEach(()=>{
    base.openBookingWebsite();
    base.closeSignInPopup();
  });
 it('Should search validate hotel and perform booking flow',()=>{
  const searchOptions={destination:"San Hotel",checkInDate:"2026-06-20",checkOutDate:"2026-06-22",
    occupancyData:{adults:2,children:[3,15],rooms:1}
  };
  const RoomData={roomType:"Standard Double Room",guests:3,rateOptions:[]}
  search.performSearch(searchOptions);
  verify.verifyCardSearchDetails(searchOptions);
  hotel.openFirstProperty();
  hotel.findRoom(RoomData);
});
});