'use strict';

module.exports = function(app) {
    var all = require('../../app/controllers/all');
    app.route('/').get(all.index);

    app.route('/api/v1/schedules')
        .get(all.list)
        .post(all.create);
    
    app.route('/api/v1/schedules/:scheduleId')
        .delete(all.delete);
};