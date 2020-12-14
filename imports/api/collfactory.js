import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

class CollFactory {
    create( coll_name ){
        var colls = Session.get('collnames')
        var check_colls = true
        if (colls == null){
            check_colls = false
        } 
        if ( colls  && coll_name in colls){
            this.collection = Session.get('collecions')[coll_name]
            check_colls = true
        } 
        
        if (check_colls == false ) {
            var all_colls = Session.get('collections')
            this.collection = new Mongo.Collection(coll_name);
            all_cols[col_name] = this.collection;
            Session.set('collections',all_cols)
            colls.append( coll_name )
            Session.set( 'collnames',colls)
        }
        if (Meteor.isServer) {    
            Meteor.publish( coll_name )
        }
        return this.collection;
    }

    get( coll_name ){
        var coll_names = Session.get('coll_names')
        console.log('coll names:')
        console.log( coll_names )
        if (coll_names == null ) {
            this.collection = this.create( coll_name);
            coll_names = [ coll_name ]
            console.log(coll_names)
            Session.set('coll_names', coll_names)
            return this.collection;
        }
        if (coll_name in coll_names){
            this.collection = Session.get('collections')[coll_name]
            return this.collection;
        } else {
            this.collection = this.create( coll_name)
            coll_names = [ coll_name ]
            console.log(coll_names)
            Session.set('coll_names', coll_names)
            return this.collection;
        }
    }
}

var collFactory = new CollFactory();
export default collFactory;
