'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// It it capitalized because Article handles an object.

function Article (rawDataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category:
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // If someone wants to change the article, someone can just edit blogArticle.js and not risk chaning the settings in article.js.

  let $newArticle = $('article.template').clone();
  /* DONE?: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  // I'm not sure if I did this right.

  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');

    /* DONE? : Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  $newArticle.attr('data-category', this.category);

  $newArticle.find('h1').html(this.title);
  $newArticle.find('a').html(this.author);
  $newArticle.find('a').attr('href',this.authorUrl);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').attr('datetime', this.publishedOn);


  // REVIEWED: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE, (but with linter errors.  The linter doesn't seem to know about each, so for the first each, it expect an open parenthesis. ): Refactor these for loops using the .forEach() array method.

// for each (let i in rawData) {
//   articles.push(new Article(rawData[i]));
// }

rawData.forEach(function(post){
  articles.push(new Article(post));
});

// for each (let i in articles) {
//   $('#articles').append(articles[i].toHtml());
// }

articles.forEach(function(article){
  $('#articles').append(article.toHtml());
});