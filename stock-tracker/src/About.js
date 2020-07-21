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
          <p>I graduated a Master of Science in Computer Information Systems and Sub-concentration in Data Management and Business Intelligence from Boston University where I gained so much knowledge of database management, data analytics, IT project management, and programming languages (Java, R, and advanced SQL).I am currently a Software Engineer student of Ada Developers Academy where I learned full-stack of web development (Ruby, HTML and CSS, Ruby on Rails, Web APIs, Javascript). I also experienced with paired programming, Agile practices, and Test-Driven-Development and learned CS Fundamentals, Data Structure, Data Management, BigO, and efficient algorithm. Before joining Ada, I was an IT Business Analyst who loves coding. I also supported SharePoint Development Engineer. I gained so much knowledge and experiences related to software development life cycle (SDLC). I worked closely with business owners and software engineers, analyzed project requirements, designed software applications, assigned tasks to software engineers, performed functional tests and maintenance, and recommended future enhancements. I also had 3+ years experiences working as an Accounting Specialist specializing in data analytics, where I worked closely with large data set, performed analysis for a wide range of requests using data in different formats and from various platforms, tracked and analyzed the performance of production, manufacturing, services, and other processes to provide supporting data for decision making. I am also highly skilled in Microsoft Suite (Word, Excel, Power Point, Access) and Invoice Processing, Time Management, and Manufacturing Operations Management. I have a strong Accounting background with a Bachelor of Business Administration (B.B.A.) with a major in Management and minor in Psychology from Eastern Washington University.

            Competent Skill Summary:
            - Ruby (Ada)
            - HTML and CSS (Ada)
            - Ruby on Rails (Ada)
            - Web APIs (Ada)
            - Javascript (Ada)
            - CS Fundamentals (Ada)
            - Test-Driven (Ada)
            - Pair Programming (Ada)
            - Agile Practices (Ada)
            - Advanced SQL (Graduated with MSIS)
            - R 
            - Python (Certified)
            - Master Course in Tableau 10 and 2018 for Business Intelligence (Certified)
            - Master Microsoft Excel Macros and Excel VBA (Certified)
            - Google Analytics (Certified)
            - Microsoft Power BI (Certified)
            - Amazon Web Service, AWS EC2 web server, NodeJS Server, AWS RDS database server, S3, SES & CloudWatch (Certified)
            - Microsoft Office Products (Excel, Pivot tables, Vlookups, Access, PowerPoint, Outlook, Visio)
            - Familiarity with Oracle, Big data, Hadoop, MongoDB, Spark, XML

          </p>
        </div>
      </section>

    );
  }
}
 
export default About;