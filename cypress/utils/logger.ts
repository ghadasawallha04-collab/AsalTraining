/// <reference types="cypress" />
export class logger{
    static info(message:string){
        Cypress.log({
            name:'INFO',
            message
        });
    }
    static error(message:string){
        Cypress.log({
            name:'ERROR',
            message
        });
    }
    static step(message:string){
        Cypress.log({
            name:'STEP',
            message
        }); // add counter step1-step2
    }
    static success(message:string){
        Cypress.log({
            name:'SUCCESS',
            message
        });
    }
    static filter(message:string){
        Cypress.log({
            name:'FILTER',
            message
        }); //Remove
    }
    static search(message:string){
        Cypress.log({
            name:'SEARCH',
            message
        });//Remove
    }
    static assertion(message:string){
        Cypress.log({
            name:'ASSERTION',
            message
        }); //Choose one validation/assertion
    }
    static validation(message:string){
        Cypress.log({
            name:'VALIDATION',
            message
        });
    }
}
