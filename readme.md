# IdeaBlocks:

## 🚀 Instalando IdeaBlocks

Clone o repositorio no local desejado.
```
$ git clone https://github.com/Luk4h/IdeaBlocks---Programa-o-Web-04-11-2022.git
```

Instale todas as dependências.
```
$ npm i
```

Adicione o arquivo .env com as váriaveis de ambiente.
```
Pegar o arquivo .env disponibilizado no .ZIP enviado no material didático.
```

Compila o código TypeScript para JavaScript
```
$ npm compile
```

Executa o código compilado e inicializa o servidor.
```
$ node build/src/server.js
```

## ☕ Usando IdeaBlocks

Basta acessar: [localhost:8181/documentation](https://localhost:8181/documentation)
Lá vai conter todas as rotas disponíveis para a utilização.

O uso entendido do backend é o seguinte:

1. Usuário realiza o login ou cadastro;
2. Recebe o token de acesso;
3. Utiliza ele para buscar os blocos de ideias do usuário;
4. Cria um novo bloco passando os parâmetros necessários ( Nome e Descrição );
5. Ele edita o texto de um bloco passando os parâmetros necessários ( ID do texto e novo Texto );
6. Ciclo vicioso para armazenar quantas ideias e blocos os usuários desejarem.
