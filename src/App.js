import './App.scss';
import {Route, Routes} from 'react-router-dom'
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './components/pages/Home';
import Favorites from './components/pages/Favorites';
import React from 'react';
import axios from 'axios'
import AppContext from './context';
import Orders from './components/pages/Orders';

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get("https://66e20782c831c8811b570051.mockapi.io/cart")
      const favoritesResponse = await axios.get("https://66e427f3d2405277ed1350a3.mockapi.io/favorites")
      const itemsResponse = await axios.get("https://66e20782c831c8811b570051.mockapi.io/items")

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()
  }, [])


  const onAddtoCart = async (obj) => {
    try {
        const findItem =  cartItems.find(item => Number(item.id) === Number(obj.id))
      if (findItem) {
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
        axios.delete(`https://66e20782c831c8811b570051.mockapi.io/cart/${obj.id}`)
      } else {
        const {data} = await axios.post("https://66e20782c831c8811b570051.mockapi.io/cart", obj)
        setCartItems(prev => [...prev, data])
      }
    } catch (error) {
      alert("Не удалось добавить в корзину")
    }
  }
  const onAddtoFavorite = async (obj) => {
    try {
      if (favorites.find(item => item.id === obj.id)) {
        axios.delete(`https://66e427f3d2405277ed1350a3.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => item.id !== obj.id))
      } else{
        const {data} = await axios.post("https://66e427f3d2405277ed1350a3.mockapi.io/favorites", obj)
        console.log(data)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в закладки')
    }
  }

  const onDeletetoCart = (id) => {
    const findItem =  cartItems.find(item => Number(item.id) === Number(id))
    setCartItems(prev => prev.filter(item => item.id !== id))
    axios.delete(`https://66e20782c831c8811b570051.mockapi.io/cart/${findItem.id}`)

  }
  
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.parentId === id)
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded}}>
      <div className="wrapper clear">      
        <Header onClickCart={() => setCartOpened(true)}/>
        {cartOpened && <Drawer cartItems={cartItems} setCartItems={setCartItems} onDelete={onDeletetoCart} items={cartItems} onClose={() => setCartOpened(false)}/>}
        <div className="content p-40">
          <Routes>
            <Route path='/' element={
              <Home items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddtoFavorite={onAddtoFavorite}
              onAddtoCart={onAddtoCart}
              isLoading={isLoading}
              />
              }>
            </Route>
            <Route path='/favorites' element={<Favorites 
            items={favorites}
            onAddtoFavorite={onAddtoFavorite}
            onAddtoCart={onAddtoCart}
            />}/>

            <Route path='/orders' element={<Orders
            items={items}/>}/>
          </Routes>   
        </div>
      </div>
    </AppContext.Provider>
    
  );
}

export default App;
