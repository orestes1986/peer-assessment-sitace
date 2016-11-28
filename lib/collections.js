
// this is siteace.js
Websites = new Mongo.Collection("websites");
// Users = new Mongo.Collection("users");
// Websites.createIndex({ title: "text", url : "text", description : "text" });

// set up security on Websites collection
Websites.allow({
  // we need to be able to update websites for ratings.
  update:function(userId, doc){
    console.log("testing security on website update");
    if (Meteor.user()){// they are logged in
      return true;
    } else {// user not logged in - do not let them update  (rate) the image. 
      return false;
    }
  },
  insert:function(userId, doc){
    console.log("testing security on website insert");
    if (Meteor.user()){// they are logged in
      if (userId != doc.createdBy){// the user is messing about
	return false;
      } else {// the user is logged in, the website has the correct user id
	return true;
      }
    } else {// user not logged in
      return false;
    }
  }, 
  remove:function(userId, doc){
    if (userId){ 
      return true; 
    } else { 
      return false; 
    }
  }
})
Meteor.users.allow({
  update:function(userId, doc){
    console.log("testing security on website update");
    if (Meteor.user()){// they are logged in
      return true;
    } else {// user not logged in - do not let them update  (rate) the image. 
      return false;
    }
  }
})