jQuery("head").append('<style>\
	.my-setting, #next_chap{ opacity:0.5; position: fixed; right: 0; z-index: 99999; }\
	.my-setting,.pdown{opacity:0.5;width:110px;height:47px;position:fixed;left:50%;background-color: #5cb85c;}\
	.my-setting{cursor:pointer;opacity:0.3;line-height:47px;right: auto;left:0;width:110px;transform:none;text-align:center;font-size:25px;}\
	.my-setting.active{opacity:0.7}\
	.close-btn{z-index:999999}\
	.cover-scroll{background:cyan;opacity:0.3; border-right:1px solid blue;position: fixed;left: 0;right: 0; top: 0;bottom: 100px;display:none;}\
	.cover-scroll.active{display:block}\
	.my-setting,.pdown,#next_chap{top: 100%;transform: translateY(-100%);}\
	.pdown{transform:translate(-50%,-100%);}\
	</style>')


// cover scroll
jQuery("body").append('<div class="cover-scroll"></div>')

// page down
jQuery("body").append( '<div class="pdown"></div>' )
let iNextW = jQuery("#next_chap").outerWidth()
let iWinW = window.innerWidth
let iPdownW = iWinW - iNextW * 2 - 6
jQuery(".pdown").css("width", iPdownW + "px")
jQuery("body").on("click", ".pdown, .cover-scroll", function(){
	let wH = window.innerHeight
	let wSc = jQuery(window).scrollTop()

	let onePage = wH + wSc - 70
	jQuery(window).scrollTop( onePage )
})


//setting
jQuery("body").append( '<div class="my-setting"><span class="glyphicon glyphicon-cog"></span></div>' )
jQuery(".my-setting").css("width", iNextW + "px")
jQuery("body").on("click",'.my-setting', function(){
	jQuery(this).toggleClass("active")
	if( jQuery(this).hasClass("active") ){
		jQuery(".cover-scroll").css("display","block")
	}else{
		jQuery(".cover-scroll").css("display","none")
	}

})


jQuery(window).resize(function(){
	let iNextW = jQuery("#next_chap").outerWidth()
	let iWinW = window.innerWidth
	let iPdownW = iWinW - iNextW * 2 - 6
	jQuery(".pdown").css("width", iPdownW + "px")
	jQuery("body").on("click", ".pdown", function(){
		let wH = window.innerHeight
		let wSc = jQuery(window).scrollTop()

		let onePage = wH + wSc - 70
		jQuery(window).scrollTop( onePage )
	})


	jQuery(".my-setting").css("width", iNextW + "px")
})

function share_function(){
	

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


	var iCheckAdCount = 50 // 10 seconds
	var iCheckAd = setInterval(function(){

		jQuery("div").each(function(){
		    if( $(this).css("position") == "absolute"){
		       $(this).remove()
		    }
		})

		if( iCheckAdCount-- <= 0 ){
			clearInterval( iCheckAd)
		}

	}, 200 )


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

	remove_ad()

	jQuery(document).ready(function(){
		remove_ad()
	})

	jQuery(window).load(function(){
		remove_ad()
		share_function()
	})
}else if( window.location.href.indexOf('full.com') != -1 ){

	function remove_ad(){
		jQuery(".adsbygoogle").remove()
		jQuery(".google-auto-placed").remove()
		jQuery(".ads").remove()
		jQuery("div[id^=fly]").remove()
	}

	remove_ad()

	jQuery(document).ready(function(){
		remove_ad()
	})


	jQuery(window).load(function(){
		remove_ad()
		share_function()
	})
}

