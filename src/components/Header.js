import './header.css'
import Logo from '../assets/Bosta-logo.png'

function Header() {
  return (
    <div className='Header'>

      <div className='Logo'>
        <a>
          <img src={Logo} alt='Logo' />
        </a>
        <p>Bosta</p>
      </div>

      <div className='Header-center'>
        <ul>
          <li>Main</li>
          <li>Prices</li>
          <li>Sales</li>
        </ul>
      </div>

      <div className='Header-right'>
        <button>track ship</button>
        <button>log in</button>
        <button>En</button>
      </div>


    </div>
  )
}

export default Header