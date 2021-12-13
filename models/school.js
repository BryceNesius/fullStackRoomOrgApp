const { Model } = require("objection");
const { Dorm } = require("./dorm.js");
const { user } = require("./user.js");

class School extends Model {
  static get tableName() {
    return "school";
  }

  static get relationMappings() {
    return {
      dorms: {
        relation: Model.HasManyRelation,
        modelClass: Dorm,
        join: {
          from: "school.school_id",
          to: "dorm.school_id",
        },
      }, // end dorms
      school_users: {
        relation: Model.HasManyRelation,
        modelClass: user,
        join: {
          from: "school.school_id",
          to: "user.school_id",
        },
      }, // end school_users
    }; // end return
  } // end relationMappings
} // end class school

module.exports = School;
