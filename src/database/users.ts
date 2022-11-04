import {dbConnect} from './database';

export function getUsers(): Promise<[string]> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = 'SELECT USERNAME_USER FROM TB_IDEABLOCKS_USERS';
    con.query(query, (err, result) => {
      if (err) throw err;
      const usersArr: [string] = result.map(
        (result: {USERNAME_USER: string}) => result.USERNAME_USER
      );
      resolve(usersArr);
    });
  });
}

export function newUser(user: {
  username: string;
  password: string;
  fullName: string;
}) {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `INSERT INTO TB_IDEABLOCKS_USERS ( FULLNAME_USER, USERNAME_USER, PASSWORD_USER, LEVEL_USER ) VALUES ( "${user.fullName}", "${user.username}", "${user.password}", 1 )`;
    con.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

export function editUser(user: {
  id: number;
  username: string;
  password: string;
  fullName: string;
}) {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `UPDATE TB_IDEABLOCKS_USERS SET USERNAME_USER = "${user.username}", PASSWORD_USER = "${user.password}", FULLNAME_USER = "${user.fullName}" WHERE ID_USER = ${user.id};`;
    con.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

export function findUser(user: {
  username: string;
  password: string;
}): Promise<boolean> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `SELECT * FROM TB_IDEABLOCKS_USERS WHERE USERNAME_USER = "${user.username}" AND PASSWORD_USER = "${user.password}"`;
    con.query(query, (err, result) => {
      if (err) throw err;
      if (result.length > 0) resolve(result[0]);
      else resolve(false);
    });
  });
}

export function deleteUser(user: {id: number}): Promise<boolean> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `DELETE FROM TB_IDEABLOCKS_USERS WHERE ID_USER = ${user.id};`;
    con.query(query, err => {
      if (err) throw err;
      resolve(true);
    });
  });
}
