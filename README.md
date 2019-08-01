# jquery-postify
Postify is a jQuery plugin that allows you to load images after the main part of the page has been loaded. It works by some kind of AJAX calls and has several possibilties to customize. [demo](demo/index.html)

## usage
The only thing you have to do is to create a new, empty div container with the tag ```data-postify``` which contains the url of the image. Then you add some Javascript with some optional options
```JavaScript
$(document).ready(function() {
    $('div.postify').postify();
});
```

## options
* animation (```default: fade```): how should the images be shown up?
  * slideUp
  * slideDown
  * slideLeft
  * slideRight
  * fade
  * scale
  * flip
  * custom animation
* delay (```0```ms): wait some time to load images
* priority (```0```): Load images in a certain order
* showLoading (```true```): display loading animations while image is loading?
* loadingClass (```postify-loading```): which class has the surrounding container element?
* loadingElements (```<div></div><div></div><div></div><div></div>```): which elements should be added to use the css loading animation?
* adjustSize (```parent```): how should the size of image or parent be adjusted?
  * parent: adjust parent size to match image
  * cover: scale image to fill whole parent
  * auto: scale image to fit parent best so it won't get cut
  * childHeight: force image to scale by height, that it fits parent (width gets calculated automaticly)
  * childWidth: force image to scale by width, that it fits parent (height gets calculated automaticly)

## Contribute
Feel free to add some new features, write issues or contact me in a way you prefer: [my website](http://marius-butz.de)

