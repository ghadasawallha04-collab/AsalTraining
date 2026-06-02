export interface BookingDates {
    checkin:string;
    checkout:string;
}
export interface BookingRequest {
    firstname:string;
    lastname:string;
    totalprice:number;
    depositpaid:boolean;
    bookingdates:BookingDates;
    additionalneeds:string;
}