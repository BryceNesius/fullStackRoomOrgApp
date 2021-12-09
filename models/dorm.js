const {Model} = require("objection");
const {school} = require('./school.js');
const {room_furniture} = require('./room_furniture.js');


class Dorm extends Model {
    static get tableName() {
        return 'dorm';
    }
    static get relationMappings() {
        return {
            school_id: {
                relation: Model.BelongsToOneRelation,
                modelClass: school,
                join: {
                    from: 'dorm.school_id',
                    to: 'school.school_id'
                }
            }, // end relationship

            room_furniture_dorm: {
                relation: Model.HasManyRelation,
                modelClass: room_furniture,
                join: {
                    from: 'dorm.dorm_id',
                    to: 'room_furniture.dorm_id'
                }
            }
        } // end return
    } // end relationMappings
} // end class dorm

module.exports = { Dorm };