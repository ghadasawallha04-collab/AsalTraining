import {PROPERTY_CARD,PROPERTY_CARD_TITLE_LINK,ROOM_ROW,RESERVE_BUTTON} from "./HotelElements";
import { logger } from "../../utils/logger";
import { RoomData } from "./HotelModals";
import { HtmlTags } from "../../utils/htmlTags";
export class HotelActions{
    /**
     * Opens the first visible property card.
     * 
     * Steps:
     * 1. Get the first visible property card
     * 2. Find the hotel title link
     * 3. Remove target attribute to avoid opening a new tab
     * 4. Click the hotel link
     */
    openFirstProperty() {
        logger.step("Opening first property");
        cy.get(PROPERTY_CARD.selector!).filter(':visible').first().find(PROPERTY_CARD_TITLE_LINK.selector!).invoke('removeAttr', 'target').click();
    }
    /**
     * Finds a room that matches the provided search data
     * and performs reservation.
     * 
     * Matching can include:
     * - Room type
     * - Number of guests
     * - Rate options
     * 
     * Steps:
     * 1. Loop through all room rows
     * 2. Validate room conditions
     * 3. Select one room
     * 4. Click reserve button
     * 
     * @param searchData - Object containing room search conditions
     */
    findRoom(searchData:RoomData) {
        logger.step("Searching for room");
        cy.get(ROOM_ROW.selector!).each(($row,index)=>{
            const rowText=$row.text().toLowerCase();
            logger.info(`Checking row:${index}`);
            let matched=true;
            if(searchData.roomType) {
                const roomTypeMatched =rowText.includes(searchData.roomType.toLowerCase());
                logger.validation(`Room type matched: ${roomTypeMatched}`);
            if(!roomTypeMatched) {
                matched =false;
            }
        }
        if(searchData.guests){
            const guestsMatched =rowText.includes(searchData.guests.toString());
            logger.validation(`Guests matched: ${guestsMatched}`);
            if(!guestsMatched){
                matched=false;
            }
        }
        if(searchData.rateOptions){
            const rateOptionsMatched=searchData.rateOptions.every(option =>rowText.includes(option.toLowerCase()));
            logger.validation(`Rate options matched: ${rateOptionsMatched}`);
            if(!rateOptionsMatched){
                matched=false;
            }
        }
        if(matched){
            logger.success("Matching room found");
            cy.wrap($row).within(()=>{
                cy.get(HtmlTags.SELECT).select('1');
            });
            cy.get(RESERVE_BUTTON.selector!).filter(':visible').first().click();
            return false;
        }
    });
}
}