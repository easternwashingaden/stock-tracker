import React, { Component } from 'react';
import './App.css'
class Footer extends Component {
  state = {  }
  render() { 
    return (
      // <section>
      //  {/* <footer classaName="page-footer font-small blue pt-4">© 2020 Copyright: Tithvorlak Mok</footer>  */}
      // {/* <p style={{textAlign: 'center', padding : "4rem", background: "lightgray", fontWeight: "bold", maxHeight: ''} }>© 2020 Copyright: Tithvorlak Mok</p> */}
      // </section>

     
       <div>
         

        	
        {/* <div style={{textAlign: 'center', padding : "4rem", background: "lightgray", fontWeight: "bold", maxHeight: ''} }>
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center">
            <p>© 2020 Tithvorlak Mok - Copyright All right Reversed</p>
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5" id="pedding">
            <ul className="list-unstyled list-inline social text-center">
              <li className="list-inline-item"><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
              <li className="list-inline-item"><a href="http://twitter.com/"><i className="fa fa-twitter"></i></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></li>
              <li className="list-inline-item"><a href="/"><i className="fa fa-google-plus"></i></a></li>
              <li className="list-inline-item"><a href="/" target="_blank"><i className="fa fa-envelope"></i></a></li>
            </ul>
          </div>
        </div>
          
        </div>	 */}

        <footer className="footer p-t-1 bg-dark app-footer">
        <div className="container d-flex flex-column text-center">
          <a href="/trailmix-live/" className="align-self-center" >           
            <img
              alt="Trail Mix Live"
              src="https://lh3.googleusercontent.com/pw/ACtC-3dcvjHB07jx8qG3JCbZRfxZTH6jnB2DPr3LeRoKYcI5QAl3M9xk9mXTYdrME2swfPhRz7XipbrIAotgXvXJPeec5WGOjou-vaQn0TJzGjEloWVsdxB-51w8NlIUOtIxxLlNSCJPuvmGXh-th_tF2Uw=s200-no?authuser=0"
              width="30"
              height="30"
              className="d-inline-block align-top"
            /> 
          </a>
          <p className="text-light text-muted" > TRAIL MIX LIVE © 2020 </p>
        </div>
      </footer>
      </div>
    
    );
  }
}
 
export default Footer;