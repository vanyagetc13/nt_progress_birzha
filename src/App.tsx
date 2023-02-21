import React, { useState } from "react";
import "./App.css";

function App() {
    const [selector, setSelector] = useState("");
    const [amount, setAmount] = useState("");
    const [instrument, setInstrument] = useState("");
    const [dropdownTicker, setDropdownTicker] = useState(false);
    const data = [1, 2, 3, 4, 5, 6];
    return (
        <div className="App">
            <header className="header">
                <h2>Торговый терминал</h2>
            </header>
            <div className="ticker">
                <input
                    type="text"
                    placeholder="CNH/RUB"
                    value={selector}
                    onChange={(e) => {
                        setSelector(e.currentTarget.value);
                    }}
                    onFocus={() => setDropdownTicker(true)}
                    className="dropdown_input"
                />
                <input
                    type="text"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => {
                        const val = e.currentTarget.value;
                        if (!val) return setAmount("");
                        if (val.match(/^[0-9]+$/))
                            return setAmount(e.currentTarget.value);
                    }}
                    className="dropdown_input"
                />
                {dropdownTicker && (
                    <ul className="dropdown_menu">
                        {data.map((e) => (
                            <li
                                key={e}
                                onClick={() => {
                                    const inst = e.toString();
                                    setSelector(inst);
                                    setInstrument(inst);
                                    console.log(inst);
                                    setDropdownTicker(false);
                                }}
                            >
                                {e}
                            </li>
                        ))}
                        <div
                            className="close_menu"
                            onClick={() => {
                                setSelector(instrument);
                                setDropdownTicker(false);
                            }}
                        >
                            x
                        </div>
                    </ul>
                )}
            </div>
        </div>
    );
}

export default App;
