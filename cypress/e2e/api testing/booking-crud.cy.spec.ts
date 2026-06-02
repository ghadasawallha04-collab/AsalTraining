import { BookingApi }from "../../support/api/BookingApi";
import { BookingDataGenerator }from "../../models/BookingDataGenerator";
import { BookingAssertions } from "../../support/assertions/BookingAssertions";
import { StatusCodes } from "../../support/constants/StatusCodes";
import { logger } from "../../utils/logger";
describe("Booking CRUD API",()=>{
    const bookingApi=new BookingApi();
    let bookingId:number;
    let token:string; 
    const createBookingBody=BookingDataGenerator.createBooking();
    const updateBookingBody=BookingDataGenerator.createBooking();
    it("Should Create Booking",()=>{
        bookingApi.createBooking(createBookingBody).then((response)=>{
            logger.info("Verifying status code should be OK");
            expect(response.status).to.eq(StatusCodes.OK);
            bookingId=response.body.bookingid;
            BookingAssertions.validateBookingData(response.body.booking,createBookingBody);
        });
    });
    it("Should Get Booking",()=>{
        bookingApi.getBooking(bookingId).then((response)=>{
            logger.info("Verifying status code should be OK");
            expect(response.status).to.eq(StatusCodes.OK);
            BookingAssertions.validateBookingData(response.body,createBookingBody);
        });
    });
    it("Should Generate Token",() => {
        bookingApi.generateToken().then((response)=>{
            logger.info("Verifying status code should be OK");
            expect(response.status).to.eq(StatusCodes.OK);
            token=response.body.token;
        });
    });
    it("Should Update Booking",()=>{
        bookingApi.updateBooking(bookingId,updateBookingBody,token).then((response)=>{
            logger.info("Verifying status code should be OK");
            expect(response.status).to.eq(StatusCodes.OK);
            BookingAssertions.validateBookingData(response.body,updateBookingBody);
        });
    });
    it("Should Delete Booking",()=>{
        bookingApi.deleteBooking(bookingId,token).then((response)=>{
            logger.info("Verifying status code should be CREATED");
            expect(response.status).to.eq(StatusCodes.CREATED);
        });
    });
    it("Should Not Retrieve Deleted Booking",()=>{
        bookingApi.verifyDeletedBooking(bookingId).then((response)=>{
        logger.info("Verifying status code should be NOT FOUND");
        expect(response.status).to.eq(StatusCodes.NOT_FOUND);
        });
    });
    });