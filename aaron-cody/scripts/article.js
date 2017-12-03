'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// Article is a global constructor function used to add and replace rawDataObj content from the blogArticles.js file into the array let articles=[] which will then be rendered to the DOM through the associated .html file attributes labeled "articles".
// Constructor function names are capitalized to differentiate them from regular functions.
// "this" in the constructor function is a reference to the current object, in this case being any object inside the rawData array.

function Article (rawDataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publshedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // The benefit of cloning the article is that is creates an initial template so the only thing(s) that need updating in an open browser is the content when searched for under new conditions vs reloading the entire webpage itself.

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  // $newArticle.show().insertAfter('section');
  $newArticle.removeClass('template').addClass('.someNewTemplateName');
  
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $('.someNewTemplateName').find('address').toHtml(this.author);
  $('.someNewTemplateName').find('href').toHtml(this.authorUrl);
  $('.someNewTemplateName').find('h1').toHtml(this.title);
  $('.someNewTemplateName').find('section').toHtml(this.body);
  $('.someNewTemplateName').find('time').toHtml(this.time);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

// for(let i = 0; i < rawData.length; i++) {
//   articles.push(new Article(rawData[i]));
// }
rawData.forEach(function(rawDataObject) {
  articles.push(new Article(rawDataObject));
});

// for(let i = 0; i < articles.length; i++) {
//   $('#articles').append(articles[i].toHtml());
// }

articles.forEach(function(articleObject) {
  $('#articles').append(articleObject).toHtml();
});