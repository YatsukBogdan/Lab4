import React from 'react';
import { Router, Route } from 'react-router';

import Main from './Main';
import AddSong from './AddSong';
import Songs from './Songs';
import Song from './Song';
import FindSongs from './FindSongs';

const Routes = (props) => (
  <Router {...props} >
    <Route path="/" component={Main}/>
    <Route path="/songs/page/:page/elements/:elements" component={Songs}/>
    <Route path="/song/:id" component={Song}/>
    <Route path="/addsong" component={AddSong}/>
    <Route path="/findsongs" component={FindSongs}/>
  </Router>
);

export default Routes;
