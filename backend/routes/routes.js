module.exports = server => {

    const db = require('../database/db');
    const Movie = require('../models/Movie');
    
    server.get('/', (req, res) => {
        res.json({'msg': 'Bem vindo ao catálogo de séries e filmes'})
    })

    server.post('/movies', (req, res) => {
        if(req.body.id == undefined){
            Movie.create({
                tipo: req.body.tipo,
                nome: req.body.nome,
                total_ep: req.body.total_ep,
                atual_ep: req.body.atual_ep
             
            }).then(movie => {
                console.log('novo')
                res.json(movie)
            }).catch(err => {
                res.json({'msg': 'Erro ao cadastrar'})
            })
        }else{
            Movie.findOne({where:{id:req.body.id}}).then((movie) => {
                res.json(movie)
            }).catch(err => {
                res.json({'msg': err})
            })
        }
       
    })

    server.put('/movies', (req, res) => {
        Movie.update(
            { 
                tipo: req.body.tipo,
                nome: req.body.nome,
                total_ep: req.body.total_ep,
                atual_ep: req.body.atual_ep
            },
            {where: {'id': req.body.id }}).then(() => {
                res.json({'msg': 'atualizado'})
            }).catch(err => {
                res.json({'msg': 'Erro ao atualizar'})
            })
    })

    server.delete('/movies', (req, res) => {
        Movie.destroy({where: {'id': req.body.id}}).then(() => {
            res.json({'msg': 'Deletado'});
        }).catch(err => {
            res.json({'msg': 'Erro ao deletar'})
        })
    })
    
    server.get('/movies', (req, res) => {
        Movie.findAll().then((movies) => {
            res.json(movies)
        }).catch(err => {
            res.json({'msg': 'Erro ao Listar'})
        })
    })

    server.get('/movies/:id', (req, res) => {
        Movie.findOne({where:{id:req.params.id}}).then((movie) => {
            res.json(movie)
        }).catch(err => {
            res.json({'msg': err})
        })
    })
};
