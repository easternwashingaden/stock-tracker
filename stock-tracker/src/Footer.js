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
         

        	
        <div style={{textAlign: 'center', padding : "1rem", background: "lightgray", marginTop: '20rem'} }>
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center">
            <p>© 2020 Tithvorlak Mok - Copyright All right Reversed</p>
            <div>
            <ul className="list-unstyled list-inline social text-center">
              <li className="list-inline-item"><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
              <li className="list-inline-item"><a href="http://twitter.com/"><i className="fa fa-twitter"></i></a></li>
              <li className="list-inline-item"><a href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></li>
              <li className="list-inline-item"><a href="/"><i className="fa fa-google-plus"></i></a></li>
              <li className="list-inline-item"><a href="/" target="_blank"><i className="fa fa-envelope"></i></a></li>
            </ul>
          </div>
        </div>
          
        </div>	

        
      </div>
    
    );
  }
}
 
export default Footer;