import { KiteConnect } from "kiteconnect";

const apiKey = "3hw6apgt0413e6ni";
const apiSecret = "r9ka9f6vnecq1zuxkvi21q72mab8g2gg";
// const requestToken = "vhkLza5uLU5ch0Ow3vHMdui1I8gq324I";
let access_token = "dSblyCZRRLuu976igmGX2QKvdMpXlD7Y";

const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(access_token)

// Get login URL but don't log it directly
export const loginUrl = kc.getLoginURL();

export async function placeOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL") {
  try {
    kc.setAccessToken(access_token);
    await kc.placeOrder("regular",{
      exchange: "NSE",
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: "CNC",
      order_type: "MARKET",
  });
  } catch (err) {
    console.error(err);
  }
}

export async function getPositions(){
  const holdings = await kc.getPositions();
  let allHoldings = "";
  holdings.net.map(holding =>{
    allHoldings += `stock: ${holding.tradingsymbol} , qty: ${holding.quantity}, currentPrice: ${holding.last_price}`
  })

  return allHoldings;
}

export async function generateAccessToken(requestToken: string) {
  try {
    const response = await kc.generateSession(requestToken, apiSecret);
    access_token = response.access_token;
    return access_token;
  } catch (err) {
    console.error("Error generating access token:", err);
    throw err;
  }
}

export async function getMarketData(tradingsymbol: string) {
  try {
    kc.setAccessToken(access_token);
    const instruments = await kc.getInstruments("NSE");
    const instrument = instruments.find(i => i.tradingsymbol === tradingsymbol);
    
    if (!instrument) {
      throw new Error(`Instrument ${tradingsymbol} not found`);
    }

    const quote = await kc.getQuote(instrument.instrument_token);
    return {
      symbol: tradingsymbol,
      lastPrice: quote.last_price,
      volume: quote.volume,
      averagePrice: quote.average_price,
      buyQuantity: quote.buy_quantity,
      sellQuantity: quote.sell_quantity,
      timestamp: quote.timestamp
    };
  } catch (err) {
    console.error("Error fetching market data:", err);
    throw err;
  }
}
