import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './react-components/Navigation/NavigationBar';
import ButtonBody from './react-components/ButtonBody/ButtonBody';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <ButtonBody/>
    </div>
  );
}

export default App;
