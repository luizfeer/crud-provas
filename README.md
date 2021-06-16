#  📓✏️ CRUD Provas/Alunos/Matérias

##Sobre

Projeto voltado ao front-end desenvolvido para mostrar o poder e as ferramentas do vue.js com vuetify, o projeto simula um CRUD, onde permite o cadastro de matérias, provas e alunos. A persistência de dados ocorre no localStorage, o efeito em cascata entre as entidades não foram levadas com prioridade.

O layout "dashbord" foi escolhido para o sistema, criado com os elementos recomendados pelo vuetify. Alertas para os formulários foram criados com actions, um excelente modo de se usar a vuex.

As notas dos alunos são calculadas com base nas matérias que o mesmo está cadastrado, a partir delas é filtrado todas as provas correspondentes, com isso, é feito uma média com os valores das notas, considerando o efeito de "média das provas" para se calcular a nota atual.

Recomenda-se cadastrar primeiro uma matéria, logo após, uma prova para a mesma, por fim, um aluno ingressado nessa matéria, e assim o algoritmo retornará uma nota como se o aluno tivesse tirado a nota total em cada prova.

###### Por ser uma demonstração de funcionalidades somente os alunos têm a função para serem editados (adicionar aos demais formulários não será difícil), e os formulários não apresentam uma forte validação dos dados.

##Demonstração
Deploy: https://crud-provas.vercel.app

------------

## Setup do projeto
```
npm install
```

### Compile  para desenvolvimento
```
npm run serve
```

### Compile para produção
```
npm run build
```

### Lints
```
npm run lint
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

