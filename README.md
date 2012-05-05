##AFONIGIZER
This is a bookmarklet that obsures ("afonigizes") people's identities on 
facebook and google+ (sort of google+, haven't been testing) for screenshots.

Get the bookmarklet [here](http://sequoia.github.com/afonigizer/)

Currently, to use it, you paste it into your console in Firefox, Chrome, or 
Opera *and then* ```afonigizer.doIt()```.  to bookmarkletify, put the script and the doIt call in an link href, but wrap the doIt call in ```void()```.

###Known issues
* comments & posts not afonigized in google+, I can't figure how to handle the
dynamic classnames

###Todo
* Better randomize function (aquire from underscore)

###Roadmap
* *i18n support*!!
* decoupling site/language configs from module (I'll probably leave English/Facebook as a default)
	* Remove site configs
	* Allow other configurations to be loaded
	* Allow other "common words" to be loaded
* Afonigizer "mode": updates page as new domnodes are loaded (see throttle branch)
* "Settings": only first names, only last names, pics or not etc.
* Test suite
