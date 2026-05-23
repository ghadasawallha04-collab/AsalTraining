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
 * Finds and reserves the first room that matches
 * the provided search conditions.
 * 
 * Supported matching conditions:
 * - Room type
 * - Number of guests (optional)
 * - Rate options (optional)
 * 
 * Steps:
 * 1. Loop through all available room types
 * 2. Check if room type matches the requested room
 * 3. Loop through rows related to the matched room type
 * 4. Validate guests count if provided
 * 5. Validate rate options if provided
 * 6. Save the first matching room row
 * 7. Select the room and click reserve
 * 
 * Throws:
 * - Error if no matching room is found
 * 
 * @param searchData - Object containing room search criteria
 */
findRoom(searchData:RoomData){
    logger.step("Searching for room");
    let matchedGuestRow: JQuery<HTMLElement> | null = null;
    //Check for Room Type
    cy.get(ROOM_TYPE.selector!).each(($roomType,index)=>{
            const actualRoomType =$roomType.text().trim().toLowerCase();
            logger.info(`Checking room: ${index}`);
            logger.info(`Actual room type: ${actualRoomType}`);
            if (!actualRoomType.includes(searchData.roomType!.toLowerCase())) {
                return;
            }
            logger.success(`Requested room type matched: ${actualRoomType}`);
            //For Each Room Type Check Number of Guests and Rate options
            cy.wrap($roomType).closest(HtmlTags.TR).nextUntil(ROOM_TYPE_ROW.selector!).each(($guestRow)=>{
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