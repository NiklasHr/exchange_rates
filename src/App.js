import { useState } from 'react';
import './App.css';

const URL = "http://api.exchangeratesapi.io/v1/latest?access_key=";
const API_KEY = "7193d07c21a465f7a864a9e9563e17fa";

function App() {

  const [eur,setEur] = useState(0);
  const [gbp,setGbp] = useState(0);
  const [rate,setRate] = useState(0);

  async function convert(e) {
    e.preventDefault();
    try {
      const address = URL + API_KEY;
      const response = await fetch(address);

      if (response.ok) {
        const json = await response.json();
        setRate(json.rates.GBP);

        setGbp(eur * json.rates.GBP);
      } else {
        alert('Error retrieving exchange rate.');
      }
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div style={{margin:"20px"}}>
      <h2>Euro to Great British Pound</h2>
      <form onSubmit={convert}>
        <div style={{lineHeight:"200%"}}>
          <label>Eur </label>
          <input type="number" step="0.01" 
          value={eur} onChange={e => setEur(e.target.value)}></input>
          <output>€ | Conversion Rate: {rate}</output>
        </div>
        <div>
          <label>Gbp </label>
          <output>{gbp.toFixed(2)} £</output>
        </div>
        <div style={{marginTop:"5px"}}>
          <button>Calculate</button>
        </div>
      </form>
    </div>
  );
}

export default App;