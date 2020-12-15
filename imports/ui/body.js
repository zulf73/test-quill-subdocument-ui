import { Blaze } from 'meteor/blaze';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import Quill from 'quilljs';
import collFactory from '/lib/collfactory';
import './body.html';
import 'quilljs/dist/quill.snow.css'
import {json_get,json_set} from '/imports/api/json_set';
const raw_data = require('/imports/api/jourard_self_disclosure.json');

Router.route('/', () =>{
    this.render('body');
});

Router.route('/ans', ()=>{
    var p = Router.current().params
    console.log(p)
    var q = p.query
    console.log(q)
    var name = q['name']
    var user = q['user']
    var path = q['path']
    console.log(name)
    console.log(path)
    console.log(user)
    // check doc if not session
    // create the doc insert in db 
    // and retry
    var doc = Session.get('doc');
    var sdoc = json_get( doc, path);
    var quill = Quill('#editor')
    console.log(sdoc)
    this.render( 'subdoc', sdoc)
})

Template.body.onCreated(()=>{
    var coll = collFactory.get( 'ans_jourard_self_disclosure')
    var docs = coll.find( {} )
    var doc = docs[0]
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
        var doc = Session.get('doc')
        res_coll= collFactory.create('jourard_selfdisclosure')
        Session.set('res_collection', res_coll)
        res_coll.insert(doc)
        console.log(doc)
    }

})

Template.survey_item.helpers({
   update_doc : (question, answer, index) => {
    var doc = Session.get('doc')
    // set something decent
    if (answer == null){
        answer = "your answer here"
    }
    var new_val = { "question": question,
                "answer": answer }
    var path = ".value["+index+"]"
    console.log(path)
    console.log(new_val)
    json_set( doc,path , new_val)
    Sessions.set('doc',doc)
   } 
})

Template.survey_item.onCreated(()=>{
});

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
        var u = Meteor.user();

        if (u == null){
            user = "myself";
        } else {
            user = u.username;
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

Template.survey_item.events({
    'click .submit'(e,t){
        var doc = Session.get('doc')
        var res_coll = Session.get('res_collection')['jourard_self_disclosure']
        
        // debug this update

        res_coll.update( { 
            name: 'jourard_self_disclosure',
            user: Meteor.user().username
        }, doc)

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

