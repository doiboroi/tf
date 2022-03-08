function share_function(){
	// page down
	jQuery("body").append( '<div class="pdown"></div>' )
	jQuery("body").on("click", ".pdown", function(){
		let wH = window.innerHeight
		let wSc = jQuery(window).scrollTop()

		let onePage = wH + wSc - 70
		jQuery(window).scrollTop( onePage )
	})

	// close btn
	jQuery("body").on("click", ".close-btn", function(){
		jQuery(this).parent().remove()
	})

	// remove bottom right ads
	var iCount = 1000
	var waitAdInterval = setInterval(function(){
		if( jQuery("div[id^=fly]").length || iCount-- <=0){
			jQuery("div[id^=fly]").remove()
			clearInterval( waitAdInterval)
		}
	},100)
}



if( window.location.href.indexOf('full.vn') != -1 ){
	function remove_ad(){
		jQuery(".ads-iads").remove()
		jQuery(".ads-mobile").remove()
		jQuery(".group_story.text-center").remove()
		jQuery(".ads-content").remove()
		jQuery(".nt-fl-ad").remove()
		jQuery("#ads-inpage-container").remove()
		jQuery(".ads-responsive").remove()
	}

	jQuery(document).ready(function(){
		remove_ad()
	})


	jQuery(window).load(function(){
		remove_ad()
		share_function()
	})

	jQuery("head").append('<style>\
	#prev_chap, #next_chap{ opacity:0.5; position: fixed; right: 0; bottom: 0; z-index: 99999; }\
	#prev_chap{ right: auto;left:0 }\
	.pdown{opacity:0.5;width:110px;height:47px;position:fixed;bottom:0;left:50%;transform:translateX(-50%);background-color: #5cb85c;}\
	.close-btn{z-index:999999}\
	</style>')
}else if( window.location.href.indexOf('full.com') != -1 ){

	function remove_ad(){
		jQuery(".adsbygoogle").remove()
		jQuery(".google-auto-placed").remove()
		jQuery(".ads").remove()
		jQuery("div[id^=fly]").remove()
	}

	jQuery(document).ready(function(){
		remove_ad()
	})


	jQuery(window).load(function(){
		remove_ad()
		share_function()
	})


	jQuery("head").append('<style>\
	.prevChapter, .nextChapter{opacity:0.5; position: fixed; right: 0; bottom: 0; z-index: 99999; }\
	.prevChapter{ right:auto;left:0 }\
	.pdown{opacity:0.5;width:110px;height:47px;position:fixed;bottom:0;left:50%;transform:translateX(-50%);background-color: #5cb85c;}\
	.close-btn{z-index:999999}\
	</style>')
	
}

