import './index.css'

const FoodTab = ({tabDetails, isActive, setActiveCategory}) => {
  const {menuCategory} = tabDetails

  const handleClick = () => setActiveCategory(menuCategory)

  return (
    <li className={`tab-item-name ${isActive ? 'active' : ''}`}>
      <button type="button" className="tab-button" onClick={handleClick}>
        {menuCategory}
      </button>
    </li>
  )
}

export default FoodTab
