import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './OtherPage'

function App() {
  return (
    <Router>
      <div className="App">

          <img src={logo} className="App-logo" alt="logo" />
         <h1>React K8's TravisCi Deployment</h1>
         <Link to="/">Home</Link>
         <Link to="/otherpage">Other Page</Link>
        
        <div>
          <Route exact path='/' component={Fib}/>
          <Route path="/otherpage" component={OtherPage}/>

          
        </div>
      </div>
    </Router>
  );
}

export default App;
