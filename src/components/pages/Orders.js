import Card from "../Card/Card"
import React from "react"
import Info from "../Info"
import axios from "axios"

const Orders = ({items, onAddtoFavorite, onAddtoCart}) => {
    let key = 0
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    

    React.useEffect(() => {
      try {
        ( async () => {
          const {data} =  await axios.get("https://7875d083888841e4.mokky.dev/orders")
          let arr = data.reduce((prev, obj) => [...prev, ...obj.items], [])
          setOrders(arr)
          setIsLoading(false)
          
        })()
      } catch (error) {
        alert("Ошибка при получении заказов")
      }
    }, [])


    return (
          <div>
            <h1>Мои заказы</h1>
              <div className=' d-flex justify-around flex-wrap'>
                {orders.length > 0 ? (isLoading ? [...Array(8)] : orders).map(item => {
                  return <Card
                  onFavorite={onAddtoFavorite}
                  onPlus={onAddtoCart}
                  key={key++} {...item}
                  loading={isLoading}
                  />
                }) : <div className="mt-30">
                <Info title={"У вас нет закзов :("} image={"img/empty-cart.svg"} description={"Вы нищеброд? Оформите хотя бы один заказ."}/>
                  </div>}  
              </div>
          </div>
    )
}

export default Orders