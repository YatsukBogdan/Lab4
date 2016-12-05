import React, { Component } from 'react';
import Header from '../Header';

import './style.css';

import $ from 'jquery';

const Song = React.createClass({
  componentDidMount() {
    this.loadSong();
  },
  getInitialState() {
    return {
      id: 0,
      album: '',
      name: '',
      artist: '',
      year: '',
      lyrics: ''
    }
  },
  loadSong() {
    $.get(
      '/getsong?id=' + this.props.params.id,
      (data) => {
        this.setState({
          id: data.id,
          videoId: data.videoId,
          title: data.title
        });

        var component = this;
        $.ajax({
          type: "GET",
          data: {
              apikey: "39925ab3ce912a9703e0a793ff5e3ccf",
              q_track: component.state.title,
              f_has_lyrics: 1,
              format: "jsonp",
              callback: "jsonp_callback"
          },
          url: "http://api.musixmatch.com/ws/1.1/track.search",
          dataType: "jsonp",
          jsonpCallback: 'jsonp_callback',
          contentType: 'application/json',
          success: function(data) {
            var track_id = data.message.body.track_list[0].track.track_id;

            $.ajax({
              type: "GET",
              data: {
                  apikey: "39925ab3ce912a9703e0a793ff5e3ccf",
                  track_id: track_id,
                  format: "jsonp",
                  callback: "jsonp_callback"
              },
              url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get",
              dataType: "jsonp",
              jsonpCallback: 'jsonp_callback',
              contentType: 'application/json',
              success: function(data) {
                console.log(data.message.body.lyrics.lyrics_body.replace(/(\r\n|\n|\r)/gm, '<br>'));
                component.setState({lyrics: data.message.body.lyrics.lyrics_body.replace(/(\r\n|\n|\r)/gm, '<br>')});
              }
            });
          }
        });
      }
    );
  },
  render() {
    return (
      <div>
        <Header />
        <div className="container" id="main-content">
          <div className="row song-record">
              <div className="col-md-12 song-description">
                  <h1><b>{this.state.title}</b></h1>
              </div>
          </div>
          <div className='row' id="lyrics">
              <p dangerouslySetInnerHTML={{__html: this.state.lyrics}}></p>
          </div>
        </div>
      </div>
    );
  }
});

export default Song;
