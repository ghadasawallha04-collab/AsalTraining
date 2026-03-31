///<reference types="cypress" />
import { destinationInput,searchSuggestionsOptions,guests,searchBtn,Occupancy } from "./SearchElements";
import { selectRandomFromDropdown,getRandomDates,getRandomNumber } from "../../utils/GenericFunctions"; 
import { HtmlTags } from "../../utils/htmlTags";
import { SearchConstants } from "./SearchConstants";
export class SearchActions{
    //choose random destination from Suggestions:
    ChooseRandomDestination(){
        cy.log("Selecting random option from dropdown");
        selectRandomFromDropdown(destinationInput,searchSuggestionsOptions);
    }
    //Dates Picking function:
    selectDates(){
        const{checkIn,checkOut}=getRandomDates();
        cy.get(`[data-date="${checkIn}"]`).first().click();
        cy.get(`[data-date="${checkOut}"]`).last().click();
    }
    //Open guests dropdown function:
    openGuests(){
        cy.get(guests).click();
    }
    //Choosing Random values for Occupancy function:
    getRandomOccupancy=():Occupancy=>{
        const adults=getRandomNumber(SearchConstants.ADULTS_MIN,SearchConstants.ADULTS_MAX);
        const rooms=getRandomNumber(SearchConstants.ROOMS_MIN,SearchConstants.ROOMS_MAX);
        const childrenCount=getRandomNumber(SearchConstants.CHILDREN_MIN,SearchConstants.CHILDREN_MAX);
        const children:number[]=[];
        for(let i=0;i<childrenCount;i++){
            children.push(getRandomNumber(SearchConstants.CHILD_AGE_MIN,SearchConstants.CHILD_AGE_MAX));
        }
        return {adults,children,rooms};
    };
    //Setting occupancy function:
    setOccupancy():void {
        cy.log("Openning guests dropdown list");
        this.openGuests();
        cy.log("Generating Random Values for Occupancy");
        const occupancy=this.getRandomOccupancy();
        cy.log(`Adults:${occupancy.adults}`);
        this.setAdultsOrRooms("Adults",occupancy.adults);
        cy.log(`Children:${occupancy.children.length}`);
        this.setChildren(occupancy.children);
        cy.log(`Rooms:${occupancy.rooms}`);
        this.setAdultsOrRooms("Rooms",occupancy.rooms);
    }
    //setting adults and rooms numbers function:
    setAdultsOrRooms(fieldName:string,count:number){
        for(let i=1;i<count;i++){
            cy.contains(HtmlTags.LABEL,fieldName)
            .parent()
            .parent()
            .find(HtmlTags.BUTTON)
            .last()
            .click();
        }
    }
    //setting Children number and ages function:
    setChildren(children:number[]){
        for(let i=0;i<children.length;i++){
            cy.contains(HtmlTags.LABEL,"Children")
            .parent()
            .parent()
            .find(HtmlTags.BUTTON)
            .last()
            .click();
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
        cy.get(searchBtn).click();
    }
}
