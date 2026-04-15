import { PageElement } from "../../types/page-elements";
export const FILTER_GROUP:PageElement={
    selector:'[data-testid="filters-group"]',
    testId:null,
    displayText:null
};
export const FILTER_LABEL=(text:string):PageElement=>({
    selector:'label',
    testId:null,
    displayText:text
});