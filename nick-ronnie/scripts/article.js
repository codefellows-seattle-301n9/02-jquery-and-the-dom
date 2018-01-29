'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The purpose of the following function is to instantiate article objects. The name is capitalized because the typical naming convention of a constructore cuntion is to be capitalized. The context of "this" refers to the object being instatiated. rawDataObj represents an object being instantiated or we're creating an object. 

//As a user, I want my site to display my blog articles in a clear, logical way so that I can find the most recent articles first and the blog is easy to read

function Article (rawDataObj) {
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  
  // TODONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function() {
  // COMMENTED: What is the benefit of cloning the article? (see the jQuery docs)
  // The benefit of cloning the article is to make a copy and use it as needed.

  let $newArticle = $('article.template').clone();
  $newArticle.removeClass( "template" );
  /* TODONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.find('address a').text(this.author);
  $newArticle.find('address a').attr('href',this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('section').html(this.body);
  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODONE: Refactor these for loops using the .forEach() array method.


rawData.forEach(function(articleData){
  articles.push(new Article(articleData));
});

articles.forEach(function(article){
  $('#articles').append(article.toHtml());
});
