const objection = require('objection');
const Model = objection.Model;

class Room extends Model {
    static get tableName() {
        return 'room';
    }

    static get relationMappings() {
        return {
            dorm: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./dorm'),
                join: {
                    from: 'room.id',
                    to: 'dorm_id'
                }
            }
        };
    }
}

module.exports = {Room};