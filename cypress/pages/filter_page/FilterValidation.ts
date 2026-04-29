import { PROPERTY_CARD } from "../search_page/SearchElements";
import { PROPERTY_CARD_UNIT_CONFIGURATION,REVIEW_SCORE } from "./FilterElements";
import { FILTER_NAMES } from "./FilterConstants"; 
export class FilterValidations{
/**
 * Validates that a specific property card matches the applied filters.
 * This function supports validating any card by index and collects all validation errors
 * instead of failing on the first assertion.
 *
 * Steps:
 * 1. Select the property card based on the given index
 * 2. Iterate over all provided filters
 * 3. Call the corresponding assertion function for each filter
 * 4. Each assertion pushes errors into the shared validationErrors array
 *
 * @param filters - Object containing filter names and their expected values
 * @param cardIndex - Index of the card to validate (default is 0 → first card)
 */
validateCardFilters(filters:Record<string,any>,cardIndex: number=0) {
    cy.log(`Validating card at index: ${cardIndex}`);
    const validationErrors:string[]=[];
    cy.get(PROPERTY_CARD.selector!).filter(':visible').eq(cardIndex).within(()=>{
        for (const filterName in filters) {
            const value=filters[filterName];
            cy.log(`Checking filter ${filterName}`)
            switch(filterName){
                case(FILTER_NAMES.BEDROOM_BATHROOM):
                this.assertBedroomsBathrooms(value,validationErrors,filterName);
                break;
                /////////////////////////////////////////////////////////////////////
                case(FILTER_NAMES.REVIEW_SCORE):
                this.assertReviewScore(value,validationErrors,filterName);
                break;
                /////////////////////////////////////////////////////////////////////
                case(FILTER_NAMES.MEALS):
                break;
                case(FILTER_NAMES.RESERVATION_POLICY):
                break;
                case(FILTER_NAMES.FACILITIES):
                break;
                case(FILTER_NAMES.ROOM_FACILITIES):
                break;
                default:cy.log(`No assertion defined for ${filterName}`);
            }
        }

     });
}
/**
 * Validates the number of bedrooms and bathrooms in a property card.
 * It extracts values from the card text and compares them with expected values.
 *
 * Steps:
 * 1. Get the unit configuration text from the card
 * 2. Extract bedrooms and bathrooms using pattern matching
 * 3. Compare extracted values with expected values
 * 4. Push errors into validationErrors array if mismatch occurs
 *
 * @param value - Object containing expected bedrooms and bathrooms
 * @param validationErrors - Shared array to collect validation error messages
 * @param filterName - Name of the filter used for logging and error messages
 */
assertBedroomsBathrooms(value:{bedrooms?:number;bathrooms?:number},validationErrors:string[],filterName: string){
    cy.get(PROPERTY_CARD_UNIT_CONFIGURATION.selector!).invoke('text').then(text=>{
        const bedroomMatch=text.match(/(\d+)\s*bedroom/);
        const bathroomMatch=text.match(/(\d+)\s*bathroom/);
        const bedrooms=bedroomMatch?Number(bedroomMatch[1]):0;
        const bathrooms=bathroomMatch?Number(bathroomMatch[1]):0;
        cy.log(`Bedrooms: ${bedrooms} | Bathrooms: ${bathrooms}`);
        if(value.bedrooms!==undefined){
            if(bedrooms<value.bedrooms){
                validationErrors.push(`${filterName}: Bedrooms are ${bedrooms} and the expected is ${value.bedrooms}`);
            }
            else{
                cy.log(`${filterName}: Bedrooms valid: ${bedrooms}`);
            }
        }
        if(value.bathrooms!==undefined){
            if(bathrooms<value.bathrooms){
                validationErrors.push(`${filterName}: Bathrooms are ${bathrooms} and the expected is ${value.bathrooms}`)
            }
            else{
                cy.log(`${filterName}: Bathrooms valid: ${bathrooms}`);
            }
        }
    });
}
/**
 * Validates the review score of a property card.
 * It ensures that the actual score meets or exceeds the expected minimum score.
 *
 * Steps:
 * 1. Get the review score text from the card
 * 2. Convert the text to a numeric value
 * 3. Extract the minimum expected score from the filter value
 * 4. Compare actual score with expected score
 * 5. Push error into validationErrors array if validation fails
 *
 * @param value - Expected review score (e.g., "Wonderful: 9+")
 * @param validationErrors - Shared array to collect validation error messages
 * @param filterName - Name of the filter used for logging and error messages
 */
assertReviewScore(value:string,validationErrors:string[],filterName:string){
    cy.get(REVIEW_SCORE.selector!).invoke('text').then(text=>{
            const score=Number(text.trim());
            const minScore=Number(value.toString().replace(/\D/g, ''));
            cy.log(`Expected score: ${minScore}`);
            cy.log(`Actual score: ${score}`);
            if(score<minScore){
                validationErrors.push(`${filterName}: Review score is ${score} and expected is ${minScore}`)
            }
            else{
                cy.log(`${filterName}: Review Score is valid: ${score}`);
            }
        });
}
}