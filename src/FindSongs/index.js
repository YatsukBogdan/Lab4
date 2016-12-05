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
  findSongs() {
    $.post(
      '/findsong',
      {
        word: document.getElementById('search-song').value
      },
      (data) => {
        this.setState({songs_data: data});
      }
    )
  },
  renderFoundedSongs(){
    var founded_songs = [];
    for (var i = 0; i < this.state.songs_data.length; i++) {
      founded_songs.push(<Song id={i}
                               videoId={this.state.songs_data[i].videoId}
                               fullTitle={this.state.songs_data[i].title} />);
    }
    return founded_songs;
  },
  render() {
    return (
      <div>
        <Header />
        <div className="container" id="main-content">
          <input onChange={e => this.findSongs(e)} id="search-song"/>
          <div className='container'>{this.renderFoundedSongs()}</div>
        </div>
      </div>
    );
  }
});

export default AddSong;
