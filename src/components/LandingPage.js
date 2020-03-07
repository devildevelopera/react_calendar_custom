import React, { Component } from 'react';
import Header from './Header';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import bulb from '../assets/img/bulb2.png';
import {Link} from 'react-router-dom';
// import Slider from "react-slick";
import Slider from "../slide/slider";
import "../slide/slick-theme.css";
import "../slide/slick.css";
import "../slide/docs.css";

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activedate:new Date()
    };
    this.daystrmap = this.daystrmap.bind(this);
    this.set_weeks = this.set_weeks.bind(this);
    this.set_months = this.set_months.bind(this);
  }
  
  set_weeks(weeknum){
    switch (weeknum) {
      case 0: return "Sunday"
      case 1: return "Monday"
      case 2: return "Tuesday"
      case 3: return "Wednesday"
      case 4: return "Thursday"
      case 5: return "Friday"
      case 6: return "Saturday"
    }
  }

  set_months(monthnum){
    switch (monthnum) {
      case 1: return "January"
      case 2: return "Febrary"
      case 3: return "March"
      case 4: return "April"
      case 5: return "May"
      case 6: return "June"
      case 7: return "July"
      case 8: return "August"
      case 9: return "September"
      case 10: return "Octorber"
      case 11: return "November"
      case 12: return "December"
    }
  }

  daystrmap() {

    let carausel = [];
    var weeks = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
    var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var date = new Date();
    carausel.push(
      <div key={0}>
        <h3><div className="weeks">{weeks[date.getDay()]}</div><div className="mondate">{months[date.getMonth()]}&nbsp;{date.getDate()}</div></h3>
      </div>
    );
    // console.log('date forward');
    for(var i= 1; i<500;i++)
    {
      date.setDate(date.getDate() + 1);
      // console.log(date);
      carausel.push(
        <div key={i}>
          <h3><div className="weeks1">{weeks[date.getDay()]}</div><div className="mondate1">{months[date.getMonth()]}&nbsp;{date.getDate()}</div></h3>
        </div>
      );
    }
    date = new Date();
    date.setDate(date.getDate()-500);
    // console.log('date backward');
    for(var i= 1; i<500;i++)
    {
      date.setDate(date.getDate()  + 1);
      // console.log(date);
      carausel.push(
        <div key={i}>
          <h3><div className="weeks">{weeks[date.getDay()]}</div><div className="mondate">{months[date.getMonth()]}&nbsp;{date.getDate()}</div></h3>
        </div>
      );
    }

    return carausel;
  }

  afterChange(e) {
    // console.log(e);
    
    var date=new Date();
    date.setDate(date.getDate()+e);
    if(e>500){
      e=1000-e-1;
      date=new Date();
      date.setDate(date.getDate()-e);
      this.setState({
        activedate: date
      });
    }
    else this.setState({
      activedate: date
    });
    
  }

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 7,
      speed: 300,
      focusOnSelect: true,
      afterChange: this.afterChange.bind(this),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    };

    // console.log(this.state.activedate);
    
    return (
      <div style={{width:'80%', margin:'auto'}}>
        <Slider {...settings} >
         {this.daystrmap()}
        </Slider>
        <div className="bottomdate"> {this.set_weeks(this.state.activedate.getDay())},&nbsp;{this.set_months(this.state.activedate.getMonth()+1)}&nbsp;{this.state.activedate.getDate()}</div>
      </div>
    );
  }
}
