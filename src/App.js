import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Coin from "./Coin";

const currencies = [
  { label: "EUR €", value: "eur", symbol: "€" },
  { label: "USD $", value: "usd", symbol: "$" },
  { label: "GBP £", value: "gbp", symbol: "£" },
  { label: "PLN zł", value: "pln", symbol: "zł" },
  { label: "BTC ₿", value: "btc", symbol: "₿" },
];

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [chosenCurrency, setChosenCurriency] = useState("eur");

  // console.log(`Chose currency: ${chosenCurrency}`);

  const currencySymbol = currencies.filter((currency) =>
    currency.value.includes(chosenCurrency)
  );
  const chosenCurrencySymbol = currencySymbol.map((cs) => {
    return cs.symbol;
  });
  // console.log(`Currency symbol:`, chosenCurrencySymbol);

  const pageLoad = useEffect(() => {
    axios
      .get(
        `/api/v3/coins/markets?vs_currency=${chosenCurrency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
        { withCredentials: false })
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, [chosenCurrency]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setChosenCurriency(e.target.value);
    return pageLoad;
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Crypto</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
        <select className="currency" onChange={handleCurrencyChange}>
          {currencies.map((currency) => {
            return (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div className="legend">
          <p>Crypto</p>
          <p>Symbol</p>
          <p>Price</p>
          <p>Volume</p>
          <p>Change</p>
          <p>Market Cap</p>
        </div>
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
              currencySymbol={chosenCurrencySymbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
