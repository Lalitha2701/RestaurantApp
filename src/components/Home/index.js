import {Component} from 'react'

import Header from '../Header'
import FoodTab from '../FoodTab'
import FoodCategory from '../FoodCategory'
import './index.css'

class Home extends Component {
  state = {
    foodDetails: [],
    activeCategory: '',
    cart: {},
    restaurantName: '',
  }

  componentDidMount() {
    this.getFoodDetails()
  }

  getFoodDetails = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e',
    )
    const data = await response.json()

    const array = data.map(each => ({
      tableMenuList: each.table_menu_list,
      restaurantName: each.restaurant_name,
    }))

    const totalDetails = array[0]
    const {tableMenuList, restaurantName} = totalDetails

    const formattedData = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes.map(eachCategory => ({
        dishId: eachCategory.dish_id,
        dishName: eachCategory.dish_name,
        dishPrice: eachCategory.dish_price,
        dishImage: eachCategory.dish_image,
        dishCurrency: eachCategory.dish_currency,
        dishCalories: eachCategory.dish_calories,
        dishDescription: eachCategory.dish_description,
        dishAvailability: eachCategory.dish_Availability,
        dishType: eachCategory.dish_type,
        nexturl: eachCategory.nexturl,
        addonCat: eachCategory.addonCat,
      })),
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nexturl: each.nexturl,
    }))

    this.setState({
      foodDetails: formattedData,
      activeCategory: formattedData[0]?.menuCategory || '',
      restaurantName,
    })
  }

  setActiveCategory = category => {
    this.setState({activeCategory: category})
  }

  updateCart = (dishId, change) => {
    this.setState(prevState => {
      const cart = {...prevState.cart}
      const currentCount = cart[dishId] || 0
      const newCount = currentCount + change
      if (newCount > 0) {
        cart[dishId] = newCount
      } else {
        delete cart[dishId]
      }
      return {cart}
    })
  }

  render() {
    const {foodDetails, activeCategory, cart, restaurantName} = this.state
    const activeCategoryDetails = foodDetails.find(
      category => category.menuCategory === activeCategory,
    )
    const totalCount = Object.values(cart).reduce((a, b) => a + b, 0)

    return (
      <div className="app-container">
        <Header cartCount={totalCount} restaurantName={restaurantName} />
        <div className="food-details-container">
          <ul className="tabs-list">
            {foodDetails.map(eachTab => (
              <FoodTab
                key={eachTab.menuCategoryId}
                tabDetails={eachTab}
                isActive={eachTab.menuCategory === activeCategory}
                setActiveCategory={this.setActiveCategory}
              />
            ))}
          </ul>
          <div className="category-details-list">
            {activeCategoryDetails && (
              <FoodCategory
                categoryDetails={activeCategoryDetails}
                cart={cart}
                updateCart={this.updateCart}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
