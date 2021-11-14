import logo from './logo.svg';
import './App.css';
import socketIOClient from "socket.io-client";
import {Component} from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: process.env.BACKEND_URL
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <div style={{ textAlign: "center" }}>
              {response
                  ? <p>
                    Last Block: {response}
                  </p>
                  : <p>Loading...</p>}
            </div>
          </header>
        </div>
    );
  }
}
export default App;
