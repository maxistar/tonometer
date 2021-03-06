import socketIOClient from "socket.io-client";
import {Component} from "react";

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      endpoint: ''
    };
  }
  componentDidMount() {
      fetch("/api/info")
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
              this.setState({
                  response: data
              });
              this.setupUpdate();
          });
  }

  setupUpdate() {
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on(
          "FromAPI",
          data => this.setState({ response: data }));
  }

  render() {
    const { response } = this.state;
    return (
        <div>
            <div style={{ textAlign: "center" }}>
              {response
                  ? <p>
                    Last Block: {response._creatorstats_mc_cnt2048}
                  </p>
                  : <p>Loading...</p>}
            </div>
        </div>
    );
  }
}
export default Status;
