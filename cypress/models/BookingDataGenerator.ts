import { BookingRequest } from "./BookingRequest";
import { getRandomItemFromArray,getRandomNumber,generateRandomDateForApi } from "../utils/randomizers";
export class BookingDataGenerator {
    private static firstNames=["Ghada","Malak","Lina","Ahmad","Omar"];
    private static lastNames=["Sawallha","Obaid","Ali","Khalil","Hamad"];
    private static additionalNeeds=["Breakfast","Lunch","Dinner","Extra Bed"];
    /**
 * Creates a booking request with randomly generated data.
 * 
 * The generated booking includes:
 * - Random first and last names
 * - Random total price
 * - Random deposit payment status
 * - Future check-in and check-out dates
 * - Random additional needs
 * 
 * @returns A complete BookingRequest object
 */
    static generateBookingPayload():BookingRequest {
        return{
            firstname:getRandomItemFromArray(this.firstNames),
            lastname:getRandomItemFromArray(this.lastNames),
            totalprice:getRandomNumber(100,1000),
            depositpaid:
                Math.random()<0.5,
            bookingdates:{
                checkin:
                    generateRandomDateForApi(1),
                checkout:
                    generateRandomDateForApi(5)
            },
            additionalneeds:getRandomItemFromArray(this.additionalNeeds)
        };
    }
}