import './index.css'

const Header = ({cartCount, restaurantName}) => (
  <div className="heading-myorder-part">
    <h1 className="heading-text">{restaurantName}</h1>
    <div className="myorder-cartcount-container">
      <p className="my-order-text">My Orders</p>
      <div className="cart-count-container">
        <p className="cart-count">{cartCount}</p>
      </div>
    </div>
  </div>
)

export default Header
