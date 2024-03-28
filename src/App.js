import './App.css';
// import ChangeLanguage from './components/ChangeLanguage';
import Header from './components/Header';
// import TrackingForm from './components/TrackingForm';
import TrackingResults from './components/TrackingResults';

function App() {
  return (
    <div className="App">
        <Header/>
        {/* <ChangeLanguage/> */}
        {/* <TrackingForm/> */}
        <TrackingResults/>
    </div>
  );
}

export default App;
