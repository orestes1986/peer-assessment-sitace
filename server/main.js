// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
      console.log("No websites yet. Creating starter data.");
	Websites.insert({
	  title:"Goldsmiths Computing Department", 
	  url:"http://www.gold.ac.uk/computing/", 
	  description:"This is where this course was developed.", 
	  createdOn:new Date()
      });
	Websites.insert({
	  title:"University of London", 
	  url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
	  description:"University of London International Programme.", 
	  createdOn:new Date()
      });
	Websites.insert({
	  title:"Coursera", 
	  url:"http://www.coursera.org", 
	  description:"Universal access to the world’s best education.", 
	  createdOn:new Date()
      });
      Websites.insert({
	title:"Google", 
	url:"http://www.google.com", 
	description:"Popular search engine.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Twitter. It's what's happening.", 
	url:"http://www.twitter.com", 
	description:"From breaking news and entertainment to sports and politics, get the full story with all the live commentary.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Wellcome to Steam", 
	url:"http://www.steampowered.com", 
	description:"A game distribution platform.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Ενημερώστε το πρόγραμμα περιήγησης | Facebook", 
	url:"http://www.facebook.com", 
	description:"A social network.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Google+", 
	url:"https://plus.google.com/", 
	description:"Google+ is a place to discover amazing things and connect with passionate people.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"edX | Free online courses from the world's best universities", 
	url:"http://www.edx.org", 
	description:"EdX offers free online courses and classes. Find the latest MOOC from the world’s best universities including MIT, Harvard, Berkeley, UT and others. Topics include business, computer science, finance, history, literature, math, science, statistics and more.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"EVE Online - One community. Countless journeys.", 
	url:"http://www.eveonline.com", 
	description:"Player-created empires, player-driven markets, and endless ways to embark on your personal sci-fi adventure.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Home | Radley Yeldar", 
	url:"http://www.ryzom.com", 
	description:"We're Radley Yeldar, a creative consultancy. We create standout communications that make a real impact.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Dummy title", 
	url:"http://www.dummy.com", 
	description:"Dummy courSes description.", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Dummy Courses", 
	url:"http://www.dummy.net", 
	description:"Dummy descripton", 
	createdOn:new Date()
      });
      Websites.insert({
	title:"Home | Radley Yeldar", 
	url:"http://www.ryzom.com", 
	description:"We're Radley Yeldar, a creative consultancy. We create standout communications that make a real impact.", 
	createdOn:new Date()
      });
    }
  });
  Meteor.methods({
  checkURL: function (url) {
    try {
      console.log("Corrected url: "+url);
      var result = HTTP.call("GET",url,"");
      return result;
    } catch (e) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      console.log(e);
      return false;// e;
    }
  }/*,
  searchSites: function (term) {
//     console.log(({title: term, description:term}));
    
    Websites.find({ $or:[ { "title": { $regex: new RegExp(".*"+term+".*","i") } }, { "description": { $regex: new RegExp(".*"+term+".*","i") }  } ] }).pretty();
    
    return ({title: term, description:term});
  }*/
});
  
Meteor.publish("websiteData", function () {
  return Websites.find();
}),
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId}, {fields: {suggestions: 1}});
  } else {
    return false;
  }
});