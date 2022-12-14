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
import img_shop from './img/shop.png';
import img_house from './img/house.png';
import img_earth from './img/earth.png';
import img_freighter from './img/freighter.png';
import img_contract from './img/contract.png';
import img_money from './img/money.png';


let START_BUDGET = 300;

let WATER_BUY_PRICE = 1;
let BEANS_BUY_PRICE = 15;
let BOTTLE_BUY_PRICE = 100;
let BAG_BUY_PRICE = 600;
let AUTO_BREW_PRICE = 500;
let CAR_BUY_PRICE = 20000;
let HOUSE_BUY_PRICE = 30000;
let SHOP_BUY_PRICE = 10000;
let EXPANSION_BUY_PRICE = 5000;
let CONTRACT_BUY_PRICE = 2500;
let DEFLATION_BUY_PRICE = 1200;
 
let WATER_SELL_PRICE = 0.5;
let BEANS_SELL_PRICE = 2.4;
let COFFEE_SELL_PRICE = 8;
let CRATE_SELL_PRICE = 180;
let CONTAINER_SELL_PRICE = 1000;
let FREIGHTER_SELL_PRICE = 7000;

let AMOUNT_WATER = 1;
let AMOUNT_BEANS = 5;



function Game() {
  const [money, setMoney] = useState(START_BUDGET);
  const [water, setWater] = useState(0);
  const [beans, setBeans] = useState(0);
  const [coffee, setCoffee] = useState(0);
  const [crates, setCrates] = useState(0);
  const [containers, setContainer] = useState(0);
  const [freighters, setFreighters] = useState(0);
  const [brewing, setBrewing] = useState(false);
  const [expansion, setExpansion] = useState(false);
  const [priceUpdate, setPriceUpdate] = useState(false);
  const [contract, setContract] = useState(false);
  const [carOwned, setCarOwned] = useState(false);
  const [houseOwned, setHouseOwned] = useState(false);


  function checkBalance(price) {
    return (money >= price) ? true : false;
  }

  function checkInventory(item) {
    return (item > 0) ? true : false;
  }

  function deactivateItem(e, i) {
    e.target.parentNode.className = "item deactivated";
    document.getElementById(i).disabled = true;
  }

  function activateItem(c) {
    document.getElementById(c).className = "item";
  }

  function increaseSalesPricesBy(i) {
    WATER_SELL_PRICE *= i;
    BEANS_SELL_PRICE *= i;
    COFFEE_SELL_PRICE *= i;
    CRATE_SELL_PRICE *= i;
    CONTAINER_SELL_PRICE *= i;
    FREIGHTER_SELL_PRICE *= i;
  }

  function increaseMarketItemsBy(i) {
    AMOUNT_WATER *= 2;
    AMOUNT_BEANS *= 2;
  }
  
  function checkAllGoalsReached() {
    if (carOwned && houseOwned) {
      //
    }
  }

  function handleTransactionMarket(item, state) {
    switch (item) {
      case 'water':
        if(state && checkBalance(WATER_BUY_PRICE)) {
          setMoney(money - WATER_BUY_PRICE);
          setWater(water + AMOUNT_WATER);
        } 
        else if (!state && checkInventory(water)) {
          setMoney(money + WATER_SELL_PRICE);
          setWater(water - 1);
        }
        break;
      case 'beans':
        if(state && checkBalance(BEANS_BUY_PRICE)) {
          setMoney(money - BEANS_BUY_PRICE);
          setBeans(beans + AMOUNT_BEANS);
        } 
        else if (!state && checkInventory(beans)) {
          setMoney(money + BEANS_SELL_PRICE);
          setBeans(beans - 1);
        } 
        break;
      default:
        break;
  
    }
  }

  function handleTransactionItems(item, e) {
    switch (item) {
      case 'bottle':
        if (checkBalance(BOTTLE_BUY_PRICE)) {
          setMoney(money - BOTTLE_BUY_PRICE);
          setWater(water + 100);
        } break;
      case 'bag':
        if (checkBalance(BAG_BUY_PRICE)) {
          setMoney(money - BAG_BUY_PRICE);
          setBeans(beans + 200);
        } break;
      case 'auto_brew':
        if (checkBalance(AUTO_BREW_PRICE)) {
          setMoney(money - AUTO_BREW_PRICE);
          setBrewing(true);
          deactivateItem(e, "buy-brew-button");
        } break;
      case 'car':
        if (checkBalance(CAR_BUY_PRICE)) {
          setMoney(money - CAR_BUY_PRICE);
          setCarOwned(true);
          deactivateItem(e, "buy-car-button");
          checkAllGoalsReached();
        } break;
      case 'shop':
        if(checkBalance(SHOP_BUY_PRICE)) {
          setMoney(money - SHOP_BUY_PRICE);
          increaseSalesPricesBy(1.15);
          setPriceUpdate(true);
          deactivateItem(e, "buy-shop-button");
        } break;
      case 'house':
        if (checkBalance(HOUSE_BUY_PRICE)) {
          setMoney(money - HOUSE_BUY_PRICE);
          setHouseOwned(true);
          deactivateItem(e, "buy-house-button");
          checkAllGoalsReached();
        } break;
      case 'expansion':
        if (checkBalance(EXPANSION_BUY_PRICE)) {
          setMoney(money - EXPANSION_BUY_PRICE);
          setExpansion(true);
          deactivateItem(e, "buy-expansion-button");
          activateItem("freighters");
          activateItem("freighters-craft");
        } break;
      case 'contract':
        if (checkBalance(CONTRACT_BUY_PRICE)) {
          setMoney(money - CONTRACT_BUY_PRICE);
          setContract(true);
          activateItem("deals-bottle");
          activateItem("deals-bag");
          deactivateItem(e, "buy-contract-button");
        } break;
      case 'deflation':
        if (checkBalance(DEFLATION_BUY_PRICE)) {
          setMoney(money - DEFLATION_BUY_PRICE);
          deactivateItem(e, "buy-deflation-button");
          increaseMarketItemsBy(2);
        } break;
      default:
        break;
    }
  }

  function craftItem(item) {
    switch (item) {
      case 'coffee':
        if (water >= 1 && beans >= 2) {
          setWater(water - 1);
          setBeans(beans - 2);
          setCoffee(coffee + 1);
        } break;
      case 'crate':
        if (coffee >= 20) {
          setCrates(crates + 1);
          setCoffee(coffee - 20);
        } break;
      case 'containers':
        if (crates >= 5) {
          setContainer(containers + 1);
          setCrates(crates - 5);
        } break;
      case 'freighters':
        if (containers >= 5) {
          setFreighters(freighters + 1);
          setContainer(containers - 5);
        } break;
      default:
        break;
    } 
  }

  function sellItem(item) {
    switch (item) {
      case 'coffee':
        if(coffee > 0) {
          setMoney(money + COFFEE_SELL_PRICE);
          setCoffee(coffee - 1);
        } break;
      case 'crate':
        if (crates > 0) {
          setMoney(money + CRATE_SELL_PRICE);
          setCrates(crates - 1);
        } break;
      case 'containers':
        if (containers > 0) {
          setMoney(money + CONTAINER_SELL_PRICE);
          setContainer(containers - 1);
        } break;
      case 'freighters':
        if (freighters > 0) {
          setMoney(money + FREIGHTER_SELL_PRICE);
          setFreighters(freighters - 1);
        } break;
      default: 
        break;
    }
  }

  function autoBrew() {
    if (water < (beans / 2)) {
      setCoffee(water);
      setBeans(beans - (water * 2));
      setWater(0);
    } 
    else if (water >= (beans / 2)) {
      setCoffee(Math.floor(beans / 2));
      setWater(water - Math.floor(beans / 2));
      setBeans(beans % 2);
    } 
    else {
      //
    }
  }

  return(
    <div className='Game'>
      <div className='Stats'>
        <h1>Money: {money.toFixed(2)}???</h1>
        <h1>Profit: {(money - START_BUDGET).toFixed(2)}???</h1>
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
            <li>Freighters: {freighters}</li>
          </ul>
        </div>
      </div>

      <div className='Business'>
        <div className='Market'>
        <h1>Market</h1>
          <div className='ingredients'>
            <div className='item'>
              <h4>Water</h4>
              <img src={img_water} alt="Water"/>
              <button onClick={() => handleTransactionMarket('water', true)}>Buy {AMOUNT_WATER}</button>
              <p>Price: {WATER_BUY_PRICE}???</p>
              <button onClick={() => handleTransactionMarket('water', false)}>Sell 1</button>
              <p>Price: {WATER_SELL_PRICE.toFixed(2)}???</p>
              {priceUpdate ? (<p id="salesprice">+15% On Sales</p>) : (<></>)}
            </div>

            <div className='item'>
              <h4>Beans</h4>
              <img src={img_beans} alt="Beans"/>
              <button onClick={() => handleTransactionMarket('beans', true)}>Buy {AMOUNT_BEANS}</button>
              <p>Price: {BEANS_BUY_PRICE}???</p>
              <button onClick={() => handleTransactionMarket('beans', false)}>Sell 1</button>
              <p>Price: {BEANS_SELL_PRICE.toFixed(2)}???</p>
              {priceUpdate ? (<p id="salesprice">+15% On Sales</p>) : (<></>)}
            </div>
          </div>
        </div>

        <div className='Store'>
          <h1>Store</h1>
          <div className='sellables'>
            <div className='item'>
              <h4>Coffee</h4>
              <img src={img_cup} alt="Coffee"/>
              <button onClick={() => sellItem('coffee')}>Sell 1</button>
              <p>Sell for {COFFEE_SELL_PRICE.toFixed(2)}???</p>
              {priceUpdate ? (<p id="salesprice">+15% On Sales</p>) : (<></>)}
            </div>

            <div className='item'>
              <h4>Crates</h4>
              <img src={img_crate} alt="Crate"/>
              <button onClick={() => sellItem('crate')}>Sell 1</button>
              <p>Sell for {CRATE_SELL_PRICE.toFixed(2)}???</p>
              {priceUpdate ? (<p id="salesprice">+15% On Sales</p>) : (<></>)}
            </div>

            <div className='item'>
              <h4>Containers</h4>
              <img src={img_container} alt="Container"/> 
              <button onClick={() => sellItem('containers')}>Sell 1</button>
              <p>Sell for {CONTAINER_SELL_PRICE.toFixed(2)}???</p>
              {priceUpdate ? (<p id="salesprice">+15% On Sales</p>) : (<></>)}
            </div>

            <div id="freighters" className='item deactivated'>
              <h4>Freighters</h4>
              <img src={img_freighter} alt="Freighter"/> 
              {expansion ? (
              <button id="buy-freighters-button" onClick={() => sellItem('freighters')}>Sell 1</button>
              ) : (
              <button id="buy-freighters-button" onClick={() => sellItem('freighters')} disabled="true">Sell 1</button>
              )}
              <p>Sell for {FREIGHTER_SELL_PRICE.toFixed(2)}???</p>
              {priceUpdate ? (<p id="salesprice">+15% On Sales</p>) : (<></>)}
            </div>
          </div>
        </div>

        <div className='Deals'>
          <h1>Deals</h1>
          <div className='dealables'>
            <div id="deals-bottle" className='item deactivated'>
              <h4>Water Bottle</h4>
              <p className="description">(100 Water)</p>
              <img src={img_bottle} alt="Bottle"/>
              {contract ? (
              <button id="bottle-button" onClick={(event) => handleTransactionItems('bottle', event)}>Buy</button>
              ) : (
              <button id="bottle-button" onClick={(event) => handleTransactionItems('bottle', event)} disabled="true">Buy</button>
              )}
              <p>Buy for {BOTTLE_BUY_PRICE}???</p>
            </div>

            <div id="deals-bag" className='item deactivated'>
              <h4>Bean Bag</h4>
              <p className='description'>(200 Beans)</p>
              <img src={img_bag} alt="Bean Bag"/>
              {contract ? (
              <button id="bag-button" onClick={(event) => handleTransactionItems('bag', event)}>Buy</button>
              ) : (
              <button id="bag-button" onClick={(event) => handleTransactionItems('bag', event)} disabled="true">Buy</button>
              )}
              <p>Buy for {BAG_BUY_PRICE}???</p>
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
              <img src={img_cup} alt="Coffee"/>
              <button onClick={() => craftItem('coffee')}>Craft</button>
              <p>1 Water | 2 Beans</p>
              {brewing ? (
                <button id="autobrew-button" onClick={autoBrew}>Autobrew</button>) : (<></>)}
            </div>

            <div className='item'>
              <h4>Crate</h4>
              <img src={img_crate} alt="Crate"/>
              <button onClick={() => craftItem('crate')}>Craft</button>
              <p>20 Coffee</p>
            </div>

            <div className='item'>
              <h4>Container</h4>
              <img src={img_container} alt="Container"/>
              <button onClick={() => craftItem('containers')}>Craft</button>
              <p>5 Crates</p>
            </div>

            <div id="freighters-craft" className='item deactivated'>
              <h4>Freighters</h4>
              <img src={img_freighter} alt="Freighter"/>
              {expansion ? (
              <button id="buy-freighters-button-craft" onClick={() => craftItem('freighters')}>Craft</button>
              ) : (
              <button id="buy-freighters-button-craft" onClick={() => craftItem('freighters')} disabled="true">Craft</button>)
              }
              <p>5 Containers</p>
            </div>
          </div>
        </div>

        <div className='Upgrades'>
          <h1>Upgrades</h1>
          <div className='upgradeables'>
            <div className='item'>
              <h4>Automatic Brewing</h4>
              <img src={img_auto_brew} alt="Automatic Brewing"/>
              <button id="buy-brew-button" onClick={(event) => handleTransactionItems('auto_brew', event)}>Buy</button>
              <p>Buy for {AUTO_BREW_PRICE}???</p>
              <p className='description'>(Crafts Coffee <br/> Using Items In Stock)</p>
            </div>

            <div className='item'>
              <h4>Deflation</h4>
              <img src={img_money} alt="Deflation"/>
              <button id="buy-deflation-button" onClick={(event) => handleTransactionItems('deflation', event)}>Buy</button>
              <p>Buy for {DEFLATION_BUY_PRICE}???</p>
              <p className='description'>(Increases Amount Of Water And Beans <br/> In The Market)</p>
            </div>

            <div className='item'>
              <h4>Supplier Contract</h4>
              <img src={img_contract} alt="Shop"/>
              <button id="buy-contract-button" onClick={(event) => handleTransactionItems('contract', event)}>Buy</button>
              <p>Buy for {CONTRACT_BUY_PRICE}???</p>
              <p className='description'>(Unlocks Deals)</p>
            </div>

            <div className='item'>
              <h4>Expansion</h4>
              <img src={img_earth} alt="Earth"/>
              <button id="buy-expansion-button" onClick={(event) => handleTransactionItems('expansion', event)}>Buy</button>
              <p>Buy for {EXPANSION_BUY_PRICE}???</p>
              <p className='description'>(Unlocks Freighters Item)</p>
            </div>

            <div className='item'>
              <h4>A New Shop</h4>
              <img src={img_shop} alt="Shop"/>
              <button id="buy-shop-button" onClick={(event) => handleTransactionItems('shop', event)}>Buy</button>
              <p>Buy for {SHOP_BUY_PRICE}???</p>
              <p className='description'>(Increases Sales Prices By <br/> 15%)</p>
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
              <img src={img_car} alt="Car"/>
              <button onClick={(event) => handleTransactionItems('car', event)}>Buy</button>
              <p>Buy for {CAR_BUY_PRICE}???</p>
            </div>

            <div className='item'>
              <h4>A New House</h4>
              <img src={img_house} alt="House"/>
              <button onClick={(event) => handleTransactionItems('car', event)}>Buy</button>
              <p>Buy for {HOUSE_BUY_PRICE}???</p>
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
