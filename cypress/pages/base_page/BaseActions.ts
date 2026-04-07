///<reference types="cypress" />
import { closeSignInPopupBtn } from "./BaseElements";
import { getElement } from "../../utils/elementHelpers";
export class BaseActions{
    //Open booking website function:
    openBookingWebsite(){
        cy.log("Opening booking website");
        cy.visit('https://www.booking.com');
    }
    //Close sign in alert:
    closeSignInPopup(){
        cy.log("Closing sign-in popup");
        getElement(closeSignInPopupBtn).should('be.visible').click();
    }
}