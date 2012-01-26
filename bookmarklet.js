//click jquerify << 

var imgHashService = 'http://static1.robohash.com/';

$jq('a.actorName, div.actorName a').each(function(){
	var name = $jq(this).html().substring(0,2);
	$jq(this).html(name + "...");
});

$jq('img.uiProfilePhoto').each(function(){
	var newSrc = imgHashService + $jq(this).attr('src');
	$jq(this).attr('src',newSrc);
});
