
/// routing 

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});
Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('welcome', {
    to:"main"
  });
});

Router.route('/details/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('detailedWebsite', {
    to:"main", 
//     data:function(){
//       return Images.findOne({_id:this.params._id});
//     }
  });
});
/// accounts config

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL",
});