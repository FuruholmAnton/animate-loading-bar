'use strict';

import gsap from 'gsap'






let tl  = new TimelineMax({ repeat: 0 });
let tl2  = new TimelineMax({ repeat: 0 });


/*----------  Library  ----------*/
var loadingAnimation = {

    init: function() {

    	let _this = this;

		let bar1 = document.querySelector('.header-loading'),
			bar2 = document.querySelectorAll('.header-loading')[1];

	    this.line1 = [].slice.call(bar1.querySelectorAll('.header-loading__line')),
	    this.line2 = [].slice.call(bar2.querySelectorAll('.header-loading__line'));

	    this.colors = ['#daa9ae', '#98b8c1', '#d6deeb', '#acb198'];
	    this.index = 0;

    },


	start: function() {

		tl.clear()
		tl2.clear()

    	let _this = this;

		let tweenOptionsFrom = {
	      x: '-100%'
	    };
	    // let tweenOptionsTo = { 
	    // 	x: '100%',
	    // 	ease: Power2.easeOut, 
	    // 	onRepeat: _this.changeColor,
	    // 	onRepeatScope: _this,
	    // 	onRepeatParams: ['{self}'],

	    // 	onStart: _this.changeColor,
	    // 	onStartScope: _this,
	    // 	onStartParams: ['{self}'],

	    // 	onUpdate: _this.setIndexHigh,
	    	
	    // };

	    this.line1.forEach(function(el, index){

	        /* Where the magic happens */
	        tl.add( TweenMax.fromTo(el, 4, tweenOptionsFrom, { 
		    	x: '100%',
		    	ease: Power2.easeOut, 
		    	onRepeat: _this.changeColor,
		    	onRepeatScope: _this,
		    	onRepeatParams: ['{self}'],

		    	onStart: _this.changeColor,
		    	onStartScope: _this,
		    	onStartParams: ['{self}'], 

		    	onUpdate: _this.setIndexHigh,
		    	onComplete : _this.pause
		    	
		    }), '-=' + (index * 2) );
	        
	    });

	    this.line2.forEach(function(el, index){
                
	        /* Where the magic happens */
	        tl2.add( TweenMax.fromTo(el, 4, tweenOptionsFrom, { 
		    	x: '100%',
		    	ease: Power2.easeOut, 
		    	onRepeat: _this.changeColor,
		    	onRepeatScope: _this,
		    	onRepeatParams: ['{self}'],

		    	onStart: _this.changeColor,
		    	onStartScope: _this,
		    	onStartParams: ['{self}'],

		    	onUpdate: _this.setIndexHigh,
		    	onComplete : _this.pause
		    	
		    }), '-=' + (index * 2)  );
	    });

	    tl.vars.onComplete = _this.finishAnimation;

	},


	onrepeat: function(self) {
	    this.setIndexLow.call(this, self.target);
	    this.changeColor.call(this, self);
	},


	changeColor: function(Tween) {
	    Tween.target.style.backgroundColor = this.colors[this.index];
	    
	    if ( this.index < (this.colors.length - 1) ) {
	        this.index++;
	    } 
	    else {
	        this.index = 0;
	    }
	},


	/**
	 * Set index to high towards animation end. So that it will always stay on top. 
	 */
	setIndexHigh: function() {
	    var time = Math.round(this.time() * 10) / 10;
	    if (time > 2) {
	      	this.target.style['z-index'] = 10;
	    }
	},


	/**
	 * Set index to Low at the start. So that it will always stay on below. 
	 */
	setIndexLow: function() {
	    this.target.style['z-index'] = 9;
	},

	finishAnimation: function() {
	    /* Runs when repeat is set to 0 */
	    // this.pause(0, true);
	    tl.kill();
	    tl2.kill();
	},

	stop: function() {
		tl.repeat(0);
		tl2.repeat(0);
	},

	pause: function() {
		this.pause(0, true);
	}


};


/*----------  EXPORT  ----------*/

module.exports = loadingAnimation;

// module.exports = {
// 	init : loadingAnimation.init,
// 	start : loadingAnimation.start,
// 	stop : loadingAnimation.stop
// };
