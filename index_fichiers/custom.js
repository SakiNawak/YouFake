function headerFooter(){
	var headerheight = "";
	var footerheight = "";
	var search_hight = "";
	headerheight = $("#header").outerHeight();
	footerheight = $("#footer").outerHeight();
	
	$("#container").css('padding-top',headerheight+'px');
	$("#container").css('padding-bottom',footerheight+20+'px');
}

function mobileFixes(){
	var WinWidth = $(window).width();
	if( WinWidth <768 ){
		$(".btn-newacc").html("Signup");
		$(".btn-upload b").removeClass("caret");
		$(".btn-upload b").addClass("glyphicon glyphicon-download-alt");

		$(".up_vid a").addClass("glyphicon glyphicon-facetime-video");
		$(".up_img a").addClass("glyphicon glyphicon-picture");
	}
	else{
		$(".btn-newacc").html("Create new account");
		$(".btn-upload b").removeClass("glyphicon glyphicon-download-alt");
		$(".btn-upload b").addClass("caret");

		$(".up_vid a").removeClass("glyphicon glyphicon-facetime-video");
		$(".up_img a").removeClass("glyphicon glyphicon-picture");
	}
}

function playlist_width(){
	var _winWidth = $(window).width();
	$(".item_playlist").css("width", _winWidth+"px");
}

function vidInfo(){
	var VidHight = $(".popular-video .thumb-holder").height();
	$(".popular-video .vid-info").css('height', VidHight+'px');
}

$(document).ready(function(){
	jcf.customForms.replaceAll('.custom-elements');
	//footer at bototm
	headerFooter();
	
	mobileFixes();

	$("body").on('click', '.btn-playlist, .close-playlists', function(){
		$(".playlists-dropdown").toggleClass('active');
		jcf.customForms.replaceAll('.custom-elements');
	});


	$(".navbar-sm-login-links a").click(function(){
		$("body").removeClass('sideactive');
	});

	var adBoxHtml = $('.adbox-holder .clearfix').html();
	if(adBoxHtml<1){
		$('.adbox-holder').remove();
	}

	var adHtml = $('.leaderboard-holder .clearfix').html();
	if(adHtml<1){
		$('.leaderboard-holder').remove();
	}
});

//on resize functions
$(window).resize(function(){
 	headerFooter();
 	mobileFixes();
});