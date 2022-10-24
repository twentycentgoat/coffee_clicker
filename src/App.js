import './App.css';
import { useState } from 'react';
import img_water from './img/water.jpeg';
import img_beans from './img/beans.png';
import img_cup from './img/cup.jpeg';
import img_crate from './img/crate.png';


const START_BUDGET = 200

const WATER_BUY_PRICE = 1;
const WATER_SELL_PRICE = 0.5;
const BEANS_BUY_PRICE = 15;
const BEANS_SELL_PRICE = 1.8; 
const COFFEE_SELL_PRICE = 8;
const CRATE_SELL_PRICE = 290;


function Game() {
  const [money, setMoney] = useState(START_BUDGET);
  const [water, setWater] = useState(0);
  const [beans, setBeans] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [crates, setCrates] = useState(0);

  function checkBalance(price) {
    if (money >= price) {
      return true;
    } else {
      return false;
    }
  }

  function checkInventory(item) {
    if (item > 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleWater(state) {
    if (state) {
      if (checkBalance(WATER_BUY_PRICE)) {
        setMoney(money - WATER_BUY_PRICE)
        setWater(water + 1)
      }
    } else {
      if (checkInventory(water)) {
        setMoney(money + WATER_SELL_PRICE);
        setWater(water - 1);
      }
    }
  }

  function handleBeans(state) {
    if (state) {
      if (checkBalance(BEANS_BUY_PRICE)) {
        setMoney(money - BEANS_BUY_PRICE)
        setBeans(beans + 5)
      }
    } else {
      if (checkInventory(beans)) {
        setMoney(money + BEANS_SELL_PRICE);
        setBeans(beans - 1);
      }
    }
  }

  function craftCoffee() {
    if (water >= 1 && beans >= 2) {
      setWater(water - 1);
      setBeans(beans - 2);
      setCoffee(coffee + 1);
    }
  }

  function craftCrate() {
    if (coffee >= 20) {
      setCrates(crates + 1);
      setCoffee(coffee - 20);
    }
  }

  function sellCoffee() {
    if (coffee > 0) {
      setMoney(money + COFFEE_SELL_PRICE);
      setCoffee(coffee - 1);
    }
  }

  function sellCrate() {
    if (crates > 0) {
      setMoney(money + CRATE_SELL_PRICE);
      setCrates(crates - 1)
    }
  }


  return(
    <div className='Game'>

      <div className='stats'>
        <h1>Money: {money.toFixed(2)}€</h1>
        <h1>Profit: {(money - START_BUDGET).toFixed(2)}€</h1>
      </div>

      <div className='Ressources'>
        <h1>Inventory</h1>
        <div className='items'>
          <ul>
            <li>Water: {water}</li>
            <li>Beans: {beans}</li>
            <li>Coffee: {coffee}</li>
            <li>Crates: {crates}</li>
          </ul>
        </div>
      </div>

      <div className='Business'>
        <div className='Market'>
        <h1>Market</h1>
          <div className='ingredients'>
            <div className='item'>
              <img src={img_water} />
              <button onClick={() => handleWater(true)}>Buy 1</button>
              <p>Price: {WATER_BUY_PRICE}€</p>
              <button onClick={() => handleWater(false)}>Sell 1</button>
              <p>Price: {WATER_SELL_PRICE}€</p>
            </div>
            <div className='item'>
              <img src={img_beans}/>
              <button onClick={() => handleBeans(true)}>Buy 5</button>
              <p>Price: {BEANS_BUY_PRICE}€</p>
              <button onClick={() => handleBeans(false)}>Sell 1</button>
              <p>Price: {BEANS_SELL_PRICE}€</p>
            </div>
          </div>
        </div>

        <div className='Store'>
          <h1>Store</h1>
          <div className='sellables'>
            <div className='item'>
              <img src={img_cup}></img>
              <button onClick={sellCoffee}>Sell 1</button>
              <p>Sell for {COFFEE_SELL_PRICE}€</p>
            </div>

            <div className='item'>
              <img src={img_crate}></img>
              <button onClick={sellCrate}>Sell 1</button>
              <p>Sell for {CRATE_SELL_PRICE}€</p>
            </div>
          </div>
        </div>
      </div>

      <div className='Craft'>
        <h1>Craft</h1>
        <div className='craftables'>
          <div className='item'>
            <img src={img_cup}></img>
            <button onClick={() => craftCoffee()}>Craft</button>
            <p>1 Water | 2 Beans</p>
          </div>

          <div className='item'>
            <img src={img_crate}></img>
            <button onClick={() => craftCrate()}>Craft</button>
            <p>20 Coffee</p>
          </div>
        </div>
      </div>

    </div>
  )
}

function Menu() {
  const [started, setStarted] = useState(false);

  function startGame(arg) {
    setStarted(arg);
  }

  if (started) {
    return (
    <>
      <div className='top-header-fix'>
        <div className='header-items'>
          <h1>Coffee Clicker</h1>
        </div>
        <button id="leave-button" onClick={() => startGame(false)}>Leave</button>
      </div>
      <Game />
    </>
    )
  } else {
    return (
    <>
      <div className='top-header-fix'>
        <h1>Coffee Clicker</h1>
      </div>
      <div className="AppMenu">
        <button onClick={() => startGame(true)}>Start</button>  
      </div>
    </>
    )
  }
}


function App() {
  return (
    <div className="App">
      <Menu />
    </div>
  );
}

export default App;
