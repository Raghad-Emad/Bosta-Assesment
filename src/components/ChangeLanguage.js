
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, selectLanguage } from '../features/languageSlice';

const ChangeLanguage = () => {
   const dispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  return (
    <div>
      <select id="language" value={currentLanguage} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </select>
      <br/>
      <br/>
    </div>
  );
};

export default ChangeLanguage;
