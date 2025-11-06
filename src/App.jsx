import process from 'process';
window.process = process;
window.global = window;

import React, { Component } from 'react';
import * as faceapi from 'face-api.js';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import './App.css';
import 'tachyons';

const initialState = {
 input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      modelsLoaded: false,
      user: {
        id: '',
        name: '',
        password: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;  
  }

  async componentDidMount() {
    try {
      // Load face-api.js models from /public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      this.setState({ modelsLoaded: true });
      console.log('✅ Face API models loaded');
    } catch (err) {
      console.error('Error loading face-api models:', err);
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  detectFaces = async () => {
    const image = document.getElementById('inputimage');
    if (!image) return;

    try {
      const detections = await faceapi.detectAllFaces(
        image,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (!detections.length) {
        this.setState({ boxes: [] });
        return;
      }

      // Resize detections to match displayed image
      const displaySize = { width: image.width, height: image.height };
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const boxes = resizedDetections.map((d) => ({
        leftCol: d.box.x,
        topRow: d.box.y,
        width: d.box.width,
        height: d.box.height,
      }));

      this.displayFaceBox(boxes);
    } catch (err) {
      console.error('Face detection error:', err);
    }
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = async () => {
    if (!this.state.modelsLoaded) {
      alert('Please wait — models are still loading.');
      return;
    }

    this.setState({ imageUrl: this.state.input }, async () => {
      // Detect faces after image renders
      setTimeout(() => {
        this.detectFaces();
      }, 500);

      // Optional: update user entries
      if (this.state.user.id) {
        try {
          const res = await fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id }),
          });
          const count = await res.json();
          this.setState(Object.assign(this.state.user, { entries: count }));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

 onRouteChange = (route) => {
  if (route === 'signout') {
    // Keep modelsLoaded true so face-api models don't reload or hang
    this.setState({
      ...initialState,
      modelsLoaded: true
    });
  } else if (route === 'home') {
    this.setState({ isSignedIn: true });
  }
  this.setState({ route });
};

  render() {
    const { isSignedIn, imageUrl, route, boxes, modelsLoaded } = this.state;

    return (
      <div className="App">
        {/* background effect */}
        <ParticlesBg type="cobweb" bg={true} />

        {/* navigation bar */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        {/* loading overlay */}
        {!modelsLoaded && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.9)',
              zIndex: 9999,
            }}
          >
            <h2>Loading face detection model...</h2>
          </div>
        )}

        {/* main route content */}
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
