import React from 'react';
import io from 'socket.io-client';

const socket = io('/counter');

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 1
        };
        var appThis = this;
        socket.on('api.v1.test', function(data) {
            console.log('Got api.v1.test');
            console.log(data);
            appThis.setState({
                counter: data.counter
            });
        });

    }

    render() {
        return(
            <div className="jumbotron">
                <h1>DEMO APP</h1>
                <div className="alert alert-primary" role="alert">
                    counter { this.state.counter}
                </div>
            </div>
        )
    }
}

export default App;