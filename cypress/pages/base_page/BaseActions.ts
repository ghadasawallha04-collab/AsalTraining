///<reference types="cypress" />
import { closeSignInPopupBtn } from "./BaseElements";
export class BaseActions{
    //Open booking website function:
    openBookingWebsite(){
        cy.log("Openning booking website");
        cy.visit('https://www.booking.com');
    }
    //Close sign in alert:
    closeSignInPopup(){
        cy.log("Closing sign-in popup");
        cy.get(closeSignInPopupBtn).should('be.visible').click();
    }
}