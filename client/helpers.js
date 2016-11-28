
/// infiniscroll

Session.set("siteLimit", 8);
lastScrollTop = 0;
$(window).scroll(function(event){
// test if we are near the bottom of the window
if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page?
  var scrollTop = $(this).scrollTop();
  // test if we are going down
  if (scrollTop > lastScrollTop){
    // yes we are heading down...
   Session.set("siteLimit", Session.get("siteLimit") + 4);
  }

  lastScrollTop = scrollTop;
}

})

/////
// template helpers 
/////
// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
//       console.log(Websites.find({}, {sort:{upvotes:-1}, limit:Session.get("siteLimit")}).fetch());
    if (Session.get("searchTerm")){// they set a filter!
      return Websites.find({ $or:[ { "title": { $regex: new RegExp(".*"+Session.get("searchTerm")+".*","i") } }, { "description": { $regex: new RegExp(".*"+Session.get("searchTerm")+".*","i") }  } ] }, {sort:{upvotes:-1}, limit:Session.get("siteLimit")});
    } else {
      return Websites.find({}, {sort:{upvotes:-1}, limit:Session.get("siteLimit")});
    }
  }
});
Template.suggested_list.helpers({
    suggestedWebsites: function(){
    var words = [];
    if (Meteor.user()) {
      if (Meteor.user().suggestions) {
// 	console.log(Meteor.user().suggestions);
	for (let i = 0; i < Meteor.user().suggestions.length; i++) {
	  var licked_site = Websites.findOne({"_id":Meteor.user().suggestions[i]}, {sort:{upvotes:-1}});
	  var title = licked_site.title.replace(/[^a-z0-9 ]+/gi, '');
	  var description = licked_site.description.replace(/[^a-z0-9 ]+/gi, '');
	  var suggWebs = [];
	  words = words.concat((title.split(" ").concat(description.split(" "))));
// 	  var words = title + " " + description;
	  for (let j = 0; j < words.length; j++) {
	    if (words[j].length > 3) {
// 	      console.log(words[j]);
	      var tmpSites = Websites.find({ $and: [ { $or:[ { "title": { $regex: new RegExp(".*"+words[j]+".*","i") } }, { "description": { $regex: new RegExp(".*"+words[j]+".*","i") }  } ] }, {"_id": {$ne:licked_site._id} } ] }).fetch();
  // 	      console.log(tmpSites);
	      for (let k = 0; k < tmpSites.length; k++) {
		if (!(checkForDoubles(tmpSites[k], suggWebs))) {
		  suggWebs.push(tmpSites[k]);
		}
	      }
	    }
	  }
	}
// 	console.log(suggWebs);
	return suggWebs;
      }
    }
//   }
  return false;
  }
});
Template.keywords_list.helpers({
    keywords: function(){
    var words = [];
    if (Meteor.user()) {
      if (Meteor.user().suggestions) {
// 	console.log("Hey from Keywords");
	for (let i = 0; i < Meteor.user().suggestions.length; i++) {
	  var licked_site = Websites.findOne({"_id":Meteor.user().suggestions[i]}, {sort:{upvotes:-1}});
	  var title = licked_site.title.replace(/[^a-z0-9 ]+/gi, '');
	  var description = licked_site.description.replace(/[^a-z0-9 ]+/gi, '');
	  var outwords = [];
	  words = words.concat((title.split(" ").concat(description.split(" "))));
	  for (let j = 0; j < words.length; j++) {
	    if (words[j].length > 3) {
	      if (!(checkForDoubleWords(words[j], outwords))) {
		outwords.push(words[j]);
	      }
	    }
	  }
	}
// 	console.log(outwords);
	return outwords;
      }
    }
//   }
  return false;
  }
});
function checkForDoubleWords(obj, list) {
//     console.log("Entered");
    for (let i = 0; i < list.length; i++) {
        if (list[i] === obj) {
// 	  console.log("Found Duplicate: "+list[i]+"::"+obj);
	  return true;
        }
    }
    return false;
}
function checkForDoubles(obj, list) {
//     console.log("Entered");
    for (let i = 0; i < list.length; i++) {
        if (list[i].url === obj.url) {
// 	  console.log("Found Duplicate url");
// 	  console.log(list[i].title);
// 	  console.log(obj.title);
	  if (list[i] === obj){
// 	    console.log("..and Object");
	  } else {
// 	    console.log("..but not Object");
	  }
// 	  console.log(list[i]);
// 	  console.log(obj);
	  return true;
        }
    }
    return false;
}
Template.website_item.helpers({
  getOverall:function(){
    var upvotes = 0;
    if (this.upvotes) {
      upvotes = this.upvotes;
    }
    var downvotes = 0;
    if (this.downvotes) {
      downvotes = this.downvotes;
    }
    return (upvotes - downvotes);
  },
  getDate:function(){
    return (this.createdOn);
  },
  getUser:function(user_id){
    var user = Meteor.users.findOne({_id:user_id});
    if (user){
      return user.username;
    }
    else {
      return "anon";
    }
  }
});
Template.detailedWebsite.helpers({//_id:Router.current().params._id
  url:function(){
    var website = Websites.findOne({_id:Router.current().params._id}, {url:1});
    if (website) {
      return website.url;
    } else {
      return [];
    }
  },
  title:function(){
    var website = Websites.findOne({_id:Router.current().params._id}, {title:1});
    if (website) {
      return website.title;
    } else {
      return [];
    }
  },
  description:function(){
    var website = Websites.findOne({_id:Router.current().params._id}, {description:1});
    if (website) {
      return website.description;
    } else {
      return [];
    }
  }
});
Template.comment_list.helpers({//_id:Router.current().params._id
  comments:function(){
    var website = Websites.findOne({_id:Router.current().params._id}, {comments:1});//.fetch();
      if (website) {
	if (website.comments) {
	  return website.comments;
	}
    } else {
      return [];
    }
  }
});
Template.comment_item.helpers({
    comment:function(){
	if (this.comment) {
	  return (this.comment);
	} else {
	  return ("No comments for this site");
	}
    },
    author:function(){
	if (this.author) {
	  var user = Meteor.users.findOne({_id:this.author});
	  if (user){
	    return user.username;
	  }
	  else {
	    return "anon";
	  }
	} else {
	  return ("");
	}
    }
});