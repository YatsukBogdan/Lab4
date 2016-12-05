import React, { Component } from 'react';
import './style.css';
import $ from 'jquery';
import getArtistTitle from 'get-artist-title';
import Header from '../Header';
import Song from './Song';

const AddSong = React.createClass({
  getInitialState() {
    return {
      songs_data: []
    };
  },
  findSongYoutubeAPI() {
    $.get(
      'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyB0vabH75keA49u85NlpxCSKIunDpO8m7g&q=' + document.getElementById('search-song').value,
      (data) => {
        this.setState({songs_data: data.items});
      }
    )
  },
  renderFoundedSongs(){
    var founded_songs = [];

    for (var i = 0; i < this.state.songs_data.length; i++) {
      if (this.state.songs_data[i].id.videoId) {
        /*var artistTitle = getArtistTitle(this.state.songs_data[i].snippet.title);
        if (!artistTitle){
          console.log(artistTitle);*/
          founded_songs.push(<Song id={i}
                                   videoId={this.state.songs_data[i].id.videoId}
                                   fullTitle={this.state.songs_data[i].snippet.title}
                                   />);
        }
      /* }*/
    }
    return founded_songs;
  },
  render() {
    return (
      <div>
        <Header />
        <div className="container" id="main-content">
          <input onChange={e => this.findSongYoutubeAPI(e)} id="search-song"/>
          <div className='container'>{this.renderFoundedSongs()}</div>
        </div>
      </div>
    );
  }
});

export default AddSong;
