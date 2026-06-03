import { BookingRequest } from "../../models/BookingRequest";
import { logger } from "../../utils/logger";
export class BookingApi{
    private baseUrl="https://restful-booker.herokuapp.com";
    /**
     * Creates a new booking.
     * @param body Booking request payload.
     */
    createBooking(body:BookingRequest){
        logger.step(`Creating booking for ${body.firstname} ${body.lastname}`);
        return cy.request({
            method:"POST",
            url:`${this.baseUrl}/booking`,
            body
        }).then((response)=>{
            logger.success(`Booking created successfully with ID ${response.body.bookingid}`);
            const booking=response.body.booking;
            logger.info(`Firstname: ${booking.firstname}`);
            logger.info(`Lastname: ${booking.lastname}`);
            logger.info(`Total Price: ${booking.totalprice}`);
            logger.info(`Deposit Paid: ${booking.depositpaid}`);
            logger.info(`Check-In: ${booking.bookingdates.checkin}`);
            logger.info(`Check-Out: ${booking.bookingdates.checkout}`);
            logger.info(`Additional Needs: ${booking.additionalneeds}`);
            return response;
        });
    }
    /**
     * Retrieves booking details by booking ID.
     * @param bookingId Booking identifier.
     */
    getBooking(bookingId: number){
        logger.step(`Getting booking with ID ${bookingId}`);
        return cy.request({
            method:"GET",
            url:`${this.baseUrl}/booking/${bookingId}`
        }).then((response)=>{
            logger.success(`Booking ${bookingId} retrieved successfully`);
            return response;
        });
    }
    /**
     * Generates authentication token.
     * Uses credentials stored in Cypress environment variables.
     */
    generateToken(){
        logger.step("Generating authentication token");
        return cy.request({
            method:"POST",
            url:`${this.baseUrl}/auth`,
            body: {
            username:Cypress.env("username"),
            password:Cypress.env("password")
            }
        }).then((response)=>{
            logger.success("Authentication token generated successfully");
            return response;
        });
    }
    /**
     * Updates an existing booking.
     * @param bookingId Booking identifier.
     * @param body Updated booking payload.
     * @param token Authentication token.
     */
    updateBooking(bookingId:number,body:BookingRequest,token:string){
        logger.step(`Updating booking with ID ${bookingId}`);
        return cy.request({
            method:"PUT",
            url:`${this.baseUrl}/booking/${bookingId}`,
            headers:{
                Cookie:`token=${token}`
            },
            body
        }).then((response)=>{
            logger.success(`Booking ${bookingId} updated successfully`);
            return response;
        });
    }
    /**
     * Deletes a booking.
     * @param bookingId Booking identifier.
     * @param token Authentication token.
     */
    deleteBooking(bookingId:number,token:string){
        logger.step(`Deleting booking with ID ${bookingId}`);
        return cy.request({
            method:"DELETE",
            url:`${this.baseUrl}/booking/${bookingId}`,
            headers:{
                Cookie:`token=${token}`
            }
        }).then((response)=>{
            logger.success(`Booking ${bookingId} deleted successfully`);
            return response;
        });
    }
    /**
     * Verifies that a booking has been deleted.
     * Expected result: 404 Not Found.
     * @param bookingId Booking identifier.
     */
    verifyDeletedBooking(bookingId:number) {
    logger.step(`Verifying booking ${bookingId} was deleted`);
    return cy.request({
        method: "GET",
        url: `${this.baseUrl}/booking/${bookingId}`,
        failOnStatusCode: false
    });
}
}