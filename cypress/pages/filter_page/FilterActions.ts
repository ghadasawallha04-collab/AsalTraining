import { FILTER_GROUP,BEDROOM_STEPPER,BATHROOM_STEPPER,STEPPER_VALUE,PROPERTY_CARD_AFTER_FILTERS} from "./FilterElements";
import { HtmlTags } from "../../utils/htmlTags";
import { FILTER_NAMES } from "./FilterConstants"; 
import { logger } from "../../utils/logger";
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
        logger.filter(`Selecting filter: ${filterName}`);
        let values;
        if(Array.isArray(options)) {
            values=options;
        } 
        else{
            values=[options];
        }
        logger.info("Choosing filter options");
        cy.contains(FILTER_GROUP.selector!,filterName).parent().within(()=>{
            for (let i=0;i<values.length;i++) {
                logger.info(`Clicking option: ${values[i]}`);
                cy.clickByText(HtmlTags.LABEL,values[i]);
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
    logger.filter(`Setting ${type} to ${count}`);
    const stepper=type==="Bedrooms"?BEDROOM_STEPPER.selector!:BATHROOM_STEPPER.selector!;
    cy.get(stepper).should("be.visible").within(()=>{
        const adjustStepper=()=>{
            cy.get(STEPPER_VALUE.selector!).invoke("text").then((text)=>{
                const current=parseInt(text.trim());
                logger.validation(`${type} current value: ${current}`);
                if(current<count){
                    logger.info(`Increasing ${type}`);
                    cy.get(HtmlTags.BUTTON).eq(1).click().then(()=>adjustStepper());
                } 
                else if(current>count){
                    logger.info(`Decreasing ${type}`);
                    cy.get(HtmlTags.BUTTON).eq(0).click().then(()=>adjustStepper());
                } 
                else{
                    logger.success(`${type} set successfully to ${count}`);
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
    logger.step("Applying all filters");
    cy.intercept('**searchresults*').as('searchResults');
    for(const filterName in filters){
        const value=filters[filterName];
        if(filterName===FILTER_NAMES.BEDROOM_BATHROOM){
            const{bedrooms,bathrooms}=value;
            if(bathrooms){
                logger.filter("Setting Bathrooms");
                this.setRooms("Bathrooms",bathrooms);
            }
            if(bedrooms){
                logger.filter("Setting Bedrooms");
                this.setRooms("Bedrooms",bedrooms);
            }
        } 
        else{
            this.selectFilter(filterName,value);
        }
    }
    cy.wait('@searchResults');
    cy.get(PROPERTY_CARD_AFTER_FILTERS.selector!).filter(':visible').should('have.length.greaterThan', 0);
    cy.get('@searchResults.all').then((requests:any)=>{
        logger.validation(`Total search requests: ${requests.length}`);
        requests.forEach((request:any,index:number)=>{
            logger.info(`Waiting for request ${index+1}`);
        });
    });
    logger.success("All filters applied successfully");
}
}

