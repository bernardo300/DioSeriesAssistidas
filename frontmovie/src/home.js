import React from 'react';
import './App.css';
//Import link to routing to other components
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Swal from 'sweetalert2';

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
        this.addFormData = this.addFormData.bind(this);
      }
      //Form Submission for updation
      addFormData(evt)
        {
          evt.preventDefault();
          let nome = document.getElementById("upnome").value;
          let id = document.getElementById("upid").value;
          let tipo = document.getElementById("uptipo").value;
          
          axios({
            url:'http://localhost:5000/movies',
            method: 'put',
            data: {
              id: id,
              nome: nome,
              tipo: tipo
            }
        
          }).then(res=>
          {
            this.myFormRef.reset();
            $("#editmodal").modal("hide");
            //Get all users details in bootstrap table
            axios.get('http://localhost:5000/movies').then(res => 
            {
            //Storing users detail in state array object
            this.setState({data: res.data});
            }); 
            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'Filme id '+this.refs.upid.value+' foi atualizado.',
              text: res.data.data,
              type: 'success',    
              });           
            }
          ).catch((error) => {
            Swal.fire({
              title: 'Tente mais tarde',
              type: 'error',    
              });
          });
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

      deleteuser(userid)
      {
        const fd = new FormData();
          fd.append('deleteid', userid);
                   
          axios({
            url:'http://localhost:5000/movies',
            method: 'delete',
            data: {
              id: userid
            }
          }).then(res=>
          {
    
            
            //Get all users details in bootstrap table
            axios.get('http://localhost:5000/movies').then(res => 
            {
            //Storing users detail in state array object
            this.setState({data: res.data});
            }); 
            //Success Message in Sweetalert modal
            Swal.fire({
              title: 'Filme id '+userid+' deletado.',
              text: res.data.data,
              type: 'success',
              
            });
          
          }
          ).catch(err => {
            Swal.fire({
              title: 'Tente mais tarde.',
              type: 'error',    
              });
          });
      }
      //Edit User Function
      edituser(userid){       
          const fd = new FormData();
          fd.append('userid', userid);
          let id = userid;
                
          axios({
            url: 'http://localhost:5000/movies',
            method: 'post',
            data:{
              id: id
            }
            }).then(res=>
          {
    
            //Storing user detail in state array object
            this.setState({userdetails: res.data});
            //edit user popup form
            $("#editmodal").modal("show");     
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
        
        <h1 className="mr-2 ml-2 mt-2 text-center">Seu controle de séries e filmes</h1>
        <div className="container mb-2 mt-2 text-right">
        <button className="btn btn-primary mb-3"><Link class="nav-link" to={'/adduser'}><span>Adicionar Novo Filme</span><i class="fas fa-film-canister"></i></Link></button>
        <table class="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Tipo</th>
              <th className="text-center">Nome</th>
              <th className="text-center">Episodios</th>
              <th className="text-center">Episodio Atual</th>
              <th className="text-center">Visto por ultimo</th>
              <th className="text-center">Açoes</th>             
            </tr>
          </thead>
          <tbody>
          {this.state.data.map((result) => {
            let tipo = result.tipo === 0 ? 'Série' : 'Filme';
            let data = (result.last_view).split('T', 1)
            return (           
                 <tr>
                  <td className="text-center">{tipo}</td>
                  <td className="text-left">{result.nome}</td>
                  <td className="text-center">{result.total_ep}</td>
                  <td className="text-center">{result.atual_ep}</td>
                  <td className="text-center">{data}</td>
                  <td>
                    <button className="bg-info" onClick={e => {this.userdetails(result.id)}}> <i class="fas fa-eye"></i> </button>
                    <button className="bg-warning"> <i class="fas fa-edit" onClick={e => {this.edituser(result.id)}}></i> </button>
                    <button className="bg-danger"> <i class="fas fa-trash" onClick={e => {this.deleteuser(result.id)}}></i> </button>
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
                  <h4 class="modal-title align-center">Filme : {this.state.userdetails.id}</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body text-center">
                <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Nome</th>
                  <th>Ultima visualização</th>          
                </tr>
              </thead>
                <tbody>
                  <tr>
                  <td>{this.state.userdetails.tipo}</td>
                  <td>{this.state.userdetails.nome}</td>
                  <td>{this.state.userdetails.last_view}</td>
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

      <div class="modal" id="editmodal">
            <div class="modal-dialog">
              <div class="modal-content">
              
                <div class="modal-header">
                  <h4 class="modal-title align-center">Filme : {this.state.userdetails.nome}</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body text-center">
                <form ref={(el) => this.myFormRef = el}>
                  <input type="hidden" id="upid"  value={this.state.userdetails.id} ref="upid" />
                  <div className="form-group">
                  <input type="text" className="form-control" id="upnome"  defaultValue={this.state.userdetails.nome} aria-describedby="emailHelp" placeholder="Enter nome" ref="upnome"/>
                  
                  </div>
                  <div className="form-group">
                  <input type="text" className="form-control"  id="uptipo"  defaultValue={this.state.userdetails.tipo} placeholder="Enter Username" ref="uptipo" />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={this.addFormData}>Update</button>
                </form>
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
