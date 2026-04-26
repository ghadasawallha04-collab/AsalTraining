///<reference types="cypress" />
import { DESTINATION_SEARCH_INPUT,SUGGESTION_OPTIONS, OCCUPANCY_DROPDOWN,SEARCH_BUTTON,PROPERTY_CARD,PROPERTY_CARD_TITLE,PRICE_NIGHTS_INFO } from "./SearchElements";
import { Occupancy } from "./SearchModels";
import { getElement } from "../../utils/elementHelpers";
import { getRandomItemFromArray,getRandomDates,getRandomNumber } from "../../utils/randomizers"; 
import { HtmlTags } from "../../utils/htmlTags";
import { OccupancyConstant,DESTINATION } from "./SearchConstants";
export class SearchActions{
/**
 * Sets the destination in the search input.
 * If no destination is provided, a random one will be selected.
 *
 * Steps:
 * 1. Determine the destination (provided or random)
 * 2. Type the destination into the search input field
 * 3. Select the first matching suggestion from the dropdown
 *
 * @param {string} [destination] - Optional destination name
 * @returns {Cypress.Chainable<string>} The selected destination value
 */
    setDestination(destination?:string){
        cy.log("Selecting destination");
        const selectedDestination=destination??getRandomItemFromArray(DESTINATION);
        cy.log(`Selected destination: ${selectedDestination}`);
        getElement(DESTINATION_SEARCH_INPUT).should('be.visible').click().clear().type(selectedDestination);
        getElement(SUGGESTION_OPTIONS).contains(selectedDestination).first().should('be.visible').click();
        return cy.wrap(selectedDestination);
    }
/**
 * Selects check-in and check-out dates.
 *
 * Steps:
 * 1. Use provided dates or generate random ones
 * 2. Select check-in date from calendar
 * 3. Select check-out date from calendar
 *
 * @param {string} [checkIn] - Optional check-in date (YYYY-MM-DD)
 * @param {string} [checkOut] - Optional check-out date (YYYY-MM-DD)
 * @returns {Cypress.Chainable<{checkIn: string, checkOut: string}>} Selected dates
 */
    setCheckInAndCheckOutDates(checkIn?:string,checkOut?: string){
        const dates=(checkIn&&checkOut)?{checkIn,checkOut}:getRandomDates();
        cy.get(`[data-date="${dates.checkIn}"]`).first().should('be.visible').click();
        cy.get(`[data-date="${dates.checkOut}"]`).last().should('be.visible').click();
        return cy.wrap(dates);
    }
/**
 * Opens the guests (occupancy) dropdown.
 *
 * Steps:
 * 1. Locate the occupancy dropdown
 * 2. Click to expand the guest configuration panel
 *
 * @returns {void}
 */
    openGuestsDropdown(){
        cy.log("Opening guests dropdown list");
        getElement(OCCUPANCY_DROPDOWN).should('be.visible').click();
    }
/**
 * Generates random occupancy data.
 *
 * Includes:
 * - Random number of adults
 * - Random number of rooms
 * - Random number of children with random ages
 *
 * @returns {Occupancy} Randomly generated occupancy object
 */
    getRandomOccupancy=():Occupancy=>{
        const adults=getRandomNumber(OccupancyConstant.ADULTS_MIN,OccupancyConstant.ADULTS_MAX);
        const rooms=getRandomNumber(OccupancyConstant.ROOMS_MIN,OccupancyConstant.ROOMS_MAX);
        const childrenCount=getRandomNumber(OccupancyConstant.CHILDREN_MIN,OccupancyConstant.CHILDREN_MAX);
        const children:number[]=[];
        //Generate random ages for each child
        for(let i=0;i<childrenCount;i++){
            children.push(getRandomNumber(OccupancyConstant.CHILD_AGE_MIN,OccupancyConstant.CHILD_AGE_MAX));
        }
        return{adults,children,rooms};
    };
/**
 * Sets occupancy values (adults, children, rooms).
 *
 * Steps:
 * 1. Open guests dropdown
 * 2. Reset all fields to minimum values
 * 3. Use provided data or generate random occupancy
 * 4. Set adults count
 * 5. Set children count and ages
 * 6. Set number of rooms
 *
 * @param {Occupancy} [data] - Optional occupancy configuration
 * @returns {Cypress.Chainable<Occupancy>} The applied occupancy data
 */
    setOccupancy(data?:Occupancy) {
        this.openGuestsDropdown();
        cy.log("Reset Occupancy to initial values");
        return this.resetAllToMinimum().then(()=>{
        cy.log("Setting Occupancy Values");
        const occupancy=data??this.getRandomOccupancy();
        cy.log(`Adults:${occupancy.adults}`);
        this.setAdults(occupancy.adults);
        cy.log(`Children:${occupancy.children.length}`);
        this.setChildren(occupancy.children);
        cy.log(`Rooms:${occupancy.rooms}`);
        this.setRooms(occupancy.rooms);
        return cy.wrap(occupancy);
            });
        
    }

/**
 * Clicks the "+" button for a specific field (Adults, Children, Rooms).
 *
 * @param {string} fieldName - Field label
 * @returns {void}
 */
    private clickIncreaseButtonByLabel(fieldName:string){
        cy.contains(HtmlTags.LABEL,fieldName)
        .parent()
        .parent()
        .find(HtmlTags.BUTTON)
        .last()
        .should('be.visible')
        .and('not.be.disabled')
        .click();
    }
/**
 * Clicks the "-" button for a specific field (Adults, Children, Rooms).
 *
 * @param {string} fieldName - Field label
 * @returns {void}
 */
    private clickDecreaseButtonByLabel(fieldName:string){
        cy.contains(HtmlTags.LABEL,fieldName)
        .parent()
        .parent()
        .find(HtmlTags.BUTTON)
        .first()
        .should('be.visible')
        .and('not.be.disabled')
        .click();    
    }
/**
 * Resets a specific occupancy field to its minimum value.
 *
 * Steps:
 * 1. Get current field value
 * 2. Calculate number of steps to minimum
 * 3. Click decrease button until minimum is reached
 *
 * @param {string} fieldName - Field label
 * @param {number} minValue - Minimum allowed value
 * @returns {Cypress.Chainable<number | void>}
 */
    resetFieldToMinimum(fieldName:string,minValue:number) {
        return cy.contains(fieldName)
        .parent()
        .parent()
        .find('span')
        .invoke('text')
        .then((text)=>{
            const currentValue=Number(text);
            const steps=currentValue-minValue;
            if(steps<=0){
                return 0;
            }
            cy.log(`Reset ${fieldName} from ${currentValue} to ${minValue}`);
            for(let i=0;i<steps;i++){
                this.clickDecreaseButtonByLabel(fieldName);
            }
        });
    }
/**
 * Resets all occupancy fields (Adults, Children, Rooms) to minimum values.
 *
 * Steps:
 * 1. Reset adults
 * 2. Reset children
 * 3. Reset rooms
 *
 * @returns {Cypress.Chainable<any>}
 */
    resetAllToMinimum(){
        cy.log("Resetting adults value")
        return this.resetFieldToMinimum("Adults",OccupancyConstant.ADULTS_MIN)
        .then(()=>{
            this.openGuestsDropdown();
            cy.log("Resetting Children value")
            return this.resetFieldToMinimum("Children",OccupancyConstant.CHILDREN_MIN);
        })
        .then(()=>{
            cy.log("Resetting Rooms value")
            return this.resetFieldToMinimum("Rooms",OccupancyConstant.ROOMS_MIN);
        });
    }
/**
 * Sets the number of adults.
 *
 * @param {number} count - Number of adults
 * @returns {void}
 */
    setAdults(count:number){
        for(let i=1;i<count;i++){
            this.clickIncreaseButtonByLabel("Adults")
        }
    }
/**
 * Sets the number of rooms.
 *
 * @param {number} count - Number of rooms
 * @returns {void}
 */
    setRooms(count:number){
        for(let i=1;i<count;i++){
            this.clickIncreaseButtonByLabel("Rooms")
        }
    }
/**
 * Sets children count and their ages.
 *
 * Steps:
 * 1. Increase children count
 * 2. Assign age for each child
 *
 * @param {number[]} children - Array of children ages
 * @returns {void}
 */
    setChildren(children:number[]){
        for(let i=0;i<children.length;i++){
            this.clickIncreaseButtonByLabel("Children")            
        }
        children.forEach((age,index)=>{
            cy.get(HtmlTags.SELECT)
            .eq(index)
            .select(age.toString());
        });
    }
/**
 * Clicks the search button to submit the search request.
 *
 * @returns {void}
 */
    clickSearch(){
        cy.log("Clicking on search button");
        getElement(SEARCH_BUTTON).should('be.visible').click();
    }
    /**
 * Performs a full search on the Booking website using predefined static data.
 *
 * This function executes the complete search flow including:
 * 1. Setting the destination (e.g., Paris)
 * 2. Selecting check-in and check-out dates
 * 3. Configuring occupancy (adults, children with ages, and rooms)
 * 4. Submitting the search request
 *
 * @param {Object} [searchOptions] - Optional search configuration object
 * @param {string} searchOptions.destination - The destination city or location
 * @param {string} searchOptions.checkInDate - The check-in date (YYYY-MM-DD)
 * @param {string} searchOptions.checkOutDate - The check-out date (YYYY-MM-DD)
 * @param {Object} searchOptions.occupancyData - Guest configuration
 * @param {number} searchOptions.occupancyData.adults - Number of adults
 * @param {number[]} searchOptions.occupancyData.children - Array of children ages
 * @param {number} searchOptions.occupancyData.rooms - Number of rooms
 *
 * @returns {void} Executes the search flow and navigates to results page
 */
performSearch(searchOptions?:{destination?:string;checkInDate?:string;checkOutDate?:string;
    occupancyData?:{adults:number;children:number[];rooms:number;};}){
    cy.log("Performing search");
    this.setDestination(searchOptions?.destination);
    this.setCheckInAndCheckOutDates(searchOptions?.checkInDate,searchOptions?.checkOutDate);
    this.setOccupancy(searchOptions?.occupancyData);
    this.clickSearch();
}
/**
 * Validates the first search result card.
 * It verifies:
 * - Hotel name matches the searched destination
 * - Number of nights is correct
 * - Number of adults is correct
 * - Number of children is correct
 *
 * @param expectedDestinationName - The destination or hotel name entered in search
 * @param expectedCheckIn - Check-in date (YYYY-MM-DD)
 * @param expectedCheckOut - Check-out date (YYYY-MM-DD)
 * @param expectedAdults - Number of adults
 * @param expectedChildren - Number of children
 */
searchInfoAssertFirstCard(expectedDestinationName:string,expectedCheckIn:string,expectedCheckOut:string,
    expectedAdults:number,expectedChildren:number) {
        cy.log(`Asserting first card name is: ${expectedDestinationName}`);
        cy.get(PROPERTY_CARD.selector!).filter(':visible').first().within(()=>{
            cy.get(PROPERTY_CARD_TITLE.selector!).should('be.visible').invoke('text').then((actualDestinationName)=>{
                cy.log(`Actual:${actualDestinationName}`);
                const normalize=(text:string)=>
                    text.replace(/\s+/g,' ').trim().toLowerCase();
                expect(normalize(actualDestinationName)).to.contain(normalize(expectedDestinationName));
            });
            cy.get(PRICE_NIGHTS_INFO.selector!).should('be.visible').invoke('text').then((text)=>{ 
                const lower=text.toLowerCase();
                 const nights=(new Date(expectedCheckOut).getTime()-new Date(expectedCheckIn).getTime())/(1000*60*60*24);
                cy.log(`Expected Nights: ${nights}`);
                cy.log(`Card data: ${lower}`);
                cy.log(`Expected Adults: ${expectedAdults}`);
                cy.log(`Expected Children: ${expectedChildren}`);
                 expect(lower).to.contain(`${nights}`);
                 expect(lower).to.contain(`${expectedAdults} adults`);
                 expect(lower).to.contain(`${expectedChildren} children`);
         });
    });
}

}
