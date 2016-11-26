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
    }
  });
  Meteor.methods({
  checkURL: function (url) {
//     if (Meteor.isServer) {
    try {
//       var url = "mystery-theatre.eu";
      //twitter.com
      //facebook.com
      //google.com
      //mystery-theatre.eu
      //mystery-theater.eu
//       var url = document.getElementById("url").value;
//       console.log("url: "+url);
      console.log("Corrected url: "+url);
      var result = HTTP.call("GET",url,"");
//       console.log("result: "+result);
//       console.log("result.url: "+result.url);
//       console.log("result.content: "+result.content);
      return result;
    } catch (e) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      console.log(e);
      return;// e;
    }
//       this.unblock();
//       return Meteor.http.call("GET", "http://search.twitter.com/search.json?q=perkytweets");
//     }
  }
});