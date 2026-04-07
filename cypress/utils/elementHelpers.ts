import { PageElement } from "../types/page-elements";
export const getElement=(element: PageElement)=>{
  if(element.selector){
    return cy.get(element.selector);
  }
  if (element.testId){
    return cy.get(element.testId);
  }
  if (element.displayText){
    return cy.contains(element.displayText);
  }
  throw new Error("Invalid PageElement");
};
