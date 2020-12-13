# test-quill-subdoc-ui
HOW TO IMPLEMENT A DOCUMENT-CENTRIC WEB UI FOR THY-SURVEYS

Zulfikar Ahmed <wile.e.coyote.006@gmail.com>
6:03 PM (46 minutes ago)

to media, inquiries, s.l.dixon2, s.l.harrison, s.l.massey, s.lahlou, s.levy, s.livingstone, s.m.correia, s.m.gohel, s.m.hall, s.m.haspeslagh, s.m.merkur, s.madhok, s.madon, s.marks, s.marzi, s.mcmanus, s.morshed, s.mourato, s.mukherjee3, s.mullen, s.n.peisch, s.n.taznim, s.o.dosekun, s.ottovordemgentschenfelde, s.pischke, s.r.betteridge, s.r.witney, s.rajak, s.randelovic, s.read, s.rickard, s.ridino, s.riza, s.rowan, s.s.orgad, s.s.paduano, s.salem3

Ladies and Gentlemen,

We have overcome the QuillJS Meteor integration problem.  We have solved the problem of Dynamic Collections.  Now it is time to consider the problem of correct structure for the application from the Data-centric perspective.

There is novelty here as well.  Ordinarily, the natural granularity of data is at the level of a full document in Mongo.

We want to consider the slight variation where the granularity is a sub-document.

In order to do good software design, we want to stay true to the conventions established by the Iron-Router.

When we have a new Survey answer, then, we want to consider the specification of the address of the subdocument as follows:
'/ans?name=<survey_name>&user=<user_name>&doc_path=<path>

Notice here that we want a very simple clear specification.  Then we want to treat this problem lightly, so that Iron-Router's natural functionality is used to implement this scheme.

So instead of having a complex UI for the the whole answer, what we do is construct a full answer and save the full document with non-informative data for each component.  Then we use Iron-Router to give a reactive view of the contents of a subdocument by the above specification.

This amounts to writing a template to render the contents of a subdocument specified as above.  This is a mild modification of Iron-Router standard code:

https://zulfahmed.wordpress.com/2020/12/12/iron-router-for-thy-surveys/

This I will test in the coming days.  This clarifies the role of QuillJS UI.  We will not need many.  Note that the STRUCTURE of JSON in the back-end here suddenly eliminates the complexity of front-end substantially.  The front-end code does not need to know the document structure AT AT ALL because we have a generic render of ANY subdocument.

Thank you,
ZULFIKAR MOINUDDIN AHMED

