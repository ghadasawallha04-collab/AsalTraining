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
export const STEPPER_CONTAINER:Readonly<PageElement>={
    selector:'[data-testid="filters-group-item-stepper"]',
    testId:null,
    displayText:null
};
export const STEPPER_VALUE:Readonly<PageElement>={
    selector:'span[aria-hidden="true"]',
    testId:null,
    displayText:null
};

