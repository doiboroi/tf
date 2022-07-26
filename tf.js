// version 1.3
jQuery("head").append('<style>\
	.my-setting, #next_chap{ opacity:0.5; position: fixed; right: 0; z-index: 99999; }\
	.my-setting{line-height:200%;opacity:0.5;width:110px;height:47px;position:fixed;left:50%;background-color: #5cb85c;}\
	.my-setting{cursor:pointer;opacity:0.3;right: auto;left:0;width:110px;transform:none;text-align:center;font-size:25px;}\
	.my-setting.active{opacity:0.7}\
	.close-btn{z-index:999999}\
	.cover-scroll{border-right:2px solid green;position: fixed;z-index:10;left: 0;right: 0; top: 0;bottom: 0;display:none;}\
	.cover-scroll.active{display:block}\
	body{overflow:scroll !important; }\
	/*.my-setting,#next_chap{top: 100%;transform: translateY(-100%);}*/\
	.pdown{}\
	\
	\
	\
	.pdown{display:none}\
	.pdown{opacity:0.5;width:110px;height:47px;position:fixed;left:50%;background-color: #5cb85c;top: 100%;transform:translate(-50%);}\
	\
	\
	\
	.winh{position:fixed;top:0;left:0;background:green;color:yellow;padding:3px;}\
	\
	\
	\
	#wrap,.chapter .chapter-c {background:black;color:#7c7c7c}\
	</style>')

var bFlip = false
	bFlip = true
var direction = "left"
direction = ""
if( getUrlParameter('dir') == "left" || getUrlParameter('dir') == "l" || getUrlParameter('d') == "left" || getUrlParameter('d') == "l" ){
	direction = "left"
	if( jQuery("#next_chap").attr("href").indexOf("dir=left") == -1 ){
		let sNewHref = jQuery("#next_chap").attr("href") + "?dir=left"
		jQuery("#next_chap").attr( "href", sNewHref  )
		
		sNewHref = jQuery("#prev_chap").attr("href") + "?dir=left"
		jQuery("#prev_chap").attr( "href", sNewHref  )
		
	}
}else if( getUrlParameter('dir') == "right" || getUrlParameter('dir') == "r" || getUrlParameter('d') == "right" || getUrlParameter('d') == "r" ){
	direction = "right"
	if( jQuery("#next_chap").attr("href").indexOf("dir=right") == -1 ){
		let sNewHref = jQuery("#next_chap").attr("href") + "?dir=right"
		jQuery("#next_chap").attr( "href", sNewHref  )
		
		sNewHref = jQuery("#prev_chap").attr("href") + "?dir=right"
		jQuery("#prev_chap").attr( "href", sNewHref  )
		
	}
}else bFlip = false
	
if( bFlip == true ){
	let iMaxWidth = window.innerHeight - 20 + "px"
	let wWidth = window.innerWidth - 50 + 'px'
	jQuery("head").append('<style>\
		*{max-width:'+iMaxWidth+' !important}\
		.navbar-header{display:none;}\
		body{transform: rotate(-90deg);}\
		.cover-scroll{height:5000px !important;}\
		.my-setting, #next_chap{top:'+wWidth+' !important;opacity:0.1; transition:opacity 1s}\
		.my-setting.active{opacity:0.2}\
		.cover-scroll{height:'+wWidth+'}\
	</style>')
	jQuery("#chapter-big-container").width(window.innerHeight - 20 )
	jQuery("body").on("keypress", function(e){
		if( e.which == 32 ){
			jQuery(".cover-scroll").click()
		}
	})
	
	if( direction == "right" ){
		jQuery("head").append('<style>\
			body{transform: rotate(90deg);transform: rotate(90deg) translateY(-120%);}\
		</style>')
		jQuery("body").attr("ofs", 0)
	}
}

jQuery("body").on("mouseover", ".my-setting, #next_chap", function(){
	jQuery(".my-setting, #next_chap").css( "opacity", "0.7" )
})

jQuery("body").on("mouseout", ".my-setting, #next_chap", function(){
	jQuery(".my-setting, #next_chap").css( "opacity", "0.1" )
})

