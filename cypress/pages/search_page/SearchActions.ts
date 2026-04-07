///<reference types="cypress" />
import { destinationSearchInput,suggestionOptions,occupancyDropdown,searchButton } from "./SearchElements";
import { Occupancy } from "./SearchModels";
import { getElement } from "../../utils/elementHelpers";
import { getRandomItemFromArray,getRandomDates,getRandomNumber } from "../../utils/randomizers"; 
import { HtmlTags } from "../../utils/htmlTags";
import { OccupancyConstants,Destinations } from "./SearchConstants";
export class SearchActions{
    //Set a Destination (Static or Random values)
    setDestination(destination?:string){
        cy.log("Selecting destination");
        const selectedDestination=destination??getRandomItemFromArray(Destinations);
        cy.log(`Selected destination: ${selectedDestination}`);
        getElement(destinationSearchInput).should('be.visible').click().clear().type(selectedDestination);
        getElement(suggestionOptions).contains(selectedDestination).first().should('be.visible').click();
}
    //Set checkIn and checkOut dates (Static or Random values)
    setCheckInAndCheckOutDates(checkIn?:string,checkOut?: string){
        const dates=(checkIn&&checkOut)?{checkIn,checkOut}:getRandomDates();
        cy.get(`[data-date="${dates.checkIn}"]`).first().should('be.visible').click();
        cy.get(`[data-date="${dates.checkOut}"]`).last().should('be.visible').click();
    }
    //Open the occupancy (guests) dropdown to configure adults, children and rooms
    openGuestsDropdown(){
        cy.log("Opening guests dropdown list");
        getElement(occupancyDropdown).should('be.visible').click();
    }
    // Generate random occupancy data within allowed limits
    getRandomOccupancy=():Occupancy=>{
        const adults=getRandomNumber(OccupancyConstants.ADULTS_MIN,OccupancyConstants.ADULTS_MAX);
        const rooms=getRandomNumber(OccupancyConstants.ROOMS_MIN,OccupancyConstants.ROOMS_MAX);
        const childrenCount=getRandomNumber(OccupancyConstants.CHILDREN_MIN,OccupancyConstants.CHILDREN_MAX);
        const children:number[]=[];
        //Generate random ages for each child
        for(let i=0;i<childrenCount;i++){
            children.push(getRandomNumber(OccupancyConstants.CHILD_AGE_MIN,OccupancyConstants.CHILD_AGE_MAX));
        }
        return{adults,children,rooms};
    };
    //Apply generated Occupancy (Static or Random Values)
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
    //Click the "+" button for a specific field (Adults/Children /Rooms)
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
    //Click the "-" button for a specific field (Adults/Children /Rooms)
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
    //Reset occupancy fields (Adults,Children or Rooms) to the minimum values depending on fieldName
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
    //Resetting all occupancy fields (Adults,Children and Rooms) to the minimum in one function
    resetAllToMinimum(){
        cy.log("Resetting adults value")
        return this.resetFieldToMinimum("Adults",OccupancyConstants.ADULTS_MIN)
        .then(()=>{
            this.openGuestsDropdown();
            cy.log("Resetting Children value")
            return this.resetFieldToMinimum("Children",OccupancyConstants.CHILDREN_MIN);
        })
        .then(()=>{
            cy.log("Resetting Rooms value")
            return this.resetFieldToMinimum("Rooms",OccupancyConstants.ROOMS_MIN);
        });
}
    //Increase number of adults to the desired count
    setAdults(count:number){
        for(let i=1;i<count;i++){
            this.clickIncreaseButtonByLabel("Adults")
        }
    }
    //Increase number of rooms to the desired count
    setRooms(count:number){
        for(let i=1;i<count;i++){
            this.clickIncreaseButtonByLabel("Rooms")
        }
    }
    //Set number of children and assign their ages from dropdowns
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
    //Click on search button function:
    clickSearch(){
        cy.log("Clicking on search button");
        getElement(searchButton).should('be.visible').click();
    }
}
