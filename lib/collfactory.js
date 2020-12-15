import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

class CollFactory {
    constructor( ){
        if (!this.collnames){
            this.collnames = []
            this.collections = {}
        }
    }
    create( coll_name ){

        if (coll_name in this.collnames){
            this.collection = this.collections[coll_name]
            return this.collection;
        } else {  
            console.log('do not have name in collnames')
            this.collection = new Mongo.Collection(coll_name);
            this.collections[coll_name] = this.collection;
            this.collnames = this.collnames.concat([coll_name])            
            console.log(this.collections)
        }
        if (Meteor.isServer) {    
            Meteor.publish( coll_name )
        }
        return this.collection;
    }

    get( coll_name ){
        this.collection = this.create( coll_name);
        return this.collection
    }
}

var collFactory = new CollFactory();
export default collFactory;
