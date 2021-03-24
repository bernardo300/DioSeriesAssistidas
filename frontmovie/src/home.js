import React from 'react';
import './App.css';
//Import link to routing to other components
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//bootstrap
//Bootstrap libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import $ from 'jquery';

import axios from 'axios';
class Home extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        data: [],
        userdetails: []
        }
      }
      //Get user details inside bootstrap modal popup
      userdetails(userid){
        
        const fd = new FormData();
          fd.append('userid', userid);
          
          
          axios({
          url:'http://localhost:5000/movies',
          method: 'post',
          data:{
            id: userid
          }
        } ).then(res=>
          {
    
            this.setState({userdetails: res.data});
            $("#myModal").modal("show");
          
          }
          );
        }
      componentDidMount(){
        axios.get('http://localhost:5000/movies').then(res => 
        {
        
        this.setState({data: res.data});
           }); 
        
        }
    
  render() {
   
    return (
     
      <div className="maincontainer">
        
        <h1 className="mr-5 ml-5 mt-5">Reactjs simple crud tutorial for beginners</h1>
        <div className="container mb-5 mt-5 text-left">
        <button className="bg-primary mb-3"><Link class="nav-link" to={'/adduser'}><span>Add</span><i class="fas fa-film-canister"></i></Link></button>
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Nome</th>
              <th>Total Episodios</th>
              <th>Episodio Atual</th>
              <th>Ultima Visualização</th>
              <th>Açoes</th>             
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((result) => {
            let tipo = result.tipo === 0 ? 'Série' : 'Filme';
            let data = (result.last_view).split('T', 1)
            return (
             
                 <tr>
                  <td>{result.id}</td>
                  <td>{result.nome}</td>
                  <td>{result.total_ep}</td>
                  <td>{result.atual_ep}</td>
                  <td>{data}</td>
                  <td>
                    <button className="bg-info" onClick={e => {this.userdetails(result.id)}}> <i class="fas fa-eye"></i> </button>
                    <button className="bg-warning"> <i class="fas fa-edit"></i> </button>
                    <button className="bg-danger"> <i class="fas fa-trash"></i> </button>
                  </td>
                </tr>
             
            )
          })}
                    
          </tbody>
        </table>
                  
      </div>

      <div class="modal" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">
              
                <div class="modal-header">
                  <h4 class="modal-title align-center">User : {this.state.userdetails.id}</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body text-center">
                <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Username</th>
              
            </tr>
          </thead>
          <tbody>
          
             
                  <tr>
                  <td>{this.state.userdetails.nome}</td>
                  <td>{this.state.userdetails.tipo}</td>
                  </tr>
           
            
          </tbody>
        </table>
                </div>
              
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

      </div>        
    )
  };
}
export default Home;