if( getUrlParameter('winheight') ){
	jQuery("body").append('<div class="winh"></div>')
	window.setInterval(function(){
		jQuery(".winh").text( window.innerHeight )
	}, 100 )
}


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
	let wW = window.innerWidth
	//let wSc = jQuery(window).scrollTop()
	let wSc = $('body').scrollTop()
	let wScL = jQuery(window).scrollLeft();

	let onePage = wH + wSc - 70
	let onePageWidth = wW + wScL - 70
	if( bFlip == true ){
		if( direction == "right" ){
			let ofs = jQuery("body").attr("ofs")
			ofs = parseInt( ofs ) + 1 
			jQuery("body").attr("ofs", ofs)
			let toLeft = ofs*180 + 120
			jQuery("body").css({"transform":"rotate(90deg) translateY(-"+toLeft+"%)"})
			onePageWidth = jQuery("body").offset().left + 558
			console.log( onePageWidth )
			jQuery(".my-setting, #next_chap").attr("style", "width: 170px;top:"+onePageWidth + "px !important")
			console.log( "onePageWidth: " + onePageWidth )
			
		}else{
			jQuery(window).scrollLeft( onePageWidth );
			onePageWidth += wW - 50
			jQuery(".my-setting, #next_chap").attr("style", "width: 170px;top:"+onePageWidth + "px !important")
			console.log( "onePageWidth: " + onePageWidth )
		}
	}else{
		//jQuery(window).scrollTop( onePage )
		$('html,body').animate({scrollTop:onePage}, 150);
	}
	
	
})

jQuery("body").prepend('<button class="exitfullscreen">Exit Full Screen</button>')
jQuery("body").prepend('<button class="fullscreen">Full Screen</button>&ensp;&ensp;')

jQuery(".fullscreen").click(function(){
	console.log("clicked fullscreen")
	var elem = document.querySelector("body"); 
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	}else{
		console.log("not work")
	}
});
jQuery(".exitfullscreen").click(function(){
	document.exitFullscreen()
})

//setting
jQuery("body").append( '<div class="my-setting"><span class="glyphicon glyphicon-cog"></span></div>' )
jQuery(".my-setting").css("width", iNextW + "px")
jQuery("body").on("click",'.my-setting', function(){
	jQuery(this).toggleClass("active")
	if( jQuery(this).hasClass("active") ){
		jQuery(".cover-scroll").css("display","block")
		localStorage.setItem('bOpenCover', true)
	}else{
		jQuery(".cover-scroll").css("display","none")

		localStorage.setItem('bOpenCover', "") 
	}
})

var bOpenCover = false
if( undefined == localStorage.getItem('bOpenCover') || localStorage.getItem('bOpenCover') == ""|| localStorage.getItem('bOpenCover') == "false" ){
    bOpenCover = false
}else{
    bOpenCover = true
}

if( bOpenCover ){
	if( !jQuery(".my-setting").hasClass("active") ){
		jQuery(".my-setting").click()
		localStorage.setItem('bOpenCover', true) 
	}
}



// reset top of bottom button
function reset_bottom_btn_top(){
	let iWinH = window.innerHeight
	let iNextBtnH = jQuery("#next_chap").outerHeight()
	let iNewTop = iWinH - iNextBtnH
	jQuery(".my-setting,.pdown,#next_chap").css("top", iNewTop + "px")
}
reset_bottom_btn_top()


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

	reset_bottom_btn_top()
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


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
var br = document.getElementsByTagName('br'),
        l = br.length,
        i = 0,
        nextelem, elemname, include;
        
    // Loop through tags
    for (i; i < l - 1; i++) {
        // This flag indentify we should hide the next element or not
        include = false;
        
        // Getting next element
        nextelem = br[i].nextSibling;
        
        // Getting element name
        elemname = nextelem.nodeName.toLowerCase();
        
        // If element name is `br`, set the flag as true.
        if (elemname == 'br') {
            include = true;
        }
        
        // If element name is `#text`, we face text node
        else if (elemname == '#text') {
            // If text node is only white space, we must pass it.
            // This is because of something like this: `<br />   <br />`
            if (! nextelem.data.replace(/\s+/g, '').length) {
                nextelem = br[i+1];
                include = true;
            }
        }
        
        // If the element is flagged as true, hide it
        if (include) {
            nextelem.style.display = 'none';
        }
    }
