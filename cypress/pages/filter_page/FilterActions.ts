import { FILTER_GROUP,STEPPER_CONTAINER,STEPPER_VALUE} from "./FilterElements";
import { HtmlTags } from "../../utils/htmlTags";
import { STEPPER_TYPES,FILTER_NAMES } from "./FilterConstants"; 
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
 * Sets number of Bedrooms or Bathrooms using stepper filter
 * 
 * @param type - 'Bedrooms' | 'Bathrooms'
 * @param count - number of times to increment
 */
setRooms(type:'Bedrooms'|'Bathrooms',count: number) {
    cy.log(`Setting ${type} to ${count}`);
    cy.contains(FILTER_GROUP.selector!,'Bedrooms and bathrooms').scrollIntoView().within(()=>{
        cy.contains(HtmlTags.DIV,type)
        .parents(STEPPER_CONTAINER.selector!).within(()=>{
            for (let i=0;i<count;i++) {
                cy.get(HtmlTags.BUTTON).last().should('not.be.disabled').click();
                cy.get(STEPPER_VALUE.selector!).should('contain',i+ 1);
            }
        });
     });
}
/**
 * Applies multiple filters dynamically
 */
applyAllFilters(filters: Record<string, any>) {
    cy.log("Applying all filters");
    for(const filterName in filters){
        const value=filters[filterName];
        if(filterName===FILTER_NAMES.BEDROOM_BATHROOM) {
            const {bedrooms,bathrooms}=value;
            if(bedrooms){
                this.setRooms('Bedrooms',bedrooms);
            }
            if(bathrooms){
                this.setRooms('Bathrooms',bathrooms);
            }
        } 
        else{
            this.selectFilter(filterName,value);
        }
    }

}
/**
 * Applies filters from array format
 */
applyFiltersArray(filters:{name:string;value:any }[]){
    cy.log("Applying filters from array");
    filters.forEach(filter=>{
        this.applyAllFilters({[filter.name]:filter.value});
    });
}
}

