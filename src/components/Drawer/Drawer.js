import './drawer.scss'
import React from 'react'
import Info from '../Info'
import axios from 'axios'
import AppContext from '../../context'


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


const Drawer = ({onClose, onDelete, items = [], setCartItems}) => {

    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const {cartItems} = React.useContext(AppContext)
    let totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post("https://7875d083888841e4.mokky.dev/orders", {items: cartItems})            
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i]
                await axios.delete(`https://7875d083888841e4.mokky.dev/cart/${item.id}`)
                await delay(1000)
            }
        } catch (error) {
            alert("Ошибка при оформлении заказа!")
        }
        setIsLoading(false)
    }
    
    return (
        <div className="overlay">
            <div className="drawer d-flex flex-column">
                <h2 className='mb-30 d-flex justify-between'>Корзина <img onClick={onClose} className='removeBtn' src="img/btn-remove.svg" alt="remove" /></h2>
                {
                    items.length > 0 ? 
                    <div>
                        <div className="items">
                        {items.map(item => (
                            <div key={item.id} className="cartItem d-flex align-center mb-20">
                                <div style={{backgroundImage: `url(${item.imageUrl})`}} className="cartItemImg"></div>
                                <div className='mr-20 flex'>
                                <p className="mb-5">{item.title}</p>
                                <b>{item.price} руб.</b>
                                </div>
                                <img onClick={() => onDelete(item.id)} className='removeBtn' src="img/btn-remove.svg" alt="" />
                            </div>
                        ))}
                    </div>
                    
                    <div className='cartTotalBlock'>
                        <ul>
                            <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>{totalPrice} руб.</b>
                            </li>
                            <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>{Math.round(totalPrice * 0.05)} руб.</b>
                            </li>
                        </ul>
                        <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>Оформить заказ <img src="img/arrow.svg" alt="arrow" /></button>
                    </div>
                    </div>
                    :
                    <Info onClose={onClose} image={isOrderComplete ? "img/order.svg" :"img/empty-cart.svg"} 
                    title={isOrderComplete ?"Заказ оформлен!" :"Корзина пустая"} 
                    description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` 
                    :"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}/>
                }
            </div>
        </div>
    )
}

export default Drawer