var Afonigizer = require('../afonigizer.js').Afonigizer;
var _ = require('../node_modules/underscore/underscore.js');
describe("The Afonigizer", function(){
'use strict';

	var afonigizer, i;

	beforeEach(function(){
		afonigizer = new Afonigizer(Math);
	});

	describe("Load test libraries",function(){

		it("should load underscore",function(){
			expect(typeof _).toEqual('function');
		});

		//causes error
		xit("should not die on an unloaded library",function(){
			expect(typeof $).not.toEqual('function');
		});

	});

	describe("Aliasing name parts",function(){
		var nameParts = [];
		beforeEach(function(){
			//generate some nameParts
			//we'll just use the index nums as names
			for(i = 0; i < 100; i++){
				nameParts[i] = {};
			}
		});


		it("Should return the same name part alias consistently",function(){

			//generate a bunch of names and aliases
				//nameParts[i] = 
			//}
			
			//setup aliases
			nameParts.forEach(function(elem,index,names){
				//aliasParts.push( afonigizer.aliasPart(i,firstName) );
			});
		});

	});

});
