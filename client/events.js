/////
// template events 
/////
// event function about events in the website template
Template.website_item.events({
  "click .js-upvote":function(event){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    var rating = 1;
    if (this.upvotes) {
      rating += this.upvotes;
    }

    // put the code in here to add a vote to a website!

    Websites.update({_id:website_id},
      {$set: {upvotes:rating}});
    return false;// prevent the button from reloading the page
  }, 
  "click .js-downvote":function(event){
    // example of how you can access the id for the website in the database
    // (this is the data context for the template)
    var website_id = this._id;
    var rating = 1;
    if (this.downvotes) {
      rating += this.downvotes;
    }

    // put the code in here to remove a vote from a website!

    Websites.update({_id:website_id},
      {$set: {downvotes:rating}});

    return false;// prevent the button from reloading the page
  }
})
// event function about events in the form template
Template.website_form.events({
  "click .js-toggle-website-form":function(event){
    $("#website_form").toggle('slow');
  },
  "submit .js-save-website-form":function(event){
    // here is an example of how to get the url out of the form:
    if (Meteor.user()){
      var url = event.target.url.value;
      if (!(url.includes("://"))) {
	url = "http://"+url;
      }
      var domainFlag = false;
      if (url.indexOf(".") > 0) {
	var dom = url.substring(url.indexOf(".") + 1, url.length);
	if ((url.includes("www"))) {
	  if ((dom.indexOf(".") > 0) && (dom.indexOf(".") < dom.length - 2)) {
	    domainFlag = true;
	  }
	} else {
	  if (url.indexOf(".") < url.length - 2) {
	      domainFlag = true;
	  }
	}
      }
      //  put your website saving code in here!
      if(domainFlag == true) {
	var title = event.target.title.value;
	var description = event.target.description.value;
	if (/*(url) &&*/ (title) && (description)) {
	  Websites.insert({
	    url:url,
	    title:title,
	    description:description,
	    createdOn:new Date(),
	    createdBy:Meteor.user()._id
	  });
	    $("#err_msg").html("");
	  $("#website_form").toggle('slow');
	} else {
	  /*if (!url) {
	    $("#err_msg").html("Please fill the field for the site address");
	  } else */if (!title) {
	    $("#err_msg").html("Please fill the field for the site title");
	  } else if (!description) {
	    $("#err_msg").html("Please fill the field for the site description");
	  }
	}
      } else {
	$("#err_msg").html("Please fill a valid address");
      }
    } else {
      $("#err_msg").html("Please login");
    }
    return false;// stop the form submit from reloading the page
  },
  "keyup #url":function(event){
//     console.log("Hey from keyUp!!!!");
    var title = "", description = "";
    var formURL = document.getElementById("url").value;
    if (!(formURL.includes("://"))) {
      formURL = "http://"+formURL;
    }
    var domainFlag = false;
    if (formURL.indexOf(".") > 0) {
//       console.log("Found a dot in formURL @ index: "+formURL.indexOf("."));
      var dom = formURL.substring(formURL.indexOf(".") + 1, formURL.length);
//       console.log("dom: "+dom);
      if ((formURL.includes("www"))) {
	if ((dom.indexOf(".") > 0) && (dom.indexOf(".") < dom.length - 2)) {
	  domainFlag = true;
	}
      } else {
	if (formURL.indexOf(".") < formURL.length - 2) {
	    domainFlag = true;
	}
      }
    }
  if(domainFlag == true) {
      Meteor.call("checkURL", formURL, function(error, results) {
	if (results) {
	  var el = document.createElement( 'html' );
	  el.innerHTML = results.content;
	  title = el.getElementsByTagName('title')[0].innerHTML;
	  for (var i = 0; i < el.getElementsByTagName('meta').length; i++) {
	    var check = el.getElementsByTagName('meta')[i].getAttribute('name');
	    if (String(check).includes("description")) {
	      description = el.getElementsByTagName('meta')[i].getAttribute('content');
	    }
	  }
	  document.getElementById("title").value = title;
	  document.getElementById("description").value = description;
	} else /*if (error)*/ {
  //         console.log("error: "+error); //results.data should be a JSON object
	  return;
	}
      });
    } else {
//       console.log("invalid URL: "+formURL);
    }
  }
});
Template.comment_form.events({
  "click .js-toggle-comment_form":function(event){
    $("#comment_form").toggle('slow');
  },
  "submit .js-save-comment_form":function(event){
    // here is an example of how to get the url out of the form:
    var comment = event.target.comment.value;
    //  put your website saving code in here!
//     console.log("The Comment they entered is: "+comment);
    if (Meteor.user()){
      if (comment) {
	Websites.update({_id:Router.current().params._id}, {
	  $push:{
// 	    $addToSet: {
	      comments: {
		comment:comment,
		author:Meteor.user()._id
	      }
// 	    }
	  }
	});
	$("#err_msg").html("");
	$("#comment_form").toggle('slow');
      } else {
	$("#err_msg").html("Please fill the field for the site description");
      }
    }
    return false;// stop the form submit from reloading the page
  }
});