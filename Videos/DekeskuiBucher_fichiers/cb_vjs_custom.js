function new_player_height (videoid,width,height,embed) {
	var player_ratio = 1.77777;
	var native_player = $(".cb_video_js_"+videoid+"-dimensions"); 
	var native_player_width = native_player.width();
	var native_player_height = native_player_width/player_ratio;

	if (width != false && width.indexOf("px") > 0){
		native_player.parent('body').css({
			"width":width,
			"height":height
		})
	}else{
		if (embed){
			native_player.parent('body').css({
				"width":width,
				"height":height,
				"position":'absolute',
				"overflow":'hidden'
			})
			native_player.css({
				"position":'absolute',
				"height":height,
				"width":width,
			});
		}else{
			native_player.css({
				"height":native_player_height,
			});
		}
	}
	
}

function updateVideoViews(videoid,userid){
	
	// console.log(videoid);

	var id = videoid;
	var uid = userid;

	 $.ajax({
        
        method: 'POST',
        url: baseurl+'/ajax.php',
        dataType: "text",
       	data : {
        'mode' : 'add_video_view',
        'videoid' : id,
        'userid' : uid
   		},
       
	}).done(function(data){
			
			data = data;
			data = $.parseJSON(data);
			console.log(data);
            
    });

}
