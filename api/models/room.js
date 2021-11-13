const pg = require('pg');
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
                modelClass: Dorm,
                join: {
                    from: 'Room.id',
                    to: 'dorm_id'
                }
            }
        };
    }
}

module.exports = {Room};