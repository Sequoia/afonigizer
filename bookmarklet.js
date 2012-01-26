//imgHashService hashes a string and returns a robot
//image generated based on the hash
var imgHashService = 'http://static1.robohash.com/',
    nameSelector = 'a.yn.Hf, a.actorName, div.actorName a',
    avatarSelector = 'img.Fn.Yi, img.uiProfilePhoto',
    avatars = document.querySelectorAll(avatarSelector),
    names = document.querySelectorAll(nameSelector);
	
//Truncate the name
//@todo randomize the first and last name
for(var i = 0; i < names.length; i++){
	var fullName = names.item(i),
	    nameStr = fullName.innerHTML.substring(0,2);
	fullName.innerHTML = nameStr + "...";
};

//Replace the profile pic with a robot pic
//@todo DOES NOT WORK WITH G+ medium and small profile img srcs are different
//which results in a different hash/robot
for(var i = 0; i < avatars.length; i++){
    //generate image based on profile image src.
    //(Is this always the same? I think so.)
	var avatar = avatars.item(i);
	    newSrc = imgHashService + avatar.src;
	avatar.src = newSrc;
};
