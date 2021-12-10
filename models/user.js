const {Model} = require("objection");

class User extends Model {
    static get tableName() {
        return 'user';
    }
    static get relationMappings() {
        return {
            ownership: {
                relation: Model.ManyToManyRelation,
                modelClass: require("./design_plans"),
                join: {
                    from: "user.user_id",
                    through: {
                        from: "ownership.user_id",
                        to: "ownership.plan_id"
                    },
                    to: "Design_Plan.plan_id"
                }
            },
            favorite: {
                relation: Model.ManyToManyRelation,
                modelClass: require("./favorites"),
                join: {
                    from: "user.user_id",
                    through: {
                        from: "favorites.user_id",
                        to: "favorites.plan_id"
                    },
                    to: "Design_Plan.plan_id"
                }
            },
            friends: {
                relation: Model.ManyToManyRelation,
                modelClass: require("./user_friends"),
                join: {
                    from: "user.user_id",
                    through: {
                        from: "user_friends.user_id",
                        to: "user_friends.friend_id"
                    },
                    to: "user.user_id"
                }
            },
            school: {
              relation: Model.HasOneRelation,
              modelClass: require("./school"),
              join: {
                  from: "user.school_id",
                  to: "school.school_id"
              }
            }
        }
    }
}
module.exports = { User };
// user belongs to one school

// multiple users can own one design plan

// multiple users can favorite a design plan

// one user can have multiple friends

// a friend can have multiple users



