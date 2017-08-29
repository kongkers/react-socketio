import React from 'react';

class ErrorAlert extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.message === '') {
            var open = false;
        }
        else {
            var open = true;
        }
        this.setState({
            open: open
        });
    }

    render() {
        if(this.state.open) {
            return (
                <div className="alert alert-danger">{this.props.message}</div>
            )
        }
        else return (null)
    }

}

export default ErrorAlert;