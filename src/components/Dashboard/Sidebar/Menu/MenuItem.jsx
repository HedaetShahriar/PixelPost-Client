import { NavLink } from 'react-router'

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 md:py-4 lg:py-2 py-2 md:my-2 my-1 rounded-xl md:rounded-full lg:rounded-2xl lg:my-5  transition-colors duration-300 transform md:hover:${label} hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
        }`
      }
    >
      <Icon className='md:w-8 md:h-8 w-5 h-5 lg:w-6 lg:h-6' />

      <span
        className="overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out max-w-0 opacity-0 lg:max-w-[200px] lg:opacity-100 mx-0 lg:mx-4"
      >
        {label}
      </span>
    </NavLink>
  )
}

export default MenuItem
