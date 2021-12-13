const { Model } = require("objection");
const { School } = require("./school.js");
const { room_furniture } = require("./room_furniture.js");

class Dorm extends Model {
  static get tableName() {
    return "dorm";
  }

  static get relationMappings() {
    return {
      school: {
        relation: Model.BelongsToOneRelation,
        modelClass: School,
        join: {
          from: "dorm.school_id",
          to: "school.school_id",
        },
      }, // end relationship

      room_furniture_dorm: {
        relation: Model.HasManyRelation,
        modelClass: room_furniture,
        join: {
          from: "dorm.dorm_id",
          to: "room_furniture.dorm_id",
        },
      },
    }; // end return
  } // end relationMappings
} // end class dorm

module.exports = Dorm;
