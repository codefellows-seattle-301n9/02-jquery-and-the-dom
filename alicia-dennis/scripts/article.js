'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
//The function is a constructor which calls the object rawDataObj and passes it through the function to display a particular instance of the Article. It is capitalized as you should only capitalize the first character of the name of a function when you need to construct the object by "new" keyword and don't mistake it for a class or element. "this" within a function grabs a particular instance within the constructor function. rawDataObj represents the entire data array as a block.

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  this.rawDataObj=rawDataObj;
  this.title=rawDataObj.title;
  this.category=rawDataObj.category;
  this.author=rawDataObj.author;
  this.authorUrl=rawDataObj.authorUrl;
  this.publishedOn=rawDataObj.publishedOn;
  this.body=rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // The .clone() method performs a deep copy of the set of matched elements, its benefit being that it copies the matched elements as well as all of their descendant elements and text nodes.
  // The benefit of cloning the article is to get a deep copy of the element all all of its decendent elements and text nodes

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  //after we create the new articles
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */
  $newArticle.find('h1').html(this.title); //space is created, need to ad content of parent-child relationship (getelementbyclass & getter/setter)
  $newArticle.find('.byline a').html(this.author);
  $newArticle.find('.byline a').html(this.authorUrl);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').html(this.publishedOn);
  $newArticle.find('.byline time').html(this.publishedOn);

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
rawData.forEach(function(blogData) {
  articles.push(new Article(blogData));
  console.log(blogData);
});

for(let i = 0; i < rawData.length; i++) {
  articles.push(new Article(rawData[i])); //take one object from rawData and push it into a new object for total length of the array
}

for(let i = 0; i < articles.length; i++) {
  $('#articles').append(articles[i].toHtml());
}

//take in each index of some array and push through some object. grab raw data one at a time and push through new article. We will create a new array of articles with objects inside. We will grab a new element in last for loop, an id of articles (from html file), this is going to exist in the DOM, we are dot appending. We arent grabbing the array article instead we are running the toHTML method and we are appending the result/return of that method. Will return new article. Runs 30 times (find id and append new article). 1st for loop calls constructor, second calls toHtml method.