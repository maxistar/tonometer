import DashboardApp from "./DashboardApp";

import socketIOClient from "socket.io-client";
import {Component} from "react";

class DashboardAppContainer extends Component {
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
            <DashboardApp data={response} />
        );
    }
}
export default DashboardAppContainer;