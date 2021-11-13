const pg = require('pg');
const objection = require('objection');
const Model = objection.Model;

class Room extends Model {
    static get tableName() {
        return 'Room';
    }

    static get relationMappings() {
        return {
            dorm: {
                relation: Model.HasOneRelation,
                modelClass: Dorm,
            }
        };
    }
}
    module.exports = {Room};