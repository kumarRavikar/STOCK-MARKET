const allStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 150.25 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800.10 },
  { symbol: "AMZN", name: "Amazon.com, Inc.", price: 3400.50 },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 299.99 },
  { symbol: "TSLA", name: "Tesla, Inc.", price: 750.30 },
  { symbol: "NFLX", name: "Netflix, Inc.", price: 590.70 },
  { symbol: "FB", name: "Meta Platforms, Inc.", price: 350.15 },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 220.50 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 160.45 },
  { symbol: "V", name: "Visa Inc.", price: 230.70 }
];

let watchlist = [];

const stockTable = document.getElementById("stockTable");
const searchBar = document.getElementById("searchBar");
const watchlistDiv = document.getElementById("watchlist");

const render = (el, html) => el.innerHTML = html;

const displayStockTable = stocks => {
  render(stockTable, stocks.map(s => `
    <tr>
      <td>${s.symbol}</td>
      <td>${s.name}</td>
      <td>$${s.price.toFixed(2)}</td>
      <td><button onclick="addToWatchlist('${s.symbol}')">Add</button></td>
    </tr>`).join(''));
};

const displayWatchlist = () => {
  render(watchlistDiv, watchlist.length
    ? `<ul>${watchlist.map(s => `<li>${s.symbol} - ${s.name} ($${s.price.toFixed(2)}) <button onclick="removeFromWatchlist('${s.symbol}')">Remove</button></li>`).join('')}</ul>`
    : "<p>No stocks in your watchlist.</p>"
  );
};

const addToWatchlist = symbol => {
  if (!watchlist.find(s => s.symbol === symbol)) {
    watchlist.push(allStocks.find(s => s.symbol === symbol));
    displayWatchlist();
  }
};

const removeFromWatchlist = symbol => {
  watchlist = watchlist.filter(s => s.symbol !== symbol);
  displayWatchlist();
};

searchBar.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  displayStockTable(allStocks.filter(s =>
    s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  ));
});

displayStockTable(allStocks.slice(0, 10));
displayWatchlist();
