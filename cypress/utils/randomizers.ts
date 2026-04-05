import moment from "moment";
//Selecting random option from dropdown suggestions
export const selectRandomDestination=(inputLocator:string, optionsLocator:string)=>{
  const destinations=["Paris","London","Rome","Dubai","Istanbul"];
  const randomIndex=Math.floor(Math.random()*destinations.length);
  const randomItem=destinations[randomIndex];
  cy.log(`Selected destination:${randomItem}`);
  cy.get(inputLocator).should('be.visible').click().clear().type(randomItem);
  cy.contains(optionsLocator,randomItem).first().should('be.visible').click();
};
//Get Random dates depending on today date:
export const getRandomDates=(startAfterDays:number,daysToEnd:number)=>{
  const checkIn=moment().add(startAfterDays,'days').format('YYYY-MM-DD');
  const checkOut=moment().add(daysToEnd,'days').format('YYYY-MM-DD');
  return {checkIn,checkOut};
};
//Random Number function generator:
export const getRandomNumber=(min:number,max:number):number=>{
  return Math.floor(Math.random()*(max-min+1))+min;
};


