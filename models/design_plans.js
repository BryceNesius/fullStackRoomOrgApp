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
                relation: Model.ManyToManyRelation,
                modelClass: require('./user'),
                join: {
                    from: 'design_plan.plan_id',
                    through: {
                        from: 'ownership.user_id',
                        to: 'ownership.plan_id'
                    },
                    to: 'user.user_id'
                },
            }
        };
    }
}

module.exports = {Design_plan};
