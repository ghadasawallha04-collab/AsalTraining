import { BookingRequest } from "./BookingRequest";
import { getRandomItemFromArray,getRandomNumber } from "../utils/randomizers";
export class BookingDataGenerator {
    private static firstNames=["Ghada","Malak","Lina","Ahmad","Omar"];
    private static lastNames=["Sawallha","Obaid","Ali","Khalil","Hamad"];
    private static additionalNeeds=["Breakfast","Lunch","Dinner","Extra Bed"];
    static generateRandomDate(daysToAdd:number):string{
        const date=new Date();
        date.setDate(date.getDate()+daysToAdd);
        return date.toISOString().split("T")[0];
    }
    static createBooking():BookingRequest {
        return{
            firstname:getRandomItemFromArray(this.firstNames),
            lastname:getRandomItemFromArray(this.lastNames),
            totalprice:getRandomNumber(100,1000),
            depositpaid:
                Math.random()<0.5,
            bookingdates:{
                checkin:
                    this.generateRandomDate(1),
                checkout:
                    this.generateRandomDate(5)
            },
            additionalneeds:getRandomItemFromArray(this.additionalNeeds)
        };
    }
}