//click jquerify << THIS SCRIPT RELIES ON JQUERIFY
//paste the following into the console if this is
//not a bookmarklet

//this service hashes a string and returns a robot 
//image generated based on the hash
var imgHashService = 'http://static1.robohash.com/';

//Truncate the name
//@todo randomize the first and last name
$jq('a.actorName, div.actorName a').each(function(){
	$that = $(this);
	var name = $that.html().substring(0,2);
	$that.html(name + "...");
});

//Replace the profile pic with a robot pic
$jq('img.uiProfilePhoto').each(function(){
	$that = $(this);
	//generate image based on facebook profile source. 
	//(Is this always the same? I think so.)
	var newSrc = imgHashService + $that.attr('src');
	$that.attr('src',newSrc);
});
