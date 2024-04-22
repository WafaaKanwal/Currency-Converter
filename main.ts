#! /usr/bin/env node

// Importing the 'inquirer' library to get user input
import inquirer from "inquirer"; 

// Importing the 'chalk' library for colorful output
import chalk from "chalk"; 

// Displaying a colorful header
async function convertCurrency() {
    console.log(chalk.yellowBright.bold("\n \t<<<=================================>>>")); 
    console.log(chalk.yellowBright.bold("\n \t     Welcome to Currency Converter"));
    console.log(chalk.yellowBright.bold("\n \t<<<=================================>>>\n"));

 // Setting up exchange rates for various currencies   
    const exchangeRates: any = { 
        USD: 1,      // 1 US dollar equals itself
        EUR: 0.94,   // Exchange rate of 1 USD to Euro
        GBP: 0.81,   // Exchange rate of 1 USD to British Pound
        INR: 83.37,  // Exchange rate of 1 USD to Indian Rupee
        PKR: 277.69, // Exchange rate of 1 USD to Pakistani Rupee
       
// Adding more currencies and their exchange rates
        JPY: 154.62, // Exchange rate of 1 USD to Japanese Yen
        CAD: 1.38,   // Exchange rate of 1 USD to Canadian Dollar
        AUD: 1.56,   // Exchange rate of 1 USD to Australian Dollar
        CNY: 7.24,   // Exchange rate of 1 USD to Chinese Yuan Renminbi 
    };

// Asking the user for input
    const userAnswers = await inquirer.prompt([ 
        {
            name: "from_currency",
            type: "list",
            message: chalk.cyanBright("Select the currency to convert from:"),
            choices: Object.keys(exchangeRates) // Providing a list of available currencies
        },
        {
            name: "to_currency",
            type: "list",
            message: chalk.cyanBright("Select the currency to convert into:"),
            choices: Object.keys(exchangeRates) // Providing a list of available currencies
        },
// Asking for the amount to convert
        {
            name: "amount",
            type: "input",
            message: chalk.cyanBright("Enter the amount to convert:"),
            validate: function (value) { // Validating user input
                return value ? true : "Please enter an amount."; // Ensuring an amount is provided
            }
        }
    ]);

// Getting the exchange rate for the currency to convert from
    const fromAmount = exchangeRates[userAnswers.from_currency]; 
// Getting the exchange rate for the currency to convert to
    const toAmount = exchangeRates[userAnswers.to_currency]; 
// Getting the amount to convert  
    const amount = userAnswers.amount; 
// Calculating the amount in the base currency 
    const baseAmount = amount / fromAmount;
// Calculating the converted amount
    const convertedAmount = baseAmount * toAmount; 
// Displaying the converted amount
    console.log(chalk.magentaBright(`\nConverted Amount: ${chalk.greenBright.bold(convertedAmount.toFixed(2))}`));
// Asking if the user wants to continue
    const continueAnswer = await inquirer.prompt([ 
        {
            name: "continue",
            type: "confirm",
            message: "Do you want to perform another conversion?", // Prompting to continue or not
            default: true
        }
    ]);
    return continueAnswer.continue; // Returning the user's choice to continue or not
}
// Main function to run the conversion
    async function main() { 
        let continueConversion = true;
// Looping until the user decides to stop
    while (continueConversion) { 
        continueConversion = await convertCurrency(); // Calling the convertCurrency function
    }
// Saying goodbye
    console.log(chalk.yellowBright.bold("\n<<<======= Thank you for using the app. Goodbye! =======>>>")); 
   }
// Calling the main function to start the program
   main(); 