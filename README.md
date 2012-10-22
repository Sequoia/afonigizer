##AFONIGIZER [![build status](https://secure.travis-ci.org/Sequoia/afonigizer.png)](http://travis-ci.org/Sequoia/afonigizer)
This is a bookmarklet that obsures ("afonigizes") people's identities on 
facebook and google+ (sort of google+, haven't been testing) for screenshots.

###Use
[*Get the bookmarklet here*](http://sequoia.github.com/afonigizer/)
To build it yourself, put the script and the code below in an link href, but wrap the doIt call in ```void()```.

If you want to run it in your browser's console paste the following things:
* afongizer.js into your console in Firefox, Chrome, or Opera
* ```var afonigizer = afonigizer || new Afonigizer;```
* ```afonigizer.doIt()``` 

###Tests
To run tests, you must have nodejs and npm installed
* Clone the repo
* ```npm install```
* ```npm test```

###Known issues
* comments & posts not afonigized in google+, I can't figure how to handle the
dynamic classnames

###Todo
* Better randomize function (aquire from underscore)

###Roadmap
* *i18n support*!!
* grunt.js ... I don't always keep the minified file & bookmarklet page up to date currently
* decoupling site/language configs from module (I'll probably leave English/Facebook as a default)
* divorce DOM stuff from afonigizing business logic
* Remove site configs
* Allow other configurations to be loaded
* Allow other "common words" to be loaded
* Afonigizer "mode": updates page as new domnodes are loaded (see throttle branch)
* "Settings": only first names, only last names, pics or not etc.
