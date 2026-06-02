import { BookingRequest } from "../models/BookingRequest";
import { logger } from "../utils/logger";
export class BookingAssertions{
    static validateBookingData(actual:BookingRequest,expected:BookingRequest){
        const errors:string[]=[];
        logger.step("Validating booking response data");
        if(actual.firstname!==expected.firstname){
            errors.push("Firstname mismatch");
        }
        else{
            logger.success(`Firstname validated successfully: ${actual.firstname}`);
        }
        if(actual.lastname!==expected.lastname){
            errors.push("Lastname mismatch");
        }
        else{
            logger.success(`Lastname validated successfully: ${actual.lastname}`);
        }
        
        if(actual.totalprice!==expected.totalprice){
            errors.push("Totalprice mismatch");
        }
        else{
            logger.success(`Totalprice validated successfully: ${actual.totalprice}`);
        }
        if(actual.depositpaid!==expected.depositpaid){
            errors.push(`DepositPaid mismatch`);
        }
        else{
            logger.success(`DepositPaid validated successfully: ${actual.depositpaid}`);
        }
        if(actual.bookingdates.checkin!==expected.bookingdates.checkin){
            errors.push("CheckIn mismatch");
        }
        else{
            logger.success(`CheckIn validated successfully: ${actual.bookingdates.checkin}`);
        }
        if(actual.bookingdates.checkout!==expected.bookingdates.checkout){
            errors.push("checkout mismatch");
        }
        else{
            logger.success(`CheckOut validated successfully: ${actual.bookingdates.checkout}`);
        }
        if(actual.additionalneeds!==expected.additionalneeds){
            errors.push("AdditionalNeeds mismatch");
        }
        else{
            logger.success(`AdditionalNeeds validated successfully: ${actual.additionalneeds}`);
        }
        if(errors.length>0){
            logger.error(`Booking validation failed:\n${errors.join("\n")}`);
        }
        logger.info(`Validation errors count: ${errors.length}`);
        expect(errors,errors.join("\n")).to.be.empty;
    } 
    
}