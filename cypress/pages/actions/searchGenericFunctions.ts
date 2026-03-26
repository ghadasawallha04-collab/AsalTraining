///<reference types="cypress" />
import {closeAlert,destinationInput,dates,guests,searchBtn} from '../elements/searchElements';
export class searchGenericFunctions{
    //Open booking website function:
    openWebsite(){
        cy.log("Openning booking website");
        cy.visit('https://www.booking.com');
    }
    //Close sign in alert:
    alertHandle(){
        cy.log("Closing popup alert");
        cy.get(closeAlert).click();
    }
    //Enter destination input function:
    enterDestination(dest:string){
        cy.log("Choosing destination input value");
        cy.get(destinationInput).type(dest);
        cy.contains('dest').click();
    }
    //Dates Picking function:
    selectDates(checkIn:string,checkOut:string){
        cy.get(dates).click();
        cy.log("Choose check in date");
        cy.get(`[data-date="${checkIn}"]`).first().click();
        cy.log("Choose check out date");
        cy.get(`[data-date="${checkOut}"]`).last().click(); 
    }
    //Open guests dropdown function:
    openGuests(){
        cy.log("Openning guests dropdown list");
        cy.get(guests).click();
    }
    //Click on search button function:
    clickSearch(){
        cy.log("Clicking on search button");
        cy.get(searchBtn).click();
    }
}
