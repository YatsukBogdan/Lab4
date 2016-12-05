import React, { Component } from 'react';
import $ from 'jquery';
import './style.css';

const Song = React.createClass({
  getInitialState () {
    return {
      error: ''
    }
  },
  addSong() {
    if (document.getElementById('title').value == '' || document.getElementById('artist').value == '') {
      this.setState({error: 'Enter artist/title.'});
    }
    $.post(
      '/addsong',
      {
        videoId: this.props.videoId,
        title: document.getElementById('title').value,
        artist: document.getElementById('artist').value,
      },
      (data) => {
        console.log(data);
      }
    );
  },
  render() {
    return (
      <div className="row song-record">
          <div className="col-md-5">
              <a href={'https://www.youtube.com/watch?v=' + this.props.videoId}>
                  <img className="song-img" src={'http://img.youtube.com/vi/' + this.props.videoId + '/0.jpg'} />
              </a>
          </div>
          <div className="col-md-7 song-description">
            <h1><b>{this.props.title}</b></h1>
            <p id={this.props.id}>{this.state.error}</p>
            <p>Title</p>
            <input id='title'/>
            <p>Artist</p>
            <input id='artist'/>
            <button onClick={e => this.addSong(e)}>Add song</button>
          </div>
      </div>
    );
  }
});

export default Song;
