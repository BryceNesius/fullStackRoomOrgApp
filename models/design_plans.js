const pg = require('pg');
const objection = require('objection');
const Model = objection.Model;
const { Account } = require('./Account');

class Design_plan extends Model {
    static get tableName() {
        return 'design_plan';
    }


    static get relationMappings() {
        return {
            ownership: {
                relation: Model.BelongsToOneRelation,
                modelClass: Account,
                join: {
                    from: 'Account.id',
                    to: 'design_plan.user_id'
                },
            }
        };
    }
}

module.exports = Design_plan;
