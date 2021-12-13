const { Model } = require("objection");
const { Account } = require("./Account");

class DesignPlan extends Model {
  static get tableName() {
    return "design_plans";
  }

  static get idColumn() {
    return 'plan_id';
  }

  static get relationMappings() {
    return {
      ownership: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account,
        join: {
          from: "Account.id",
          to: "design_plan.user_id",
        },
      },
    };
  }
}

module.exports = DesignPlan;
