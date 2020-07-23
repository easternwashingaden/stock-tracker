import React, { Component } from 'react';
import AppNav from './AppNav';
import './App.css'

class About extends Component {
  state = {  }
  render() { 
    return (
      <section >
        <AppNav/>
        <div style={{margin:'2rem'}}>
          <img
            className="about-img"
            src="https://i.imgur.com/c7YypYd.jpg"
            alt="Third slide"
            />
          <div class="bio"></div>
          <br></br>
          <h3>Biography</h3>
          <p>
          My name is Tithvorlak (Lak)(She/Her). I graduated with a Masters of Science in Computer Information Systems and Sub-concentration in Data Management and Business Intelligence from Boston University, where I gained a great deal of insight into database management, data analytics, IT project management, and programming languages (Java, R, and advanced SQL). Before joining Ada, I was an IT Business Analyst who loved coding. I gained firsthand knowledge of and experiences with the software development life cycle (SDLC). I worked closely with business owners and software engineers, analyzed project requirements, designed software applications, performed functional tests & maintenance, and recommended future enhancements. I also have 3+ years of experiences working with Accounting and Data analytics.

I am very passionate about software development and interested in solving complex challenges. I love learning and trying new things. I came to Ada because I knew that programming was my future. I am always excited solve problems and build applications/tools that help businesses and users
          </p>
        </div>
      </section>

    );
  }
}
 
export default About;