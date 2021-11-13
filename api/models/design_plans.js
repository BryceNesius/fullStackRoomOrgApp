const pg = require('pg');
const objection = require('objection');
const Model = objection.Model;

class Design_plan extends Model {
    static get tableName() {
        return 'design_plan';
    }


    static get relationMappings() {
        return {
            ownership: {
                relation: Model.HasManyRelation,
                modelClass: User,
                join: {
                    from: 'Design_plan.plan_id',
                    through: {
                        from: 'Ownership.user_id',
                        to: 'Ownership.plan_id'
                    },
                    to: 'User.user_id'
                }
            }
        };
    }
}

module.exports = {Design_plan};
