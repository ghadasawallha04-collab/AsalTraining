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
            method:"GET",
            url:`https://restful-booker.herokuapp.com/booking/${bookingId}`
    });
}
    generateToken(){
        return cy.request({
            method:"POST",
            url:"https://restful-booker.herokuapp.com/auth",
            body:{
                username:"admin",
                password:"password123"
            }
    });
}
    updateBooking(bookingId:number,token:string,body:object){
        return cy.request({
            method:"PUT",
            url:`https://restful-booker.herokuapp.com/booking/${bookingId}`,
            headers:{
                Cookie:`token=${token}`},
                body
            });
}
    deleteBooking(bookingId:number,token:string){
        return cy.request({
            method:"DELETE",
            url:`https://restful-booker.herokuapp.com/booking/${bookingId}`,
            headers:{
                Cookie:`token=${token}`},
            });
}
}
