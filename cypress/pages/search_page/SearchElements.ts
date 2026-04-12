import { PageElement } from "../../types/page-elements";
export const DESTINATION_SEARCH_INPUT:Readonly<PageElement>={ //Readonly 
    selector:'input[name="ss"]',
    testId:null,
    displayText:null
};
export const SUGGESTION_OPTIONS:Readonly<PageElement>={
    selector:'[role="option"]',
    testId:null,
    displayText:null
};
export const OCCUPANCY_DROPDOWN:Readonly<PageElement>={
    selector:null,
    testId:'[data-testid="occupancy-config"]',
    displayText:null
};
export const SEARCH_BUTTON:Readonly<PageElement>={
    selector:'[type="submit"]',
    testId:null,
    displayText:null
};

