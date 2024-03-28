import './header.css';
import Logo from '../assets/Bosta-logo.png';
import TrackingForm from './TrackingForm';
import ChangeLanguage from './ChangeLanguage';


function Header() {
  return (
    <div className='Header'>

      <div className='Logo'>
        <a href='#'>
          <img src={Logo} alt='Logo' />
        </a>
        <p>Bosta</p>
      </div>

      <div className='Header-center'>
        <ul>
          <li><a href='#'>Main</a></li>
          <li><a href='#'>Prices</a></li>
          <li><a href='#'>Sales</a></li>
        </ul>
      </div>

      <div className='Header-right'>
        <TrackingForm/>
        <button>log in</button>
        <ChangeLanguage className='ChangeLanguage'/>
      </div>


    </div>
  )
}

export default Header