/*jshint browser:true, devel:true*/
/*global beforeEach:false, describe: false, it: false, expect: false, xit: false, xdescribe: false*/

var Afonigizer = require('../afonigizer.js').Afonigizer;
var _ = require('../node_modules/underscore/underscore.js');
require('../node_modules/UnderscoreMatchersForJasmine/lib/UnderscoreMatchersForJasmine.js');
describe("The Afonigizer", function(){
'use strict';

	var afonigizer, af, i;

	beforeEach(function(){
		afonigizer = af = new Afonigizer(Math);
	});

	describe("Load test libraries",function(){

		it("should load underscore",function(){
			expect(typeof _).toEqual('function');
		});

		//causes error
		it("should not die on an unloaded library",function(){
			expect(typeof $).not.toEqual('function');
		});

	});

	describe("API",function(){
		it("should expose the expected methods",function(){
			console.log();
			['alias','aliasPart','textBlock','doIt'].forEach(function(fName,k,all){
				expect(afonigizer[fName]).toBeA(Function); 
			});
			//expect(new Afonigizer(Math) ).toBeA(Function);
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

		it("Should throw an error if no name part type is passed",function(){
			expect( function(){ af.aliasPart('John'); } ).toThrow();
		});

		it("Should return the same first name part alias consistently",function(){
			nameParts.forEach(function(elem,index,names){
				//store alias
				elem.alias = af.aliasPart(index,'first');
				//test that it returns again
				expect(af.aliasPart(index,'first')).toEqual(elem.alias);
				//it should still work if a last name is requested
				expect(af.aliasPart(index,'last')).toEqual(elem.alias);
				//it should NOT return the same alias for the wrong name
				expect(af.aliasPart(index-1,'last')).not.toEqual(elem.alias);
			});
		});

	});

});
