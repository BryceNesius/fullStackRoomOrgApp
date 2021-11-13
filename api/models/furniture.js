//
objection = require('objection');
const Model = objection.Model;

class furniture extends Model {
    static get tableName(){
        return 'furniture';
    }
    static get relationMapping(){
        return {
            furniture:{
                relation: Model.ManyToManyRelation,

            }
        }//end of return
    }//end of relationMap
}//End of class
module.exports = { furniture };