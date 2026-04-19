import { PageElement } from "../../types/page-elements";
export const FILTER_GROUP:Readonly<PageElement>={
    selector:'[data-testid="filters-group"]',
    testId:null,
    displayText:null
};
export const FILTER_LABEL=(text:string):Readonly<PageElement>=>({
    selector:'label',
    testId:null,
    displayText:text
});
export const BEDROOM_STEPPER:Readonly<PageElement>={
    selector:'[data-filters-item="unit_config_grouped:entire_place_bedroom_count"]',
    testId:null,
    displayText:null
};
export const BATHROOM_STEPPER:Readonly<PageElement>={
    selector:'[data-filters-item="unit_config_grouped:min_bathrooms"]',
    testId:null,
    displayText:null
};
export const STEPPER_VALUE:Readonly<PageElement>={
    selector:'span[aria-hidden="true"]',
    testId:null,
    displayText:null
};