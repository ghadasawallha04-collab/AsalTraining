///<reference types="cypress" />
import {closeAlert} from "./BaseElements";
import { HtmlTags } from "../../utils/htmlTags";
export class BaseActions{
    //Open booking website function:
    openWebsite(){
        cy.log("Openning booking website");
        cy.visit('https://www.booking.com');
    }
    //Close sign in alert:
    alertHandle(){
        cy.log("Closing popup alert");
        cy.get(closeAlert).click();
    }
}