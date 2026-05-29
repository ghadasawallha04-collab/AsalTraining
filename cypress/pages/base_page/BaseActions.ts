///<reference types="cypress" />
import { CLOSE_SIGN_IN_POPUP_BTN } from "./BaseElements";
import { getElement } from "../../utils/elementHelpers";
import { logger } from "../../utils/logger";
import { DESTINATION_SEARCH_INPUT } from "../search_page/SearchElements";
export class BaseActions{
    /**
     * Opens the Booking.com website.
     */
    openBookingWebsite(){
        logger.step("Opening Booking website");
        cy.visit('https://www.booking.com');
        cy.get(DESTINATION_SEARCH_INPUT.selector!).should('be.visible');
    }
    /**
     * Closes the sign-in popup if it appears.
     * Ensures the popup is visible before clicking.
     */
    closeSignInPopup(){
        cy.get('body').then(($body)=>{
            if($body.find(CLOSE_SIGN_IN_POPUP_BTN.selector!).length){
                getElement(CLOSE_SIGN_IN_POPUP_BTN).should('be.visible').click();
                logger.success("Sign-in popup closed successfully");
        } 
        else{
            logger.info("Sign-in popup was not displayed");
        }
    });
}
}