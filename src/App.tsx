import React, { useEffect, useState } from "react";
import "./App.css";
import { Instrument, OrderSide, OrderStatus } from "./Enums";
import { Decimal } from "decimal.js";

function App() {
    const [selector, setSelector] = useState<string>("Loading...");
    const [amount, setAmount] = useState<Decimal>(new Decimal(0));
    const [instrument, setInstrument] = useState<Instrument>(1);
    const [dropdownTicker, setDropdownTicker] = useState<boolean>(false);
    const data = [1, 2, 3]; // также через useState,
    // только запрашиваем с backend'а с помощью APIшки и складываем в наш store
    // сейчас [1, 2, 3], т.к серверную часть на python'е я разработать не смогу, а на NodeJS не катируется.

    const tableNames = [
        "Id",
        "Creation Time",
        "Change Time",
        "Status",
        "Side",
        "Price",
        "Amount",
        "Instrument",
    ];

    interface trade {
        id: number;
        creationTime: Date;
        changeTime: Date;
        status: OrderStatus;
        side: OrderSide;
        price: Decimal;
        amount: Decimal;
        instrument: Instrument;
    }

    const trades: trade[] = [
        {
            id: 1,
            creationTime: new Date(),
            changeTime: new Date(),
            status: 1,
            side: 1,
            price: new Decimal(100),
            amount: new Decimal(2000),
            instrument: 1,
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setSelector(Instrument[1]);
        }, 1000);
    }, []);

    const formatInstrument = (i: string): string => {
        const splited = i.split("_");
        if (splited.length > 1) {
            const result =
                splited[0].toUpperCase() + "/" + splited[1].toUpperCase();
            return result;
        } else return i;
    };

    return (
        <div className="App">
            <header className="header">
                <h2>Торговый терминал</h2>
            </header>
            <div className="ticker">
                <input
                    type="text"
                    value={formatInstrument(selector)}
                    onChange={(e) => {
                        setSelector(e.currentTarget.value);
                    }}
                    onFocus={() => setDropdownTicker(true)}
                    className="dropdown_input"
                />
                <input
                    type="text"
                    placeholder="0"
                    value={amount.toString()}
                    onChange={(e) => {
                        const val = e.currentTarget.value;
                        if (!val) return setAmount(new Decimal(0));
                        if (val.match(/^[0-9]+$/))
                            return setAmount(
                                new Decimal(e.currentTarget.value)
                            );
                    }}
                    className="dropdown_input"
                />
                <div className="prices">
                    <div className="prices_column">
                        <div className="price_wrapper">
                            <span>8.558</span>
                        </div>
                        <button className="sell_btn price_btn">SELL</button>
                    </div>
                    <div className="devider"></div>
                    <div className="prices_column">
                        <div className="price_wrapper">
                            <span>8.559</span>
                        </div>
                        <button className="buy_btn price_btn">BUY</button>
                    </div>
                </div>
                {dropdownTicker && (
                    <ul className="dropdown_menu">
                        {data.map((e) => (
                            <li
                                key={e}
                                onClick={() => {
                                    setSelector(Instrument[e]);
                                    setInstrument(e);
                                    setDropdownTicker(false);
                                }}
                            >
                                {e}
                            </li>
                        ))}
                        <div
                            className="close_menu"
                            onClick={() => {
                                setSelector(Instrument[instrument]);
                                setDropdownTicker(false);
                            }}
                        >
                            x
                        </div>
                    </ul>
                )}
            </div>
            <table className="table">
                <caption>Список заявок</caption>
                <tr>
                    {tableNames.map((name, i) => (
                        <th key={i}>{name}</th>
                    ))}
                </tr>
                {trades.map((trade) => (
                    <tr key={trade.id}>
                        <td>{trade.id}</td>
                        <td>{trade.creationTime.toDateString()}</td>
                        <td>{trade.changeTime.toDateString()}</td>
                        <td>{trade.status}</td>
                        <td>{trade.side}</td>
                        <td>{trade.price.toString()}</td>
                        <td>{trade.amount.toString()}</td>
                        <td>
                            {formatInstrument(Instrument[trade.instrument])}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default App;
