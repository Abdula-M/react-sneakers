
const Info = ({title, description, onClose, image}) => {
    return (
        <div className="cartEmty d-flex align-center justify-center flex-column flex">
            <img width={120}  className='mb-20' src={image} alt="empty-cart" />
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={onClose} className='greenButton'>
                <img  src="img/arrow.svg" alt="arrow" />
                Вернуться назад
            </button>
        </div>
)
}

export default Info