import './card.scss'
import React from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from '../../context'

const Card = ({id, title, price, imageUrl, onPlus, onFavorite, favorited = false, loading = false}) => { 
  const [isFavorite, setIsFavorite] = React.useState(favorited)
  const {isItemAdded} = React.useContext(AppContext)

  const onClickPlus = () => {
    onPlus({id, title, price, imageUrl})
  }
  const onClickFavorite = () => {
    onFavorite({id, title, price, imageUrl})
    setIsFavorite(!isFavorite)
  }

    return (
        <div className="card mt-25 ">
          {loading ? <ContentLoader
            speed={2}
            width={155}
            height={235}
            viewBox="0 0 150 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="130"/>
            <rect x="0" y="167" rx="5" ry="5" width="150" height="15"/>
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
            <rect x="0" y="234" rx="5" ry="5" width="80" height="25"/>
            <rect x="118" y="230" rx="10" ry="10" width="32" height="32"/>
          </ContentLoader> : 
          <>
            <div className="favorite">
                <img onClick={onClickFavorite} src={isFavorite ? "img/heart-liked.svg":"img/heart-unliked.svg"} alt="unliked" />
              </div>
              <img width={133} height={112} src={imageUrl} alt="sneaker-card" />
              <h5>{title}</h5>
              <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                  <span>Цена</span>
                  <b>{price} руб.</b>
                </div>
                  <img onClick={onClickPlus} src={isItemAdded(title) ? "img/btn-checked.svg" : "img/btn-plus.svg"} alt="add" />
              </div>
          </>}
        </div>
            
    )
}

export default Card


