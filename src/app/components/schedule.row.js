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

class ScheduleRow extends React.Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
    }

    delete() {
        this.props.delete(this.props.row);
    }

    render() {
        return(
            <TableRow selectable={false} key={this.props.key}>
                <TableRowColumn>
                    { this.props.row.title }
                </TableRowColumn>
                <TableRowColumn>
                    { this.props.row.description }
                </TableRowColumn>
                <TableRowColumn>
                    { this.props.row.startTime }
                </TableRowColumn>
                <TableRowColumn>
                    { this.props.row.endTime }
                </TableRowColumn>
                <TableRowColumn>
                    { this.props.row.duration } (mins)
                </TableRowColumn>
                <TableRowColumn>
                    { this.props.row.genre}
                    <a className="link pull-right" onClick={this.delete}>
                        DELETE
                    </a>
                </TableRowColumn>
            </TableRow>
        )
    }
}

export default ScheduleRow;