import './App.css';
import { useState } from 'react';
import img_water from './img/water.jpeg';
import img_beans from './img/beans.png';
import img_cup from './img/cup.jpeg';
import img_crate from './img/crate.png';
import img_container from './img/container.png';
import img_bottle from './img/bottle.png';
import img_bag from './img/bag.jpeg';
import img_auto_brew from './img/auto-brew.png';
import img_car from './img/car.png';


const START_BUDGET = 2000;

const WATER_BUY_PRICE = 1;
const WATER_SELL_PRICE = 0.5;
const BEANS_BUY_PRICE = 15;
const BEANS_SELL_PRICE = 2.4; 
const COFFEE_SELL_PRICE = 8;
const CRATE_SELL_PRICE = 180;
const CONTAINER_SELL_PRICE = 900;
const BOTTLE_BUY_PRICE = 100;
const BAG_BUY_PRICE = 600;
const AUTO_BREW_PRICE = 500;
const CAR_BUY_PRICE = 10000;


function Game() {
  const [money, setMoney] = useState(START_BUDGET);
  const [water, setWater] = useState(0);
  const [beans, setBeans] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [crates, setCrates] = useState(0);
  const [containers, setContainer] = useState(0);
  const [brewing, setBrewing] = useState(false);
  const [reachedGoal, setReachedGoal] = useState(false);


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

  function handleTransactionMarket(item, state) {
    if (item == 'water' && state && checkBalance(WATER_BUY_PRICE)) {
      setMoney(money - WATER_BUY_PRICE);
      setWater(water + 1);
    } else if (item == 'water' && !state && checkInventory(water)) {
      setMoney(money + WATER_SELL_PRICE);
      setWater(water - 1);
    } else if (item == 'beans' && state && checkBalance(BEANS_BUY_PRICE)) {
      setMoney(money - BEANS_BUY_PRICE);
      setBeans(beans + 5); 
    } else if (item == 'beans' && !state &&checkInventory(beans)) {
      setMoney(money + BEANS_SELL_PRICE);
      setBeans(beans - 1);
    }
  }

  function handleTransactionItems(item, e) {
    if (item == 'bottle' && checkBalance(BOTTLE_BUY_PRICE)) {
      setMoney(money - BOTTLE_BUY_PRICE);
      setWater(water + 100);

      e.target.parentNode.className = "item deactivated";
      document.getElementById("bottle-button").disabled = true;
    } else if (item == 'bag' && checkBalance(BAG_BUY_PRICE)) {
      setMoney(money - BAG_BUY_PRICE);
      setBeans(beans + 200);

      e.target.parentNode.className = "item deactivated";
      document.getElementById("bag-button").disabled = true;
    } else if (item == 'auto_brew' && checkBalance(AUTO_BREW_PRICE)) {
      setMoney(money - AUTO_BREW_PRICE);
      setBrewing(true);

      e.target.parentNode.className = "item deactivated";
      document.getElementById("buy-brew-button").disabled = true;
    } else if (item == 'car') {
      setMoney(money - 10000);
      setReachedGoal(true);

      e.target.parentNode.className = "item deactivated";
      document.getElementById("buy-car-button").disabled = true;
    } else {
      //
    }
  }

  function craftItem(item) {
    if (item == 'coffee' && (water >= 1 && beans >= 2)) {
      setWater(water - 1);
      setBeans(beans - 2);
      setCoffee(coffee + 1);
    } else if (item == 'crate' && coffee >= 20) {
      setCrates(crates + 1);
      setCoffee(coffee - 20);
    } else if (item == 'containers' && crates >= 5) {
      setContainer(containers + 1);
      setCrates(crates - 5);
    } else {
      //
    }
  }

  function sellItem(item) {
    if (item == 'coffee' && coffee > 0) {
      setMoney(money + COFFEE_SELL_PRICE);
      setCoffee(coffee - 1);
    } else if (item == 'crate' && crates > 0) {
      setMoney(money + CRATE_SELL_PRICE);
      setCrates(crates - 1)
    } else if (item == 'containers' && containers > 0) {
      setMoney(money + CONTAINER_SELL_PRICE);
      setContainer(containers - 1);
    } else {
      //
    }
  }

  function autoBrew() {
    if (water < (beans / 2)) {
      setCoffee(water);
      setBeans(beans - (water * 2));
      setWater(0);
    } else if (water >= (beans / 2)) {
      setCoffee(Math.floor(beans / 2));
      setWater(water - Math.floor(beans / 2));
      setBeans(beans % 2);
    } else {
      //
    }
  }

  return(
    <div className='Game'>

      <div className='Stats'>
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
            <li>Containers: {containers}</li>
          </ul>
        </div>
      </div>

      <div className='Business'>
        <div className='Market'>
        <h1>Market</h1>
          <div className='ingredients'>
            <div className='item'>
              <h4>Water</h4>
              <img src={img_water} />
              <button onClick={() => handleTransactionMarket('water', true)}>Buy 1</button>
              <p>Price: {WATER_BUY_PRICE}€</p>
              <button onClick={() => handleTransactionMarket('water', false)}>Sell 1</button>
              <p>Price: {WATER_SELL_PRICE}€</p>
            </div>

            <div className='item'>
              <h4>Beans</h4>
              <img src={img_beans}/>
              <button onClick={() => handleTransactionMarket('beans', true)}>Buy 5</button>
              <p>Price: {BEANS_BUY_PRICE}€</p>
              <button onClick={() => handleTransactionMarket('beans', false)}>Sell 1</button>
              <p>Price: {BEANS_SELL_PRICE}€</p>
            </div>
          </div>
        </div>

        <div className='Store'>
          <h1>Store</h1>
          <div className='sellables'>
            <div className='item'>
              <h4>Coffee</h4>
              <img src={img_cup} />
              <button onClick={() => sellItem('coffee')}>Sell 1</button>
              <p>Sell for {COFFEE_SELL_PRICE}€</p>
            </div>

            <div className='item'>
              <h4>Crates</h4>
              <img src={img_crate} />
              <button onClick={() => sellItem('crate')}>Sell 1</button>
              <p>Sell for {CRATE_SELL_PRICE}€</p>
            </div>

            <div className='item'>
              <h4>Containers</h4>
              <img src={img_container} /> 
              <button onClick={() => sellItem('containers')}>Sell 1</button>
              <p>Sell for {CONTAINER_SELL_PRICE}€</p>
            </div>
          </div>
        </div>

        <div className='Deals'>
          <h1>Deals</h1>
          <div className='dealables'>
            <div className='item'>
              <h4>Water Bottle</h4>
              <p className="description">(100 Water)</p>
              <img src={img_bottle} />
              <button id="bottle-button" onClick={(event) => handleTransactionItems('bottle', event)}>Buy</button>
              <p>Buy for {BOTTLE_BUY_PRICE}€</p>
            </div>

            <div className='item'>
              <h4>Bean Bag</h4>
              <p className='description'>(200 Beans)</p>
              <img src={img_bag} />
              <button id="bag-button" onClick={(event) => handleTransactionItems('bag', event)}>Buy</button>
              <p>Buy for {BAG_BUY_PRICE}€</p>
            </div>
          </div>
        </div>
      </div>

      <div className='Tools'>
        <div className='Craft'>
          <h1>Craft</h1>
          <div className='craftables'>
            <div className='item'>
              <h4>Coffee</h4>
              <img src={img_cup} />
              <button onClick={() => craftItem('coffee')}>Craft</button>
              <p>1 Water | 2 Beans</p>
              {brewing ? (
                <button id="autobrew-button" onClick={autoBrew}>Autobrew</button>) : (<></>)}
            </div>

            <div className='item'>
              <h4>Crate</h4>
              <img src={img_crate} />
              <button onClick={() => craftItem('crate')}>Craft</button>
              <p>20 Coffee</p>
            </div>

            <div className='item'>
              <h4>Container</h4>
              <img src={img_container} />
              <button onClick={() => craftItem('containers')}>Craft</button>
              <p>5 Crates</p>
            </div>
          </div>
        </div>

        <div className='Upgrades'>
          <h1>Upgrades</h1>
          <div className='upgradeables'>
            <div className='item'>
              <h4>Automatic Brewing</h4>
              <img src={img_auto_brew} />
              <button id="buy-brew-button" onClick={(event) => handleTransactionItems('auto_brew', event)}>Buy</button>
              <p>Buy for {AUTO_BREW_PRICE}€</p>
            </div>
          </div>
        </div>
      </div>

      <div className='Goal'>
        <div className='Goal-sub'>
          <h1>Goal</h1>
          <div className='goals'>
            <div className='item'>
              <h4>A New Car</h4>
              <img src={img_car} />
              <button onClick={(event) => handleTransactionItems('car', event)}>Buy</button>
              <p>Buy for {CAR_BUY_PRICE}€</p>
            </div>
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
      <div className='game-header'>
        <div className='game-header-items'>
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
      <div className='game-header'>
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
