import DashboardApp from "./DashboardApp";

import socketIOClient from "socket.io-client";
import {Component} from "react";

class DashboardAppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            priceData: false,
            endpoint: ''
        };
    }
    componentDidMount() {
        fetch("/api/info")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    response: data
                });
                this.loadPricesData();
                this.setupUpdate();
            });
    }

    loadPricesData() {
        fetch("/api/prices")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    priceData: data
                });
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
        const { response, priceData } = this.state;
        return (
            <DashboardApp data={response} priceData={priceData} />
        );
    }
}
export default DashboardAppContainer;