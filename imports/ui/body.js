import { Blaze } from 'meteor/blaze';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import Quill from 'quilljs';
import collFactory from '/imports/api/collfactory';
import './body.html';
import 'quilljs/dist/quill.snow.css'
import {json_get,json_set} from '/imports/api/json_set';
const raw_data = require('/imports/api/jourard_self_disclosure.json');

Router.route('/', () =>{
    this.render('body');
});

Router.route('/ans', ()=>{
    var q = this.param.query
    var name = q['name']
    var user = q['user']
    var path = q['path']
    // check doc if not session
    // create the doc insert in db 
    // and retry
    var doc = Session.get('doc');
    var sdoc = json_get( doc, path);
    var quill = Quill('#editor')
    this.render( 'subdoc', sdoc)
})

Template.body.onCreated(()=>{
    Session.set('collnames',[])
    var doc = collFactory.get( 'ans_jourard_self_disclosure')
    Session.set('doc', doc)    
})
  
Template.body.events({
});


Template.body.helpers({
    questions: raw_data['value'],

});

Template.full_survey.onCreated(()=>{

})

Template.full_survey.helpers({
        questions: raw_data['value'],
});

Template.full_survey.events({
    'click .submit'(e,t){
        var doc = Settings.get('doc')
        res_coll= Mongo.Collection('jourard_selfdisclosure')
        Session.set('res_collection', res_coll)
        res_coll.insertOne(doc)
        console.log(doc)
    }

})

Template.survey_text.rendered = ()=>{
    console.log('before quill')
    console.log(Blaze.toHTML(Template.survey_text))
    var container = '#editor'
    console.log(container);
    this.quill = new Quill(container);
    console.log(this.quill)
//   var quill = new Quill('#editor-container', {
//       theme: 'snow'
//      });
}


Template.survey_link.helpers({
    // need name of survey and user
    // name hardcode 
    name : "jourard_self_disclosure",
    user: "myself",

    subdoc_link : (qnum) =>{
        var name = "jourard_self_disclosure";
        var user = Meteor.user().username;
        if (user == null){
            user = "myself";
        }
        var lk = "/ans?"
        lk = lk + "name=" + name
        lk = lk + "&user=" + user
        lk = lk + "&path=\".value[" + qnum + "]\""
        return (lk)
    },
    subdoc_desc : (qnum) => {
        var lk = "subdoc "
        lk = lk + "path=\".value[" + qnum + "]\""
        return (lk)
    }
})

Template.survey_text.events({
    'click .submit'(e,t){
        var doc = Session.get('doc')
        var res_coll = Session.get('res_collection')['jourard_self_disclosure']
        
        // debug this update

        res_coll.update( { 
            name: 'jourard_self_disclosure',
            user: user

        }, doc)

    }
})

