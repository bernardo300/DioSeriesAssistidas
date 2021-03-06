import React from 'react';
import './App.css';
import { Redirect } from 'react-router';
import Swal from 'sweetalert2';
//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
//axios for api request
import axios from 'axios';
class AddUser extends React.Component {
  constructor(props)
    {
      super(props);
      this.addFormData = this.addFormData.bind(this);
    }
  //Form Submission
  addFormData(evt)
    {
      evt.preventDefault();
 
      axios({
      method: 'post',
      url: 'http://localhost:5000/movies', 
      data: {
        nome: document.getElementById('nome').value,
        tipo: document.getElementById('tipo').value,
        total_ep: document.getElementById('total_ep').value,
        atual_ep: document.getElementById('atual_ep').value,
        last_view: document.getElementById('last_view').value,
      },
    }).then(res=>
      {
      
    this.myFormRef.reset();
    //Redirect to home page after successfully submission
    this.props.history.push('');
    Swal.fire({
      title: 'Filme salvo com  sucesso.',
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
  
 
  render() {
   
    return (
    
      <div className="maincontainer">
        
        <h1 className="mr-5 ml-5 mt-5">Adicionar Filme</h1>
        <div className="container mb-5 mt-5 text-left">
        
        <form ref={(el) => this.myFormRef = el}>
        <div className="form-group">
        <input type="email" className="form-control" id="tipo" aria-describedby="emailHelp" placeholder="Enter type" ref="tipo" />
        
        </div>
        <div className="form-group">
        <input type="text" className="form-control" id="nome" placeholder="Enter nome" ref="nome" />
        </div>
        
        <div className="form-group">
        <input type="text" className="form-control" id="total_ep" placeholder="Enter T Episodios" ref="total_ep" />
        </div>
        
        <div className="form-group">
        <input type="text" className="form-control" id="atual_ep" placeholder="Enter Atual epsiodio" ref="atual_ep" />
        </div>
      
        <div className="form-group">
        <input type="date" className="form-control" id="last_view" placeholder="Enter last view" ref="last_view" />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.addFormData}>Submit</button>

      </form>
       
            
      </div>
     
      </div>
      
)
};
}
export default AddUser;