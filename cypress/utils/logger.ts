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
        });
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
        });
    }
    static search(message:string){
        Cypress.log({
            name:'SEARCH',
            message
        });
    }
    static assertion(message:string){
        Cypress.log({
            name:'ASSERTION',
            message
        });
    }
    static validation(message:string){
        Cypress.log({
            name:'VALIDATION',
            message
        });
    }
}
