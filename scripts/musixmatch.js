var http = require('http');

var musixMatch = {
  apiKey: 'apikey=21454e81f8235127b6d31fb57b91502d',
  url: 'http://api.musixmatch.com/ws/1.1/',  
};

musixMatch.getLyrics = function(artist){
  // track search by artist
    // track.search?q_artist=artist&f_has_lyrics=1&format=json
      // artist needs to be URL encoded
    // get track id's of each of the tracks, store in arrray
  var trackList;
  var trackIds = [];

  // TODO: Re-factor using promises (bluebird)
  musixMatch.getTracks(artist, function(x){
    trackList = x.message.body.track_list;
    trackIds = trackList.map(function(track){
      return track.track.track_id;
    });

    musixMatch.grabLyrics(trackIds);
    
  });

  
  
  // request lyrics for each of our tracks in the array using track_id
    // track.lyrics.get?track_id=15953433





  // Store each of the lyrics files we get back and concatenate them
  // Return the concatenated string
};

musixMatch.getTracks = function(artist, next){
  http.get(this.url + 'track.search?' + this.apiKey + '&q_artist=' + encodeURIComponent(artist) + '&f_has_lyrics=1&format=json&page_size=10', function(res){
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