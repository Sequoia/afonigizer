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
                    nameSelector : 'a.actorName, div.actorName a,' +
						'a.passiveName, span.passiveName, a[data-hovercard]',
                    nameFilter : function(anchor){
                        return ( anchor.childNodes.length === 1 &&
                                 anchor.firstChild.nodeType === Node.TEXT_NODE );
                    },
                    hashAttribute : 'src'
                }
            },
			//@todo I probably don't need quite this many...
			fNames = [
"Abashed", "Abhorrent", "Abject", "Abnormal", "Aboriginal", "Abrupt", "Abstracted", "Accessible", "Adjoining", "Alert", "Alive", "Alluring", "Ambiguous", "Amuck", "Animated", "Aquatic", "Aspiring", "Astonishing", "Available", "Aware", "Bad", "Bashful", "Beautiful", "Berserk", "Boiling", "Boring", "Brash", "Breezy", "Bright", "Burly", "Callous", "Capricious", "Changeable", "Childlike", "Chivalrous", "Chunky", "Classy", "Cloudy", "Coherent", "Colossal", "Comfortable", "Cool", "Courageous", "Crabby", "Crazy", "Creepy", "Cuddly", "Curly", "Dapper", "Dazzling", "Debonair", "Decorous", "Deeply", "Delightful", "Deranged", "Detailed", "Devilish", "Diligent", "Dirty", "Discreet", "Dispensable", "Dizzy", "Draconian", "Dull", "Dynamic", "Eager", "Eatable", "Educated", "Efficient", "Elite", "Empty", "Encouraging", "Energetic", "Enthusiastic", "Erect", "Ethereal", "Excellent", "Exclusive", "Expensive", "Exultant", "Faded", "Fanatical", "Fantastic", "Fast", "Faulty", "Feigned", "Festive", "Finicky", "Flashy", "Flippant", "Foamy", "Forgetful", "Frail", "Friendly", "Funny", "Futuristic", "Gainful", "Gaudy", "Giant", "Glib", "Glossy", "Gorgeous", "Grandiose", "Groovy", "Grouchy", "Grumpy", "Guiltless", "Gusty", "Habitual", "Hallowed", "Handsome", "Hapless", "Harmonious", "Healthy", "Heavenly", "Hellish", "Hesitant", "Highfalutin", "Historical", "Hollow", "Horrible", "Huge", "Humdrum", "Hungry", "Hysterical", "Imaginary", "Imminent", "Imperfect", "Incandescent", "Inconclusive", "Innate", "Internal", "Irate", "Jaded", "Jazzy", "Jittery", "Jolly", "Judicious", "Jumpy", "Knowing", "Known", "Lackadaisical", "Lamentable", "Large", "Laughable", "Lazy", "Learned", "Lethal", "Lewd", "Likeable", "Little", "Long", "Lopsided", "Lovely", "Low", "Lucky", "Lush", "Lying", "Macabre", "Maddening", "Magenta", "Magnificent", "Makeshift", "Mammoth", "Meek", "Merciful", "Mighty", "Miniature", "Momentous", "Mundane", "Mushy", "Needless", "Neighborly", "New", "Nifty", "Noisy", "Nondescript", "Nostalgic", "Noxious", "Numberless", "Nutritious", "Obedient", "Obscene", "Observant", "Obtainable", "Odd", "Onerous", "Orange", "Organic", "Oval", "Overjoyed", "Overt", "Panoramic", "Parsimonious", "Pathetic", "Penitent", "Periodic", "Perpetual", "Phobic", "Piquant", "Plausible", "Plucky", "Political", "Precious", "Pretty", "Productive", "Protective", "Psychedelic", "Puffy", "Puny", "Quack", "Quarrelsome", "Quick", "Quiet", "Quizzical", "Racial", "Rainy", "Rampant", "Raspy", "Rebellious", "Recondite", "Redundant", "Relieved", "Resolute", "Rhetorical", "Rightful", "Roasted", "Romantic", "Round", "Ruddy", "Rustic", "Sable", "Sassy", "Scandalous", "Scary", "Scintillating", "Secretive", "Seemly", "Shallow", "Short", "Silly", "Skillful", "Sloppy", "Small", "Sneaky", "Snotty", "Somber", "Spectacular", "Spiffy", "Splendid", "Spurious", "Square", "Staking", "Statuesque", "Stereotyped", "Stingy", "Subdued", "Successful", "Sulky", "Swanky", "Symptomatic", "Tacit", "Talented", "Tame", "Tan", "Tangy", "Tasteful", "Tearful", "Temporary", "Tenuous", "Testy", "Thinkable", "Tight", "Tiny", "Toothsome", "Tough", "Tranquil", "Tricky", "Truculent", "Ubiquitous", "Unable", "Unadvised", "Uncovered", "Uneven", "Unsuitable", "Upbeat", "Utter", "Various", "Verdant", "Vivacious", "Volatile", "Vulgar", "Waggish", "Wanting", "Warm", "Wasteful", "Watery", "Wealthy", "Wee", "Whimsical", "Wiry", "Wistful", "Wooden", "Workable", "Yellow", "Yummy", "Zippy"
],
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
					//new plan:
					//
					//explode the name. drop middle names. foreach part{
						//Check if it's in nameMap:
							//It is: break and go to replace it
							//It isn't:
							//	pop a new name off the unusedNames array
						//Replace the name part in newName
					//}
					//replace the name on the page
					
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
