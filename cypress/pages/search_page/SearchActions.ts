///<reference types="cypress" />
import { DESTINATION_SEARCH_INPUT,SUGGESTION_OPTIONS, OCCUPANCY_DROPDOWN,SEARCH_BUTTON } from "./SearchElements";
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
     * @param destination - Optional destination name
     */
    setDestination(destination?:string){
        cy.log("Selecting destination");
        const selectedDestination=destination??getRandomItemFromArray(DESTINATION);
        cy.log(`Selected destination: ${selectedDestination}`);
        getElement(DESTINATION_SEARCH_INPUT).should('be.visible').click().clear().type(selectedDestination);
        getElement(SUGGESTION_OPTIONS).contains(selectedDestination).first().should('be.visible').click();
    }
    /**
     * Selects check-in and check-out dates.
     * If no dates are provided, random dates will be selected.
     * 
     * @param checkIn - Optional check-in date
     * @param checkOut - Optional check-out date
     */
    setCheckInAndCheckOutDates(checkIn?:string,checkOut?: string){
        const dates=(checkIn&&checkOut)?{checkIn,checkOut}:getRandomDates();
        cy.get(`[data-date="${dates.checkIn}"]`).first().should('be.visible').click();
        cy.get(`[data-date="${dates.checkOut}"]`).last().should('be.visible').click();
    }
    /**
     * Opens the guests (occupancy) dropdown.
    */
    openGuestsDropdown(){
        cy.log("Opening guests dropdown list");
        getElement(OCCUPANCY_DROPDOWN).should('be.visible').click();
    }
    /**
     * Generates random occupancy data (adults, children, rooms).
     * 
     * @returns Occupancy object
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
     * If no data is provided, random values will be used.
     * 
     * @param data - Optional occupancy data
     */
    setOccupancy(data?:Occupancy):void {
        this.openGuestsDropdown();
        cy.log("Reset Occupancy to initial values");
        this.resetAllToMinimum().then(()=>{
        cy.log("Setting Occupancy Values");
        const occupancy=data??this.getRandomOccupancy();
        cy.log(`Adults:${occupancy.adults}`);
        this.setAdults(occupancy.adults);
        cy.log(`Children:${occupancy.children.length}`);
        this.setChildren(occupancy.children);
        cy.log(`Rooms:${occupancy.rooms}`);
        this.setRooms(occupancy.rooms);
            });
        
    }

    /**
     * Clicks the "+" button for a specific field.
     * 
     * @param fieldName - Field label (Adults, Children, Rooms)
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
     * Clicks the "-" button for a specific field.
     * 
     * @param fieldName - Field label (Adults, Children, Rooms)
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
     * @param fieldName - Field label
     * @param minValue - Minimum allowed value
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
     * Resets all occupancy fields to their minimum values.
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
     * Sets number of adults.
     * 
     * @param count - Number of adults
     */
    setAdults(count:number){
        for(let i=1;i<count;i++){
            this.clickIncreaseButtonByLabel("Adults")
        }
    }
   /**
     * Sets number of rooms.
     * 
     * @param count - Number of rooms
     */
    setRooms(count:number){
        for(let i=1;i<count;i++){
            this.clickIncreaseButtonByLabel("Rooms")
        }
    }
    /**
     * Sets children count and their ages.
     * 
     * @param children - Array of children ages
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
     * Clicks the search button.
     */
    clickSearch(){
        cy.log("Clicking on search button");
        getElement(SEARCH_BUTTON).should('be.visible').click();
    }
}
