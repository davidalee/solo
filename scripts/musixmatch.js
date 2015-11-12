var http = require('http');

var musixMatch = {
  apiKey: 'apikey=21454e81f8235127b6d31fb57b91502d',
  url: 'http://api.musixmatch.com/ws/1.1/',  
};

musixMatch.getLyrics = function(artist){
  var trackList;
  var trackIds = [];

  // TODO: Re-factor using promises (bluebird)
  // Currently, we're not returning the concatenated lyrics string that we need to send to Watson.
  // Once promises are setup, we can wait until we're finished getting lyrics for all of the tracks
  // and then return concatenatedLyrics, which will then be handed to Watson as a part of the API call
  musixMatch.getTracks(artist, function(x){
    trackList = x.message.body.track_list;
    trackIds = trackList.map(function(track){
      return track.track.track_id;
    });

    musixMatch.downloadLyrics(trackIds);
    
  });

  musixMatch.downloadLyrics(trackIds, function(lyric){
      concatenatedLyrics += lyric + '\n';
  });

  // Uncomment below and chain to downloadLyrics() once promises are setup
    // .then(function(){
      // return concatenatedLyrics;
    // });
};

musixMatch.getTracks = function(artist, next){
  http.get(this.url + 'track.search?' + this.apiKey + '&q_artist=' + encodeURIComponent(artist) + '&f_has_lyrics=1&format=json&page_size=100', function(res){
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
      data += chunk;
    });
    res.on('end', function(){
      next(JSON.parse(data));
    });
  }).on('error', function(e){
    console.log('Error:', e.message);
  });
};

musixMatch.downloadLyrics = function(trackId, next){
  http.get(this.url + 'track.lyrics.get?' + this.apiKey + '&track_id=' + trackId + 'format=json', function(res){
    var lyrics = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
      lyrics += chunk;
    });
    res.on('end', function(){
      next(JSON.parse(lyrics));
    });
  }).on('error', function(e){
    console.log('Error:', e.message);
  });
};

module.exports = musixMatch;