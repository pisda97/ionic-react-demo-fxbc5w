import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import Page1 from './Page1';
import NotFound from './NotFound';
import { IonReactRouter, ViewManager } from '@ionic/react-router';
import { IonApp, IonPage, IonButton, IonIcon, IonRouterOutlet } from '@ionic/react';
import './style.css';
import App from './App';

render(<App />, document.getElementById('root'));
