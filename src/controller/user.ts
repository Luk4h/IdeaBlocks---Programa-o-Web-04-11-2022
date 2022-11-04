import {Request, Response} from 'express';
import {sign} from 'jsonwebtoken';
import * as database from '../database/users';

export const signUp = async (req: Request, res: Response) => {
  const {username, password, fullName} = req.body;
  if (username && password && fullName) {
    const users = await database.getUsers();
    if (!users.includes(username)) {
      await database.newUser({username, password, fullName});
      res.status(200).json('Welcome ' + fullName + '!');
    } else throw 'Username exists!';
  } else throw 'You need to inform all required fields.';
};

export const signIn = async (req: Request, res: Response) => {
  const {username, password} = req.body;
  if (username && password) {
    const user = await database.findUser({username, password});
    if (user) {
      sign({user}, 'LS#&8nPd0a', {expiresIn: '24h'}, (err, token) => {
        if (token) res.status(200).json({accessToken: token});
        else {
          throw 'Unable to generate your token.';
        }
      });
    } else throw 'Username not found!';
  } else throw 'You need to inform all required fields.';
};

export const changePassword = async (req: Request, res: Response) => {
  const {username, password, fullName} = req.body;
  if (username && password && fullName) {
    if (!(req.body.author.user.USERNAME_USER === username))
      throw "You cannot change someone's else password.";
    const users = await database.getUsers();
    if (users.includes(username)) {
      const id = users.indexOf(username) + 1;
      await database.editUser({id, username, password, fullName});
      res.status(200).json(fullName + "'s password updated!");
    } else throw 'Username not found!';
  } else throw 'You need to inform all required fields.';
};

export const deleteUser = async (req: Request, res: Response) => {
  const {username, password, fullName} = req.body;
  if (username && password && fullName) {
    if (!(req.body.author.user.USERNAME_USER === username))
      throw "You cannot delete someone's else account.";
    const users = await database.getUsers();
    if (users.includes(username)) {
      const id = users.indexOf(username) + 1;
      await database.deleteUser({id});
      res.status(200).json(fullName + "'s account deleted!");
    } else throw 'Username not found!';
  } else throw 'You need to inform all required fields.';
};
export function getDetails(req: Request, res: Response) {
  res.status(200).json(req.body.author);
}
