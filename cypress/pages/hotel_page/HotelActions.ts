import {PROPERTY_CARD,PROPERTY_CARD_TITLE_LINK,RESERVE_BUTTON,ROOM_TYPE,ROOM_TYPE_ROW,GUEST_ICONS,RATE_OPTIONS} from "./HotelElements";
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
findRoom(searchData:RoomData){
    logger.step("Searching for room");
    let matchedGuestRow: JQuery<HTMLElement> | null = null;
    let roomFound=false;
    //Check for Room Type
    cy.get(ROOM_TYPE.selector!).each(($roomType,index)=>{
        if(roomFound){
             return false;
            }
            const actualRoomType =$roomType.text().trim().toLowerCase();
            logger.info(`Checking room: ${index}`);
            logger.info(`Actual room type: ${actualRoomType}`);
            if (!actualRoomType.includes(searchData.roomType!.toLowerCase())) {
                return;
            }
            logger.success(`Requested room type matched: ${actualRoomType}`);
            //For Each Room Type Check Number of Guests and Rate options
            cy.wrap($roomType).closest(HtmlTags.TR).nextUntil(ROOM_TYPE_ROW.selector!).each(($guestRow)=>{
                if(roomFound){
                    return false;
                }
                const actualGuests=$guestRow.find(GUEST_ICONS.selector!).length;
                logger.info(`Actual guests: ${actualGuests}`);
                if (searchData.guests!==undefined) {
                if(actualGuests!==searchData.guests) {
                    return;
                }
                logger.success(`Guests matched: ${actualGuests} guests`);
            }
                const rateText=$guestRow.find(RATE_OPTIONS.selector!).text().toLowerCase();
                logger.info(`Rate text: ${rateText}`);
                if (searchData.rateOptions!==undefined){
                const rateMatched=searchData.rateOptions.every(option=>rateText.includes(option.toLowerCase()));
                logger.validation(`Rate matched: ${rateMatched}`);
                if(!rateMatched){
                    return;
                }
                logger.success(`Matched rate options:${searchData.rateOptions?.join(', ')}`);
            }
                matchedGuestRow=$guestRow;
                roomFound=true;
                return false;
            });
        }).then(()=>{
            if(!matchedGuestRow){
                throw new Error(`No room matched the requested data:Room Type: ${searchData.roomType},Guests: ${searchData.guests},
                Rate Options: ${searchData.rateOptions?.join(', ')}`);
            }
        cy.wrap(matchedGuestRow).find('select').select('1');
        cy.get(RESERVE_BUTTON.selector!).filter(':visible').first().click();
        logger.success(`Successfully reserved matching room: Room Type: ${searchData.roomType}, Guests: ${searchData.guests},
        Rate Options: ${searchData.rateOptions?.join(', ')}`);
    });
}
}