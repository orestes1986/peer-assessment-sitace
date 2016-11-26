
/////
// template helpers 
/////
// helper function that returns all available websites
Template.website_list.helpers({
  websites:function(){
    return Websites.find({}, {sort:{upvotes:-1}});
  }
});
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