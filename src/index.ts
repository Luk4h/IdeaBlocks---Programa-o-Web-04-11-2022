import express from 'express';
import {verify} from 'jsonwebtoken';
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import * as user from './controller/user';
import * as ideaBlock from './controller/ideablock';
import * as ideaBlockText from './controller/ideablockstext';

// Definições da API.
const app = express();
app.set('port', 8181);
app.use(express.json());

// Swagger
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Login e Cadastro.
app.post('/signin', user.signIn);
app.post('/signup', user.signUp);

// Autenticação das proximas rotas.
app.use((req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(' ')[1];
    verify(token, 'LS#&8nPd0a', async (err, decoded) => {
      if (err)
        res
          .status(403)
          .json({errorMessage: 'Access token is invalid or expired.'});
      else {
        req.body.author = decoded;
        next();
      }
    });
  } else
    res
      .status(401)
      .json({errorMessage: 'You must be logged in to use this resource.'});
});

// Detalhes, Troca de senha e desativamento de conta.
app.get('/account', user.getDetails);
app.put('/account', user.changePassword);
app.delete('/account', user.deleteUser);

// Visualizar, Criar, Editar e Deletar Blocos.
app.get('/blocks', ideaBlock.getBlocks);
app.post('/blocks', ideaBlock.newBlock);
app.put('/blocks', ideaBlock.editBlock);
app.delete('/blocks', ideaBlock.deleteBlock);

// Visualizar e Editar Texto dos blocos.
// Criação e remoção é automatica durante a criação dos blocos.
app.post('/texts', ideaBlockText.getBlockText);
app.put('/texts', ideaBlockText.editBlockText);

export default app;
