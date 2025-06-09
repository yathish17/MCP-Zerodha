import { getMarketData } from './trade';

// Example: Get market data for RELIANCE
getMarketData("RELIANCE")
  .then(data => {
    console.log("Market Data for RELIANCE:");
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error("Error:", err);
  }); 