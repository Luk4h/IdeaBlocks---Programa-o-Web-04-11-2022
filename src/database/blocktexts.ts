import {dbConnect} from './database';

export function newTextBlock(): Promise<number> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query =
      'INSERT INTO TB_IDEABLOCKS_TEXTS ( BODY_TEXT ) VALUE (  " " )';
    con.query(query, (err, result) => {
      if (err) throw err;
      resolve(result.insertId);
    });
  });
}

export function viewTextBlock(text: {textId: number}): Promise<string> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `SELECT BODY_TEXT FROM TB_IDEABLOCKS_TEXTS WHERE ID_TEXT = ${text.textId}`;
    con.query(query, (err, result) => {
      if (err) throw err;
      resolve(result[0].BODY_TEXT);
    });
  });
}

export function editTextBlock(text: {
  textId: number;
  textBody: string;
}): Promise<boolean> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `UPDATE TB_IDEABLOCKS_TEXTS SET BODY_TEXT = '${text.textBody}' WHERE ID_TEXT = ${text.textId}`;
    con.query(query, err => {
      if (err) throw err;
      resolve(true);
    });
  });
}

export function deleteTextBlock(block: {blockId: number}): Promise<boolean> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `DELETE FROM TB_IDEABLOCKS_TEXTS WHERE ID_TEXT = ${block.blockId};`;
    con.query(query, err => {
      if (err) throw err;
      resolve(true);
    });
  });
}
