(function(){
	"use strict";


	function readyComponent(){
		this.customStyle["--ab-juice-color"] = this.color;
		this.customStyle["--ab-juice-delay"] = this.delay + "s";
		this.customStyle["--ab-juice-time"] = this.time + "s";
		this.customStyle["--ab-juice-height"] = this.height + "px";
	}

	function changeComponent(){
		this.customStyle["--ab-juice-color"] = this.color;
		this.customStyle["--ab-juice-delay"] = this.delay + "s";
		this.customStyle["--ab-juice-time"] = this.time + "s";
		this.customStyle["--ab-juice-height"] = this.height + "px";
	}

	window["readyComponent"] = readyComponent;
	window["changeComponent"] = changeComponent;

}());
