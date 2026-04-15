import { FILTER_GROUP } from "./FilterElements";
import { HtmlTags } from "../../utils/htmlTags";
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
     * Applies multiple filters using a data-driven approach.
     * Iterates over the filters object and applies each filter.
     * 
     * Steps:
     * 1. Loop through filter keys
     * 2. Call selectFilter for each filter
     * 
     * @param filtersData - Object containing filter names and their values
     */
    applyFilters(filtersData:Record<string,string|string[]>){
        cy.log("Applying multiple filters");
        for(const filterName in filtersData) {
            const options=filtersData[filterName];
            this.selectFilter(filterName,options);
        }
    }
}
