import React, { Component } from 'react';
import $ from 'jquery';
import './style.css';

const Song = React.createClass({
  getInitialState() {
    return {
      editEnabled: false
    }
  },
  deleteSong() {
    $.post(
      '/deletesong',
      {
        id: this.props.id
      },
      (data) => {
        console.log(data);
      }
    );
  },
  updateSong() {
    $.post(
      '/updatesong',
      {
        id: this.props.id,
        title: document.getElementById('title-' + this.props.id).value,
        artist: document.getElementById('artist-' + this.props.id).value
      },
      (data) => {
        console.log(data);
      }
    );
  },
  renderEdit() {
    if (this.state.editEnabled) {
      return (
        <div>
          <p>Title</p>
          <input id={'title-' + this.props.id} value={this.props.title}/>
          <p>Artist</p>
          <input id={'artist-' + this.props.id} value={this.props.artist}/>
          <button onClick={e => this.updateSong(e)}>Update</button>
        </div>
      )
    }
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
            <a className='page-link' href={'/song/' + this.props.id}>
              <h1><b>{this.props.title}</b></h1>
            </a>
            {this.renderEdit()}
            <button onClick={e => this.setState({editEnabled: !this.state.editEnabled})}>Edit</button>
            <button onClick={e => this.deleteSong()}>Delete</button>
          </div>
      </div>
    );
  }
});

export default Song;
