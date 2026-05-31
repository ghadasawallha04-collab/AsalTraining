export class BookingApi{
    createBooking(body:object){
        return cy.request({
            method:"POST",
            url:"https://restful-booker.herokuapp.com/booking",
            body
        });
    }
    getBooking(bookingId:number){
        return cy.request({
            method: "GET",
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`
    });
}
}