import { PROPERTY_CARD,PROPERTY_CARD_TITLE,PRICE_NIGHTS_INFO } from "./SearchElements";
export class SearchValidations{
/**
 * Validates that a specific property card matches the search details.
 * This includes destination name, number of nights, and occupancy details.
 *
 * Steps:
 * 1. Select the property card based on the given index
 * 2. Extract and normalize the destination name from the card
 * 3. Compare it with the expected destination
 * 4. Extract the text containing nights and occupancy information
 * 5. Call assertNightsAndOccupancy to validate nights, adults, and children
 *
 * @param searchOptions - Object containing search details:
 *   - destination: expected destination name
 *   - checkInDate: check-in date
 *   - checkOutDate: check-out date
 *   - occupancyData: object with adults, children array, and rooms
 * @param cardIndex - Index of the card to validate (default is 0 → first card)
 */
verifyCardSearchDetails(searchOptions:any,cardIndex: number=0){
        const{destination,checkInDate,checkOutDate,occupancyData}=searchOptions;
        const expectedAdults=occupancyData?.adults;
        const expectedChildren=occupancyData?.children?.length;
        cy.log(`Validating card at index: ${cardIndex}`);
        cy.log(`Asserting card name is: ${destination}`);
        cy.get(PROPERTY_CARD.selector!).filter(':visible').eq(cardIndex).within(()=>{
            cy.get(PROPERTY_CARD_TITLE.selector!).should('be.visible').invoke('text').then((actualDestinationName)=>{
                cy.log(`Actual:${actualDestinationName}`);
                const normalize=(text:string)=>
                    text.replace(/\s+/g,' ').trim().toLowerCase();
                expect(normalize(actualDestinationName)).to.contain(normalize(destination));
            });
            cy.get(PRICE_NIGHTS_INFO.selector!).should('be.visible').invoke('text').then((text)=>{ 
                this.assertNightsAndOccupancy(text,checkInDate,checkOutDate,expectedAdults,expectedChildren);
         });
    });
}
/**
 * Validates nights and occupancy details (adults and children) in a property card.
 * It checks for both singular and plural forms (night/nights, adult/adults, child/children).
 *
 * Steps:
 * 1. Convert the card text to lowercase for consistent comparison
 * 2. Calculate the number of nights based on check-in and check-out dates
 * 3. Verify that the text contains the correct number of nights
 * 4. Validate the number of adults if provided
 * 5. Validate the number of children if greater than zero
 * 6. Skip children validation if no children are selected
 *
 * @param text - Text extracted from the card (contains nights and occupancy info)
 * @param checkInDate - Check-in date used to calculate number of nights
 * @param checkOutDate - Check-out date used to calculate number of nights
 * @param expectedAdults - Expected number of adults (optional)
 * @param expectedChildren - Expected number of children (optional)
 */
assertNightsAndOccupancy(text:string,checkInDate:string,checkOutDate:string,expectedAdults?:number,expectedChildren?:number) {
    const lower=text.toLowerCase();
    const nights=(new Date(checkOutDate).getTime()-new Date(checkInDate).getTime())/(1000*60*60*24);
    cy.log(`Expected Nights:${nights}`);
    cy.log(`Expected Adults:${expectedAdults}`);
    cy.log(`Expected Children:${expectedChildren}`);
    cy.log(`Card data:${lower}`);
    expect(lower.includes(`${nights} night`) || lower.includes(`${nights} nights`)).to.be.true;
    if(expectedAdults!== undefined){
        expect(lower.includes(`${expectedAdults} adult`) || lower.includes(`${expectedAdults} adults`)).to.be.true;
    }
    if(expectedChildren!==undefined&&expectedChildren>0) {
        expect(lower.includes(`${expectedChildren} child`) || lower.includes(`${expectedChildren} children`)).to.be.true;
    } 
    else {
        cy.log("No children selected");
    }
}
}