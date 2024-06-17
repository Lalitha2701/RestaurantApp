import './index.css'

const FoodCategory = ({categoryDetails, cart, updateCart}) => (
  <ul>
    {categoryDetails.categoryDishes.map(eachCategory => {
      const {
        dishId,

        dishName,

        dishPrice,

        dishDescription,

        dishCalories,

        dishImage,

        dishCurrency,

        dishAvailability,

        addonCat,
      } = eachCategory

      const count = cart[dishId] || 0

      const handleIncrement = () => updateCart(dishId, 1)

      const handleDecrement = () => updateCart(dishId, -1)

      return (
        <li key={dishId} className="category-item">
          <div className="category-item-container">
            <div className="dish-content-part">
              <h1>{dishName}</h1>

              <p>{`${dishCurrency} ${dishPrice}`}</p>

              <p>{dishDescription}</p>

              <p>{`${dishCalories} Calories`}</p>

              {addonCat && <p>Customizations available</p>}

              {!dishAvailability && <p>Not available</p>}
            </div>

            <div className="button-container">
              {dishAvailability && (
                <>
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={count === 0}
                  >
                    -
                  </button>

                  <p>{count}</p>

                  <button type="button" onClick={handleIncrement}>
                    +
                  </button>
                </>
              )}
            </div>

            <div className="calories-image-container">
              <img src={dishImage} alt={dishName} className="dish-image" />
            </div>
          </div>
        </li>
      )
    })}
  </ul>
)

export default FoodCategory
