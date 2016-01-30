function recentLFM(user,limit,imgsize,container) {
	// Defaults
	var counter = 0;
	var list = '<ul class=\"lfm-recent\"></ul>';
	var divider = ' &ndash; ';
	var apikey = '048785ed2aa0722643cb5c81cc39baa2'; // Generate your own API Key for use
	var imgsize = 1;
	var html = '';
	var limit = 3;
	
	var user = $("div").data('lfm-user');
	var limit = $("div").data('lfm-limit');
	var imgsize = $("div").data('lfm-imgsize');
	
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user="+user+"&api_key="+apikey+"&limit="+limit+"&format=json&callback=?", function(data) {
		
		$.each(data.recenttracks.track, function(i, item) {
	        // Isolate the Artist URL from the track URL
            var artistlink = item.url.split('_/');
            
            // Loop through data
            if(i < (limit)) {
                html += '<li class="lfm-track"><a href="'+item.url+'" class="lfm-artork" target="_blank"><img src="'+item.image[imgsize]['#text']+'" alt="Album cover for '+item.album['#text']+'" /></a><span class="lfm-trackname"><a href="'+item.url+'">'+item.name+'</a></span>'+divider+'<span class="lfm-artist"><a href="'+artistlink[0]+'" target="_blank">'+item.artist['#text']+'</a></span></li>';
			}
            i++ // add 1 to the counter variable each time the each loop runs
        }); // close each loop
        
        $(container).append(html).wrapInner(list);
		
		});
} // End recentLFM function

$(document).ready(function() {
	
	recentLFM(user,limit,imgsize,'.lfm');
	
}); // End document ready function