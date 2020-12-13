import { Blaze } from 'meteor/blaze';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import Quill from 'quilljs';
import './body.html';
import 'quilljs/dist/quill.snow.css'

const raw_data = require('/imports/api/jourard_self_disclosure.json');

Template.body.onCreated(()=>{
    Session.set('doc',{})
    //var res_coll= Mongo.Collection('survey_IPIP120')
    //Session.set('res_collection', res_coll)    
})
  
Template.body.events({
});


Template.body.helpers({

//  questions: [
//    { question: 'This is task 1' },
//    { question: 'This is task 2' },
//    { question: 'This is task 3' },
    //  ],
    questions: raw_data['value'],

});

Template.full_survey.onCreated(()=>{

})

Template.full_survey.helpers({

    //  questions: [
    //    { question: 'This is task 1' },
    //    { question: 'This is task 2' },
    //    { question: 'This is task 3' },
        //  ],
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

Template.survey_answer.events({
    'click'(e,t){
        // the name of the radio group for question i
        // is just {{i}}
        var control= e.target;
        var val = control.value;
        console.log(val);
        
        // set value to Session doc
        var doc = Session.get('doc')
        // document has just the answers
        // <question number>:<answer>
        // the click produced the answer
        doc[control.name] = val
        Session.set('doc',doc)
    }
})

Template.survey_link.helpers({
    // need name of survey and user
    // name hardcode 
    name : "jourard",
    user: "myself",

    subdoc_link : (qnum) =>{
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

Router.route('/ans', ()=>{
    var q = this.param.query
    var name = q['name']
    var user = q['user']
    var path = q['path'
    // check doc if not session
    // create the doc insert in db 
    // and retry
    var doc = Session.get('ans');
    var sdoc = json_get( doc, path);
    var quill = Quill('#editor')
    this.render( 'subdoc', sdoc)
})
