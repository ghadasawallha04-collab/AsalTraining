import { FILTER_GROUP,BEDROOM_STEPPER,BATHROOM_STEPPER,STEPPER_VALUE} from "./FilterElements";
import { HtmlTags } from "../../utils/htmlTags";
import { FILTER_NAMES } from "./FilterConstants"; 
export class FilterActions{
    /**
     * Selects filter options based on filter name and given values.
     * It supports both single and multiple options.
     * 
     * Steps:
     * 1. Convert input to array if needed
     * 2. Locate filter group by name
     * 3. Iterate over options and click each one
     * 
     * @param filterName - The name of the filter (e.g., "Property Type")
     * @param options - Single option or array of options to select
     */
    selectFilter(filterName:string,options:string|string[]) {
        cy.log(`Selecting filter:${filterName}`);
        let values;
        if(Array.isArray(options)) {
            values=options;
        } 
        else{
            values=[options];
        }
        cy.log("Choosing Options");
        cy.contains(FILTER_GROUP.selector!,filterName).parent().within(()=>{
            for (let i=0;i<values.length;i++) {
                cy.log(`Clicking option:${values[i]}`);
                cy.contains(HtmlTags.LABEL,values[i]).click();
            }
        });
}
/**
 * Sets number of Bedrooms or Bathrooms using steppers
 * 
 * @param type - 'Bedrooms' | 'Bathrooms'
 * @param count - number of times to increment
 */
setRooms(type:"Bedrooms"|"Bathrooms",count:number){
    cy.log(`Setting ${type} to ${count}`);
    const stepper=type==="Bedrooms"?BEDROOM_STEPPER.selector!:BATHROOM_STEPPER.selector!;
    cy.get(stepper).should("be.visible").within(()=>{
        const adjustStepper=()=>{
            cy.get(STEPPER_VALUE.selector!).invoke("text").then((text)=>{
                const current=parseInt(text.trim());
                if(current<count){
                    cy.log(`Increase ${type}`);
                    cy.get(HtmlTags.BUTTON).eq(1).click().then(()=>adjustStepper());
                } 
                else if(current>count){
                    cy.log(`Decrease ${type}`);
                    cy.get(HtmlTags.BUTTON).eq(0).click().then(()=>adjustStepper());
                } 
                else{
                    cy.log(`${type} set to ${count}`);
                }
            });
        };
        adjustStepper();
    });
}
  /**
   * Applies multiple filters dynamically
   * Ensures Bedrooms and Bathrooms are correct at the end
   */
applyAllFilters(filters: Record<string, any>) {
    cy.log("Applying all filters");
    for(const filterName in filters){
        const value=filters[filterName];
        if(filterName===FILTER_NAMES.BEDROOM_BATHROOM){
            const{bedrooms,bathrooms}=value;
            if(bathrooms){
                 cy.log(`Setting Bathrooms`);
                this.setRooms("Bathrooms",bathrooms);
            }
            if(bedrooms){
                 cy.log(`Setting Bedrooms`);
                this.setRooms("Bedrooms",bedrooms);
            }
        } 
        else{
            this.selectFilter(filterName,value);
        }
    }
}
}

