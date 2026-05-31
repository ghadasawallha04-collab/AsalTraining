import { BookingApi } from "../../support/api/BookingApi";
import { createBookingBody,updateBookingBody } from "../../models/BookingRequest";
describe("Booking Api testing",()=>{
    const bookingApi=new BookingApi();
    let bookingId:number;
    let firstName:string;
    let lastName:string;
    let token:string;
    it("Should create update and delete booking",()=>{
        bookingApi.createBooking(createBookingBody).then((response)=>{
        expect(response.status).to.eq(200);
        bookingId=response.body.bookingid;
        firstName=response.body.booking.firstname;
        lastName=response.body.booking.lastname;
        expect(response.body.booking.firstname).to.eq(createBookingBody.firstname);
        expect(response.body.booking.lastname).to.eq(createBookingBody.lastname);
        expect(response.body.booking.totalprice).to.eq(createBookingBody.totalprice);
    
    bookingApi.getBooking(bookingId).then((response)=>{
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(firstName);
        expect(response.body.lastname).to.eq(lastName);
    });

});
});
});