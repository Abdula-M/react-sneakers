import AppContext from "../../context"
import Card from "../Card/Card"
import React from "react"
import Info from "../Info"

const Favorites = ({items, onAddtoFavorite, onAddtoCart}) => {
    let key = 0
    const {favorites} = React.useContext(AppContext)
    return (

          <div>
            <h1>Мои закладки</h1>
              <div className=' d-flex justify-around flex-wrap'>
              {favorites.length > 0 ? favorites.map(item => {
                return <Card
                onFavorite={onAddtoFavorite}
                onPlus={onAddtoCart}
                key={key++} {...item}
                favorited={true}
                />
              }) : <div className="mt-30">
                  <Info title={"Закладок нет :("} image={"img/empty-cart.svg"} description={"Вы ничего не добавляли в закладки"}/>
                </div>}  
              </div>
          </div>
    )
}

export default Favorites