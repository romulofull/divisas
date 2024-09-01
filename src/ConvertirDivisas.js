import React, { useState } from 'react';
import './estilos.css';

const ConvertirDivisas = () => {
    const [currencies, setCurrencies] = useState([{ moneda: 'USD', tasa: 1 }]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [convertedAmount, setConvertedAmount] = useState(0);

    const handleRateChange = (e, moneda) => {
        const newRate = e.target.value;
        setCurrencies(prev =>
            prev.map(c => (c.moneda === moneda ? { ...c, tasa: parseFloat(newRate) } : c))
        );
    };

    const addCurrency = () => {
        const newCurrency = prompt('Ingrese la Moneda y el Tipo de Cambio de la Moneda ingresada a DOLARES (separado por punto los decimales):');
        if (newCurrency) {
            const [moneda, tasa] = newCurrency.split(',').map(s => s.trim());
            setCurrencies(prev => [...prev, { moneda, tasa: parseFloat(tasa) }]);
        }
    };

    const calculateConversion = () => {
        if (fromCurrency && toCurrency && currencies.find(c => c.moneda === fromCurrency) && currencies.find(c => c.moneda === toCurrency)) {
            const fromRate = currencies.find(c => c.moneda === fromCurrency).tasa;
            const toRate = currencies.find(c => c.moneda === toCurrency).tasa;
            const tasa = toRate / fromRate;
            setConvertedAmount(amount * tasa);
        }
    };

    const monedasOrdenadas = [...currencies].sort((a, b) => b.tasa - a.tasa);

    return (
        <div className="converter">
            <h1>Conversor de Divisas</h1>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Valor"
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {currencies.map(({ moneda }) => (
                        <option key={moneda} value={moneda}>
                            {moneda}
                        </option>
                    ))}
                </select>
                to
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {currencies.map(({ moneda }) => (
                        <option key={moneda} value={moneda}>
                            {moneda}
                        </option>
                    ))}
                </select>
                <button onClick={calculateConversion}>Convertir</button>
            </div>
            <h2>
                {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
            </h2>
            <button onClick={addCurrency}>Agregar Cambio Divisas</button>
            <h3>Monedas ordenadas por Valor:</h3>
            <ul>
                {monedasOrdenadas.map(({ moneda, tasa }) => (
                    <li key={moneda}>
                        {moneda}: {tasa.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConvertirDivisas;
