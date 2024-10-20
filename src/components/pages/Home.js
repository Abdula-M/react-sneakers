import Card from "../Card/Card"

const Home = ({items, cartItems, searchValue, setSearchValue, onAddtoCart, onAddtoFavorite, onChangeSearchInput, isLoading}) => {
    let key = 0
    const renderItems = () => {
      const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue))
      return (isLoading ? [...Array(8)] : filteredItems).map((item) =>(
        <Card
            onFavorite={onAddtoFavorite}
            onPlus={onAddtoCart}
            added = {cartItems.some(obj => obj.id === item.id)}
            loading={isLoading}
            key={key++} {...item}/>
      )
    )
    }
    return (
      
        <div>
          <div className='slider'>
            <img src="img/Group.png" alt="" />
            <button className='slider_btn'>Купить</button>
          </div>
            <div className='mb-10 d-flex align-center justify-between'>
          <h1>{searchValue ? `Поиск по: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex align-center">
            <img src="img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} value={searchValue} maxLength={45} type="text" placeholder='Поиск' />
            {searchValue ? <img onClick={() => setSearchValue('') } width={23} height={23} className='cu-p removeBtn' src="img/btn-remove.svg" alt="remove"/> : null}
          </div>
        </div>      
        <div className=' d-flex justify-around flex-wrap'>
          {renderItems()}
        </div>   
        </div>
    )
}

export default Home