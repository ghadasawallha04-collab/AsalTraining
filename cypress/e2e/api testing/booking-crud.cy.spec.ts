import { BookingApi } from "../../support/api/BookingApi";
import { BookingDataGenerator } from "../../models/BookingDataGenerator";
import { BookingAssertions } from "../../support/api/BookingAssertions";
import { BookingRequest } from "../../models/BookingRequest";
describe("Booking CRUD API",()=>{
    const bookingApi=new BookingApi();
    let bookingId:number;
    let token:string;
    const createBookingBody:BookingRequest=BookingDataGenerator.generateBookingPayload();
    const updateBookingBody: BookingRequest=BookingDataGenerator.generateBookingPayload();
    it("Should Create, Get, Update and Delete Booking",()=>{
        //Create a new booking
        bookingApi.createBooking(createBookingBody).then((bookingResponse)=>{
            bookingId=bookingResponse.bookingid;
            BookingAssertions.validateBookingData(bookingResponse.booking,createBookingBody);
            //Get booking details by ID
            return bookingApi.getBookingById(bookingId);
        }).then((booking)=>{
            BookingAssertions.validateBookingData(booking,createBookingBody);
            //Generate authentication token
            return bookingApi.generateToken();
        }).then((generatedToken)=>{
            token=generatedToken;
            //Update booking with new data
            return bookingApi.updateBooking(bookingId,updateBookingBody,token);
        }).then((updatedBooking)=>{
            BookingAssertions.validateBookingData(updatedBooking,updateBookingBody);
            //Delete the booking
            return bookingApi.deleteBooking(bookingId,token);
        }).then(()=>{
            //Verify booking was deleted successfully
            return bookingApi.verifyDeletedBooking(bookingId);
        });
    });
});