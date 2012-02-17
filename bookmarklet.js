if(typeof afonigizer == 'undefined'){
    afonigizer = function(){
        /* PRIVATES */
        //imgHashService hashes a string and returns a robot
        //image generated based on the hash
        var imgHashService = 'http://static1.robohash.com/',
            host = window.location.hostname,
            salt = Math.random().toPrecision(3),
            conf = false, // will hold the service
            services = {
                google : {
                    //google seems to put "oid" (user id) attrib on names & avatars
                    avatarSelector : 'img[oid]',
                    nameSelector : 'a[oid]',
                    //the name selector matches name links and avatar image links
                    //so this checks that there is only one (text) child node
                    nameFilter : function(anchor){
                        return ( anchor.childNodes.length === 1 &&
                                 anchor.firstChild.nodeType === Node.TEXT_NODE );
                    },
                    //this is what to hash against g+ has diff img.src for medium 
                    //& small thumbs, so we use the oid (user id)
                    hashAttribute : 'oid'
                },
                facebook : {
                    avatarSelector : 'img.uiProfilePhoto',
                    nameSelector : 'a.actorName, div.actorName a, a.passiveName, span.passiveName',
                    hashAttribute : 'src'
                }
            },
            setConf = function(){
	        if(host === 'plus.google.com') { conf = services.google; }
                else if (host === 'www.facebook.com'){ conf = services.facebook; }
            },
            
            /*
             * returns whether the afonigized class is present
             * adds it if it's not
             * @param element elem element to check
             * @return bool whether elem has the class
             */
            checkDone = function(elem){
                    var clazz = 'afonigized';
                    if(elem.classList.contains(clazz)){
                        return true;
                    }
                    elem.classList.add(clazz);
                    return false;
            },
            /**
             * Truncate the name
             * @todo randomize the first and last name
             */
            fixNames = function(names){
                for(var i = 0; i < names.length; i++){

                    var fullName = names.item(i);
                    //if a nameFilter function exists and it returns false, it's not a name
                    if( 
                        conf.hasOwnProperty('nameFilter') &&
                        ! conf.nameFilter(fullName)
                    ){ continue; }
                    //don't reconvert anything
                    if(checkDone(fullName)){ continue; }

                    //@todo make a funny name
                    var nameStr = fullName.innerHTML.substring(0,2);
                    fullName.innerHTML = nameStr + "...";
                }
            },
            fixAvatars = function(avatars){
                //Replace the profile pic with a robot pic
                for(var i = 0; i < avatars.length; i++){
                    var avatar = avatars.item(i);
                    //don't reconvert anything
                    if(checkDone(avatar)){ continue; }

                    //generate image based on profile image src.
                    newSrc = imgHashService + avatar.attributes[conf.hashAttribute].value + salt;
                    avatar.src = newSrc;
                }
            };
        /* PUBLICS */
        return {
            doIt : function(){
                //load the conf for the site we're on
                if(!conf){ setConf(); }

                avatars = document.querySelectorAll(conf.avatarSelector),
                names = document.querySelectorAll(conf.nameSelector);
	
                fixNames(names);
                fixAvatars(avatars);

            } //dIt()
        } // PUBLICS
    }();
}

afonigizer.doIt();
