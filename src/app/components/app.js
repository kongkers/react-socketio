import React from 'react';
import io from 'socket.io-client';
import Axios from 'axios';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import AddSchedule from './add.schedule';
import ScheduleRow from './schedule.row';
import ErrorAlert from './error.alert';

const socket = io();

var removeSchedule =  function(schedules, scheduleId) {
    var len = schedules.length;
    for(var i=0; i<len; i++) {
        if(schedules[i]._id === scheduleId) {
            schedules.splice(i, 1);
            return;
        }
    }
};

class App extends React.Component {
    
    getSchedule() {
        var appThis = this;
        Axios.get('/api/v1/schedules').then(function(response) {
            appThis.setState({
                schedules: response.data.schedules
            });
        }).catch(function(err) {
            appThis.setState({
                errorMessage: err.response.data.message
            });
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            schedules: [],
            errorMessage: ''
        };

        var appThis = this;
        socket.on('api.v1.schedule.created', function(data) {
            var schedules = appThis.state.schedules;
            schedules.push(data.schedule);
            appThis.setState({
                schedules: schedules
            });
        });

        socket.on('api.v1.schedule.deleted', function(data) {
            var schedules = appThis.state.schedules;
            removeSchedule(schedules, data.scheduleId);
            appThis.setState({
                schedules: schedules
            });
        });

        this.addSchedule = this.addSchedule.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.delete = this.delete.bind(this);
        this.getSchedule();

    }

    addSchedule() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    delete(row) {
        var appThis = this;
        Axios({
            method: 'delete',
            url: `/api/v1/schedules/${row._id}`
        }).then(function(response) {

        }).catch(function(err) {
            appThis.setState({
                errorMessage: err.response.data.message
            });
        });
    }

    render() {
        return(
            <div className="container">
                <ErrorAlert message={this.state.errorMessage}></ErrorAlert>
                <div className="row mt-20">
                    <div className="col-md-12">
                        <RaisedButton onClick={this.addSchedule} label="ADD SCHEDULE" primary={true}></RaisedButton>
                    </div>
                </div>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                TITLE
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                DESCRIPTION
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                START
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                END
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                DURATION
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                GENRE
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {
                            this.state.schedules.map(row => {
                                return(<ScheduleRow key={row._id} row={row} delete={this.delete} />)
                            }, this)
                        }
                    </TableBody>
                </Table>
                <AddSchedule open={this.state.open} handleClose={this.handleClose}></AddSchedule>
            </div>
        )
    }
}

export default App;