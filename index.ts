import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getPositions, placeOrder } from "./trade.js";
 


// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// // Add a tool to get the login URL
// server.tool("get-login-url",
//   {},
//   async () => ({
//     content: [{ type: "text", text: loginUrl }]
//   })
// );

// Add an addition tool
server.tool("add-two-numbers",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

server.tool("factorial",
  { a: z.number() },
  async ({ a }) => {
    let ans = 1;
    for(let i = 2; i <= a; i++) {
      ans *= i;
    }
    return {
      content: [{ type: "text", text: String(ans) }]
    }
  }
);

server.tool("buy-stock", "Buys the stock on the zerodha exchange for the user. It executes a real order for the user on the exchange",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    placeOrder(stock, qty, "BUY");
    return {
      content: [{ type: "text", text: "Stock has been bought" }]
    }
  }
);

server.tool("sell-stock", "Sells the stock on the zerodha exchange for the user. It executes a real order for the user on the exchange",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    placeOrder(stock, qty, "SELL");
    return {
      content: [{ type: "text", text: "Stock has been sold" }]
    }
  }
);


server.tool("show-portfolio", "Shows my complete Portfolio in Zerodha",
  {},
  async () => {
    const holdings = await getPositions();

    return{
      content: [{type: "text", text: holdings}]
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);