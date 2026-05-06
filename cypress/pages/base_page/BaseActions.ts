///<reference types="cypress" />
import { CLOSE_SIGN_IN_POPUP_BTN } from "./BaseElements";
import { getElement } from "../../utils/elementHelpers";
import { logger } from "../../utils/logger";
export class BaseActions{
    /**
     * Opens the Booking.com website.
     */    openBookingWebsite(){
        logger.step("Opening Booking website");
        cy.visit('https://www.booking.com');
    }
    /**
     * Closes the sign-in popup if it appears.
     * Ensures the popup is visible before clicking.
     */
    closeSignInPopup(){
        logger.step("Closing sign-in popup");
        getElement(CLOSE_SIGN_IN_POPUP_BTN).should('be.visible').click();
        logger.success("Sign-in popup closed successfully");
    }
}