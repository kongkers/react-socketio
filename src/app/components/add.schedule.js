import React from 'react';
import io from 'socket.io-client';
import Axios from 'axios';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Button from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import ErrorAlert from './error.alert';

const genres = ['Action', 'News', 'Sport', 'Lifestyle'];

class AddSchedule extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            schedule: {
                title: '',
                description: '',
                genre: 'Action',
                startTime: moment().toDate(),
                endTime: moment().add(1, 'hour').toDate(),
                startDate: moment().toDate()
            },
            errors: {
                title: '',
                description: ''
            },
            errorMessage: ''
        }
        this.genreChanged = this.genreChanged.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.descriptionChanged = this.descriptionChanged.bind(this);
        this.close = this.close.bind(this);
        this.createSchedule = this.createSchedule.bind(this);
        this.endTimeChanged = this.endTimeChanged.bind(this);
        this.startTimeChanged = this.startTimeChanged.bind(this);
        this.checkForm = this.checkForm.bind(this);
        this.idChanged = this.idChanged.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.open) {
            var schedule = {
                id: 1,
                title: '',
                description: '',
                genre: 'Action',
                startTime: moment().toDate(),
                endTime: moment().add(1, 'hour').toDate(),
                startDate: moment().toDate()
            };

            var errors = {
                title: '',
                description: '',
                id: ''
            };

            this.setState({
                schedule: schedule,
                errors: errors,
                errorMessage: ''
            });
        }
    }

    close() {
        this.props.handleClose();
    }

    titleChanged(event) {
        var schedule = this.state.schedule;
        var errors = this.state.errors;

        schedule.title = event.target.value;
        if(schedule.title) {
            errors.title = '';
        }
        this.setState({
            schedule: schedule,
            errors: errors
        });
    }

    idChanged(event) {
        var schedule = this.state.schedule;
        var errors = this.state.errors;

        schedule.id = event.target.value;
        if(schedule.id) {
            errors.id = '';
        }
        this.setState({
            schedule: schedule,
            errors: errors
        });
    }

    descriptionChanged(event) {
        var schedule = this.state.schedule;
        var errors = this.state.errors;

        schedule.description = event.target.value;
        if(schedule.description) {
            errors.description = '';
        }
        this.setState({
            schedule: schedule,
            errors: errors
        });

    }

    genreChanged(event, index, value) {
        var schedule = this.state.schedule;
        schedule.genre= value;
        this.setState({
            schedule: schedule
        });
    }

    startDateChanged(event, date) {
        var schedule = this.state.schedule;
        schedule.startDate = date;
        this.setState({
            schedule: schedule
        });
    }

    formatDate(date) {
        return moment(date).format('DD-MM-YYYY');
    }

    startTimeChanged(event, startTime) {
        var schedule = this.state.schedule;
        schedule.startTime = startTime;
        this.setState({
            schedule: schedule
        });

    }

    endTimeChanged(event, endTime ) {
        var schedule = this.state.schedule;
        schedule.endTime = endTime;
        this.setState({
            schedule: schedule
        });
    }

    checkForm() {
        var schedule = this.state.schedule;
        var errorCount = 0;
        var errors = {
            title: '',
            description: '',
            id: ''
        };

        if(!schedule.title) {
            errorCount++;
            errors.title = 'Please enter a title for this schedule.';
        }
        if(!schedule.description) {
            errorCount++;
            errors.description = 'Please enter a description for this schedule.';
        }
        this.setState({
            errors: errors
        });
        return errorCount;
    }

    createSchedule() {
        var errorCount = this.checkForm();
        if(!errorCount) {
            var schedule = this.state.schedule;
            var asThis = this;
            Axios({
                method: 'post',
                url: '/api/v1/schedules',
                data: schedule
            }).then(function(response) {
                asThis.props.handleClose();
            }).catch(function(err) {
                asThis.setState({
                    errorMessage: err.response.data.message
                });
            });
        }
    }

    render() {
        return (
            <Dialog open={this.props.open} onRequestClose={this.close}>
                <form>
                    <div className="modal-body">
                        <ErrorAlert message={this.state.errorMessage}></ErrorAlert> 
                        <div className="mt-10">
                            <TextField floatingLabelText="Id*" type="number" errorText={this.state.errors.id} fullWidth={false} value={this.state.schedule.id} onChange={this.idChanged} />
                        </div>
                        <div className="mt-10">
                            <TextField floatingLabelText="Title*" errorText={this.state.errors.title} fullWidth={true} value={this.state.schedule.title} onChange={this.titleChanged} />
                        </div>
                        <div className="mt-10">
                            <TextField floatingLabelText="Description*" errorText={this.state.errors.description} fullWidth={true} value={this.state.schedule.description} onChange={this.descriptionChanged} />
                        </div>
                        <div className="mt-10">
                            <SelectField floatingLabelText="Genre*" value={this.state.schedule.genre} onChange={this.genreChanged} maxHeight={200}>
                                {
                                    genres.map(function(genre, index) {
                                        return (<MenuItem value={genre} key={index} primaryText={genre}></MenuItem>)
                                    })
                                }
                            </SelectField>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <DatePicker floatingLabelText="Start Date" formatDate={this.formatDate} value={this.state.schedule.startDate} autoOk={true} onChange={this.startDateChanged}></DatePicker>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <TimePicker hintText="Start Time" autoOk={true} value={this.state.schedule.startTime} minutesStep={5} onChange={this.startTimeChanged}></TimePicker>
                            </div>
                            <div className="col-md-6">
                                <TimePicker hintText="End Time" autoOk={true} value={this.state.schedule.endTime} minutesStep={5} onChange={this.endTimeChanged}></TimePicker>
                            </div>
                        </div>
                        <div className="row mt-20">
                            <div className="col-md-12">
                                <RaisedButton onClick={this.createSchedule} className="pull-right" primary={true} label="CREATE SCHEDULE" />
                                <Button onClick={this.close} className="pull-right mr-5" label="CANCEL" />
                            </div>
                        </div>
                    </div>
                </form> 
            </Dialog>
        )
    }
}

export default AddSchedule;