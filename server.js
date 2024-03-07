const express = require('express');
const {v4: uuidV4} = require('uuid')

const app = express();

const PORT = 3333

app.use(express.json());

const livrosb = [];
const users = [];

//Lista de Usuarios
app.get("/listagemdeusuario", (req, res)=>{
    res.status(201).json(users)
})

//Lista de Livros
app.get("/listagemdelivro", (req, res)=>{
    res.status(201).json(livrosb)
})

app.post("/paginaprincipal", (req, res) => {
    const {title, autor, paginas, categoria, disponivel} = req.body;
    
    const informacoes = {
        id: uuidV4(),
        title,
        autor,
        paginas,
        categoria,
        disponivel: true
    }
    livrosb.push(informacoes)
    //console.log(livrosb);
    return res.status(201).json(informacoes)
})

//Informações de Usuario
app.post("/users", (req, res)=>{
    const {nome, email, telefone, listadeemprestimos} = req.body

    const user = {
        id: uuidV4(),
        nome,
        email,
        telefone,
        listadeemprestimos: []
    }
    users.push(user)
    //console.log(users);
    return res.status(201).json(user)
})

//Listagem de emprestimo de livros
app.patch("/listadeemprestimos/:id", (req, res) =>{
    const {id} = req.params;
    const {nome} = req.headers;
    const user = users.find(user => user.nome === nome)

    if(!user){
        res.status(400).json("Usuário não cadastrado, erro 404")
    }
    req.user = user

    const livro = livrosb.find(livro => livro.id === id)

    if(livro.disponivel === true){
        const limite = user.listadeemprestimos.length >= 2
        if(limite){
            res.status(400).json("Limite Escedido!")
        }

        user.listadeemprestimos.push(livro)
        livro.disponivel = false

        return res.status(200).json("Atualizado com sucesso!")
    }
    else {
        res.status(400).json("Livro Indisponivel")
    }

})
//Devolução de Livros
app.patch("/devolucao/:id", (req, res)=>{
    const {id} = req.params
    const {nome} = req.headers
    const user = users.find(user => user.nome === nome)

    if(!user){
        res.status(400).json("Usuário não cadastrado, erro 404")
    }
    req.user = user

    
    const Indexlivro = user.listadeemprestimos.findIndex(livro => livro.id === id)
    const livro = livrosb.find(livro => livro.id === id)

    if(Indexlivro === -1){
        return res.status(400).json("Voce nao tem livros para devolucao")
    }
    user.listadeemprestimos.splice(Indexlivro, 1)
    livro.disponivel = true

    return res.status(200).json("Livro devolvido com sucesso!")
    })
//Pesquisa de livros
app.get("/consultarlivros", (req, res) =>{
    const {title, autor, categoria} = req.query

    if(title){
        result = livrosb.filter(livro => livro.title.includes(title))
    }
    if(autor){
        result = livrosb.filter(livro => livro.autor.includes(autor))
    }
    if(categoria){
        result = livrosb.filter(livro => livro.categoria.includes(categoria))
    }
    res.status(200).json(result)
})

app.use((err, req, res, next)=> {
    console.error(err.stack);
    res.status(500).send("Algo deu errado!")
})
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT} portanto, está tudo OK(200).`);
})