import { PageElement } from "../../types/page-elements";
export const PROPERTY_CARD:Readonly<PageElement>={
    selector:'[data-testid="property-card"]',
    testId:null,
    displayText:null
};
export const PROPERTY_CARD_TITLE_LINK:Readonly<PageElement>={
    selector:'[data-testid="title-link"]',
    testId:null,
    displayText:null
};
export const RESERVE_BUTTON:Readonly<PageElement>={
    selector:'.js-reservation-button',
    testId:null,
    displayText:null
};
export const ROOM_TYPE:Readonly<PageElement>={
    selector:'.hprt-roomtype-icon-link',
    testId:null,
    displayText:null
};
export const ROOM_TYPE_ROW:Readonly<PageElement>={
    selector:'tr:has(.hprt-roomtype-icon-link)',
    testId:null,
    displayText:null
};
export const GUEST_ICONS:Readonly<PageElement>={
    selector:'td.hprt-table-cell-occupancy i',
    testId:null,
    displayText:null
};
export const RATE_OPTIONS:Readonly<PageElement>={
    selector:'td.hprt-table-cell-conditions',
    testId:null,
    displayText:null
};