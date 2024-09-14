const express = require('express');
const app = express();
app.use(express.json());
const genres = [
    {id:1, name:"Horror"},
    {id:2, name:"Action"},
    {id:3, name:"Drama"},
    {id:4, name:"Thriller"},
    {id:5, name:"Romance"},
    {id:6, name:"Comedy"},
    {id:7, name:"Animation"},
    {id:8, name:"Mystery"},
    {id:9, name:"Musical"},
    {id:10, name:"Western"},
    {id:11, name:"Fiction"},
    {id:12, name:"Silent"},
];
app.get('/api/genres',(req,res)=>{
    res.send(genres);
});
app.get('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id === parseInt(genre.params.id));
    if(!genre){
        res.status(400).send('Genre was not found!');
        return;
    };
    res.send(genre);
});
app.post('/api/genres/:id',(req,res)=>{
    const genre ={
        id: genres.length+1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});
app.put('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id === parseInt(genre.params.id));
    if(!genre){
        res.status(400).send('Genre was not found!');
        return;
    };
    genre.name = req.body.name;
    res.send(genre);
});
app.delete('/api/genres/:id',(req,res)=>{
    const genre = genres.find(g=>g.id === parseInt(genre.params.id));
    if(!genre){
        res.status(400).send('Genre was not found!');
        return;
    };
    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre);
});
const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>console.log(`listening to PORT ${PORT}`));