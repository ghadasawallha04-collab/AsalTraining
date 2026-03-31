import moment from "moment";
//Selecting random option from dropdown suggestions
export const selectRandomFromDropdown=(inputLocator:string,optionsLocator:string) =>{
  cy.get(inputLocator).click().clear();
  cy.get(optionsLocator).then((options)=>{
    const randomIndex=Math.floor(Math.random()*options.length);
    cy.wrap(options[randomIndex]).click();
  });
};
//Get Random dates depending on today date:
export const getRandomDates=()=>{
  const checkIn=moment().add(5,'days').format('YYYY-MM-DD');
  const checkOut=moment().add(15,'days').format('YYYY-MM-DD');
  return {checkIn,checkOut};
};
//Random Number function generator:
export const getRandomNumber=(min:number,max:number):number=>{
  return Math.floor(Math.random()*(max-min+1))+min;
};


