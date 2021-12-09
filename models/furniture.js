
const { Model } = require("objection");

class Furniture extends Model {
    static get tableName(){
        return 'furniture';
    }
    static get relationMapping(){
        return {
            furniture:{
                relation: Model.ManyToManyRelation,
                modelClass: require("./room_furniture"),
                join:{
                    from: 'furniture.furniture_id',
                    through: {
                        from: 'room_furniture.furniture_id',
                        to: 'room_furniture.number'
                    },
                    to: 'room.number'
                }
            }
        }//end of return
    }//end of relationMap
}//End of class
module.exports = { Furniture };