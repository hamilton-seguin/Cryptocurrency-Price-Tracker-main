import React from "react";
import "./Coin.css";

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  currencySymbol,
}) => {
  return (
    <>
      <div className="coin-container">
        <div className="coin-row">
          <div className="coin">
            <img src={image} alt="crypto" />
            <h1>{name}</h1>
            <p className="coin-symbol">{symbol}</p>
          </div>
          <div className="coin-data">
            <p className="coin-price">
              {price} {currencySymbol}
            </p>
            <p className="coin-volume">
              {volume.toLocaleString()} {currencySymbol}
            </p>

            {priceChange < 0 ? (
              <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
            ) : (
              <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
            )}

            <p className="coin-marketcap">
              {marketcap.toLocaleString()} {currencySymbol}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coin;
