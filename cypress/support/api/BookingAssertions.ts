import { BookingRequest } from "../../models/BookingRequest";
import { logger } from "../../utils/logger";
export class BookingAssertions{
    static validateBookingData(actual:BookingRequest,expected:BookingRequest):Cypress.Chainable<null>{
        return cy.wrap(null).then(() => {
        const errors:string[]=[];
        logger.step("Validating booking response data");
        if(actual.firstname!==expected.firstname){
            errors.push(`Firstname mismatch | Expected: ${expected.firstname} | Actual: ${actual.firstname}`);
        }
        else{
            logger.success(`Firstname validated successfully | Expected: ${expected.firstname} | Actual: ${actual.firstname}`);
        }
        if(actual.lastname!==expected.lastname){
            errors.push(`Lastname mismatch | Expected: ${expected.lastname} | Actual: ${actual.lastname}`);
        }
        else{
            logger.success(`Lastname validated successfully | Expected: ${expected.lastname} | Actual: ${actual.lastname}`);
        }
        
        if(actual.totalprice!==expected.totalprice){
            errors.push(`TotalPrice mismatch | Expected: ${expected.totalprice} | Actual: ${actual.totalprice}`);
        }
        else{
            logger.success(`TotalPrice validated successfully | Expected: ${expected.totalprice} | Actual: ${actual.totalprice}`);
        }
        if(actual.depositpaid!==expected.depositpaid){
            errors.push(`DepositPaid mismatch | Expected: ${expected.depositpaid} | Actual: ${actual.depositpaid}`);
        }
        else{
            logger.success(`DepositPaid validated successfully | Expected: ${expected.depositpaid} | Actual: ${actual.depositpaid}`);
        }
        if(actual.bookingdates.checkin!==expected.bookingdates.checkin){
            errors.push(`CheckIn mismatch | Expected: ${expected.bookingdates.checkin} | Actual: ${actual.bookingdates.checkin}`);
        }
        else{
            logger.success( `CheckIn validated successfully | Expected: ${expected.bookingdates.checkin} | Actual: ${actual.bookingdates.checkin}`);
        }
        if(actual.bookingdates.checkout!==expected.bookingdates.checkout){
            errors.push(`CheckOut mismatch | Expected: ${expected.bookingdates.checkout} | Actual: ${actual.bookingdates.checkout}`);
        }
        else{
            logger.success(`CheckOut validated successfully | Expected: ${expected.bookingdates.checkout} | Actual: ${actual.bookingdates.checkout}`);
        }
        if(actual.additionalneeds!==expected.additionalneeds){
            errors.push(`AdditionalNeeds mismatch | Expected: ${expected.additionalneeds} | Actual: ${actual.additionalneeds}`);
        }
        else{
            logger.success(`AdditionalNeeds validated successfully | Expected: ${expected.additionalneeds} | Actual: ${actual.additionalneeds}`);
        }
        if(errors.length>0){
             const errorMessage=`Booking validation failed (${errors.length} errors):\n\n${errors.join("\n")}`;
             logger.error(errorMessage);
            throw new Error(errorMessage);

        }
        logger.success("Booking validation completed successfully with 0 errors");
        return;
    });
}
}