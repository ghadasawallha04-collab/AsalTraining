/// <reference types="cypress" />
declare namespace Cypress{
    interface Chainable{
        clickByText(
            selector:string,
            text:string
        ):Chainable<void>;
    }
}