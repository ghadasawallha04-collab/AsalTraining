///<reference types="cypress" />
import { destinationSearchInput,suggestionOptions,occupancyDropdown,searchButton } from "./SearchElements";
import { Occupancy } from "./searchModels";
import { selectRandomDestination,getRandomDates,getRandomNumber } from "../../utils/randomizers"; 
import { HtmlTags } from "../../utils/htmlTags";
import { OccupancyConstants } from "./SearchConstants";
export class SearchActions{
    //Select a random destination and choose the first matching suggestion from the dropdown
    chooseRandomDestination(){
        cy.log("Selecting random option from dropdown");
        selectRandomDestination(destinationSearchInput,suggestionOptions);
    }
    //Select check-in and check-out dates based on start after number of days and end after number of days
    selectCheckInAndCheckOutDates(){
        const{checkIn,checkOut}=getRandomDates(5,10);
        cy.get(`[data-date="${checkIn}"]`).first().should('be.visible').click();
        cy.get(`[data-date="${checkOut}"]`).last().should('be.visible').click();
    }
    //Open the occupancy (guests) dropdown to configure adults, children and rooms
    openGuestsDropdown(){
        cy.log("Openning guests dropdown list");
        cy.get(occupancyDropdown).should('be.visible').click();
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
        return {adults,children,rooms};
    };
    //Apply genrated Occupancy values
    setOccupancy():void {
        this.openGuestsDropdown();
        cy.log("Generating Random Values for Occupancy");
        const occupancy=this.getRandomOccupancy();
        cy.log(`Adults:${occupancy.adults}`);
        this.setAdults(occupancy.adults);
        cy.log(`Children:${occupancy.children.length}`);
        this.setChildren(occupancy.children);
        cy.log(`Rooms:${occupancy.rooms}`);
        this.setRooms(occupancy.rooms);
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
        cy.get(searchButton).should('be.visible').click();
    }
}
