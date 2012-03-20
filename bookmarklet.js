var afonigizer = afonigizer || (function (window, Math, Node) {
	'use strict';
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
				textblockSelector : false,//dynamic classnames, haven't figured this out...
				//the name selector matches name links and avatar image links
				//so this checks that there is only one (text) child node
				nameFilter : function (anchor) {
					return ( anchor.childNodes.length === 1 &&
							 anchor.firstChild.nodeType === Node.TEXT_NODE );
				},
				//this is what to hash against g+ has diff img.src for medium 
				//& small thumbs, so we use the oid (user id)
				hashAttribute : 'oid'
			},
			facebook : {
				avatarSelector : 'img.uiProfilePhoto',
				nameSelector : 'a.actorName, div.actorName a' +
					', a.passiveName, span.passiveName, a[data-hovercard]' +
					',  span.profileName',
				textblockSelector : '.messageBody, .commentBody',
				nameFilter : function (anchor) {
					return ( anchor.childNodes.length === 1 &&
							 anchor.firstChild.nodeType === Node.TEXT_NODE );
				},
				hashAttribute : 'src'
			}
		},
		//@todo I probably don't need quite this many...
		fNames = {
			all : [
				"Abashed", "Abhorrent", "Abject", "Abnormal", "Aboriginal", "Abrupt", "Abstracted", "Accessible", "Adjoining", "Alert", "Alive", "Alluring", "Ambiguous", "Amuck", "Animated", "Aquatic", "Aspiring", "Astonishing", "Available", "Aware", "Bad", "Bashful", "Beautiful", "Berserk", "Boiling", "Boring", "Brash", "Breezy", "Bright", "Burly", "Callous", "Capricious", "Changeable", "Childlike", "Chivalrous", "Chunky", "Classy", "Cloudy", "Coherent", "Colossal", "Comfortable", "Cool", "Courageous", "Crabby", "Crazy", "Creepy", "Cuddly", "Curly", "Dapper", "Dazzling", "Debonair", "Decorous", "Deeply", "Delightful", "Deranged", "Detailed", "Devilish", "Diligent", "Dirty", "Discreet", "Dispensable", "Dizzy", "Draconian", "Dull", "Dynamic", "Eager", "Eatable", "Educated", "Efficient", "Elite", "Empty", "Encouraging", "Energetic", "Enthusiastic", "Erect", "Ethereal", "Excellent", "Exclusive", "Expensive", "Exultant", "Faded", "Fanatical", "Fantastic", "Fast", "Faulty", "Feigned", "Festive", "Finicky", "Flashy", "Flippant", "Foamy", "Forgetful", "Frail", "Friendly", "Funny", "Futuristic", "Gainful", "Gaudy", "Giant", "Glib", "Glossy", "Gorgeous", "Grandiose", "Groovy", "Grouchy", "Grumpy", "Guiltless", "Gusty", "Habitual", "Hallowed", "Handsome", "Hapless", "Harmonious", "Healthy", "Heavenly", "Hellish", "Hesitant", "Highfalutin", "Historical", "Hollow", "Horrible", "Huge", "Humdrum", "Hungry", "Hysterical", "Imaginary", "Imminent", "Imperfect", "Incandescent", "Inconclusive", "Innate", "Internal", "Irate", "Jaded", "Jazzy", "Jittery", "Jolly", "Judicious", "Jumpy", "Knowing", "Known", "Lackadaisical", "Lamentable", "Large", "Laughable", "Lazy", "Learned", "Lethal", "Lewd", "Likeable", "Little", "Long", "Lopsided", "Lovely", "Low", "Lucky", "Lush", "Lying", "Macabre", "Maddening", "Magenta", "Magnificent", "Makeshift", "Mammoth", "Meek", "Merciful", "Mighty", "Miniature", "Momentous", "Mundane", "Mushy", "Needless", "Neighborly", "New", "Nifty", "Noisy", "Nondescript", "Nostalgic", "Noxious", "Numberless", "Nutritious", "Obedient", "Obscene", "Observant", "Obtainable", "Odd", "Onerous", "Orange", "Organic", "Oval", "Overjoyed", "Overt", "Panoramic", "Parsimonious", "Pathetic", "Penitent", "Periodic", "Perpetual", "Phobic", "Piquant", "Plausible", "Plucky", "Political", "Precious", "Pretty", "Productive", "Protective", "Psychedelic", "Puffy", "Puny", "Quack", "Quarrelsome", "Quick", "Quiet", "Quizzical", "Racial", "Rainy", "Rampant", "Raspy", "Rebellious", "Recondite", "Redundant", "Relieved", "Resolute", "Rhetorical", "Rightful", "Roasted", "Romantic", "Round", "Ruddy", "Rustic", "Sable", "Sassy", "Scandalous", "Scary", "Scintillating", "Secretive", "Seemly", "Shallow", "Short", "Silly", "Skillful", "Sloppy", "Small", "Sneaky", "Snotty", "Somber", "Spectacular", "Spiffy", "Splendid", "Spurious", "Square", "Staking", "Statuesque", "Stereotyped", "Stingy", "Subdued", "Successful", "Sulky", "Swanky", "Symptomatic", "Tacit", "Talented", "Tame", "Tan", "Tangy", "Tasteful", "Tearful", "Temporary", "Tenuous", "Testy", "Thinkable", "Tight", "Tiny", "Toothsome", "Tough", "Tranquil", "Tricky", "Truculent", "Ubiquitous", "Unable", "Unadvised", "Uncovered", "Uneven", "Unsuitable", "Upbeat", "Utter", "Various", "Verdant", "Vivacious", "Volatile", "Vulgar", "Waggish", "Wanting", "Warm", "Wasteful", "Watery", "Wealthy", "Wee", "Whimsical", "Wiry", "Wistful", "Wooden", "Workable", "Yellow", "Yummy", "Zippy"
			],
			unused : []
		},
		lNames = {
			all : [
				"1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100" 
			],
			unused : []
		},
		nameMap = {}, //where names will go as we assign them
		nameSalt = 'afon_', //this is so I don't overwrite something in nameMap prototype 

		setConf = function () {
			if (host === 'plus.google.com') { conf = services.google; }
			else if (host === 'www.facebook.com') { conf = services.facebook; }
		},
		
		/*
		 * returns whether the afonigized class is present
		 * adds it if it's not
		 * @param element elem element to check
		 * @return bool whether elem has the class
		 */
		checkDone = function (elem) {
			var clazz = 'afonigized';
			if (elem.classList.contains(clazz)) {
				return true;
			}
			elem.classList.add(clazz);
			return false;
		},
		/**
		 * Recieve a name, return an alias
		 * if no alias exists, assign a new one
		 * @param String namePart first or last name
		 * @param Object aliases {all, unused}
		 *        aliases to draw from
		 * @return String aliasPart alias for the namePart
		 */
		getAlias = function (namePart, aliases) {
			var nKey = nameSalt+ namePart;
			//if it's not already mapped...
			if (!nameMap.hasOwnProperty(nKey)) {
				//make sure unused isn't empty
				if (!aliases.unused.length) {
					aliases.unused = aliases.all.slice(0);
				}
				//	pop a new name off the supplied array
				nameMap[nKey] = aliases.unused.pop();
			}
			return nameMap[nKey];
		},
		/**
		 * Replace names on the page with aliases
		 */
		fixNames = function (names) {
			var i;
			for (i = 0; i < names.length; i++) {

				var fullName = names.item(i);
				//if a nameFilter function exists and it returns false, it's not a name
				if ( 
					conf.hasOwnProperty('nameFilter') &&
					! conf.nameFilter(fullName)
				) { continue; }
				//don't reconvert anything
				if (checkDone(fullName)) { continue; }

				var fullNameStr = fullName.innerHTML,
				//explode the name. drop middle names.
				    firstName = fullNameStr.match(/^[\S]+/), //try \S
					newFirstName = getAlias(firstName, fNames),
					newFullNameStr = newFirstName;
				if (firstName != fullNameStr) { //Not Cher or Madonna
					var lastName = fullNameStr.match(/[\S]+$/),
						newLastName = getAlias(lastName, lNames);
					newFullNameStr +=  ' ' + newLastName;
				}
				//replace the name on the page
				fullName.innerHTML = newFullNameStr;
				
			}
		},
		fixAvatars = function (avatars) {
			//Replace the profile pic with a robot pic
			var i,
			    avatar,
				newSrc;
			for (i = 0; i < avatars.length; i++) {
				avatar = avatars.item(i);
				//don't reconvert anything
				if (checkDone(avatar)) { continue; }

				//generate image based on profile image src.
				newSrc = imgHashService + avatar.attributes[conf.hashAttribute].value + salt;
				avatar.src = newSrc;
			}
		},
		fixTextblocks = function(blocks){
			var i,
				block,
				newBlock,
				nKey,
				namePart,
				alias,
				namePattern;
			// foreach comment
			for (i = 0; i < blocks.length; i++) {
				block = blocks[i];
				// foreach alias
				for (var saltedNamePart in nameMap) {
					if(nameMap.hasOwnProperty(saltedNamePart)){
						//remove the nameSalt
						namePart = saltedNamePart.match(RegExp(nameSalt + '(.*)$'))[1];
						alias = nameMap[saltedNamePart];
						//replace name
						namePattern = RegExp('\\b(' + namePart + ')\\b',
							"gim");
						newBlock = block.innerHTML.replace(namePattern,alias);
						// replace it in the comments
						block.innerHTML = newBlock;
					}
				}
			}
		}
		;
			
	//initialization
	fNames.all = fNames.all.sort(
		function () {return (Math.round(Math.random()) - 0.5); }
	);
	lNames.all = lNames.all.sort(
		function () {return (Math.round(Math.random()) - 0.5); }
	);
	fNames.unused = fNames.all.slice(0); //copy the array
	lNames.unused = lNames.all.slice(0); //copy the array

	/* PUBLICS */
	return {
		doIt : function () {
			//load the conf for the site we're on
			if (!conf) { setConf(); }

			var avatars = window.document.querySelectorAll(conf.avatarSelector),
			    names = window.document.querySelectorAll(conf.nameSelector),
				textBlocks = false;

			fixNames(names);
			fixAvatars(avatars);

			if (conf.textblockSelector){
			    textBlocks = window.document.querySelectorAll(conf.textblockSelector);
				fixTextblocks( textBlocks ); 
			}

			return true;
		} //doIt()
	}; // PUBLICS
})(window, Math, Node);

afonigizer.doIt();
