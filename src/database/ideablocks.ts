import {dbConnect} from './database';

export function newBlockIdea(block: {
  blockTitle: string;
  blockDescription: string;
  ownerId: number;
  textBlockId: number;
}): Promise<boolean> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `INSERT INTO TB_IDEABLOCKS_BLOCKS (TITLE_BLOCK, DESCRIPTION_BLOCK, ID_OWNER_BLOCK, ID_TEXT_BLOCK) VALUES ("${block.blockTitle}","${block.blockDescription}",${block.ownerId},${block.textBlockId})`;
    con.query(query, err => {
      if (err) throw err;
      resolve(true);
    });
  });
}

export function getBlockIdeas(user: {userId: number}): Promise<
  [
    {
      ID_BLOCK: number;
      TITLE_BLOCK: string;
      DESCRIPTION_BLOCK: string;
      ID_OWNER_BLOCK: number;
      ID_TEXT_BLOCK: number;
    }
  ]
> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `SELECT * FROM TB_IDEABLOCKS_BLOCKS WHERE ID_OWNER_BLOCK = ${user.userId}`;
    con.query(query, (err, result) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

export function renameBlockIdea(block: {
  blockTitle: string;
  blockDescription: string;
  blockId: number;
}): Promise<boolean> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `UPDATE TB_IDEABLOCKS_BLOCKS SET TITLE_BLOCK = "${block.blockTitle}", DESCRIPTION_BLOCK =  "${block.blockDescription}" WHERE ID_BLOCK = ${block.blockId}`;
    con.query(query, err => {
      if (err) throw err;
      resolve(true);
    });
  });
}

export function deleteBlockIdea(block: {blockId: number}): Promise<boolean> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `DELETE FROM TB_IDEABLOCKS_BLOCKS WHERE ID_BLOCK = ${block.blockId}`;
    con.query(query, err => {
      if (err) throw err;
      resolve(true);
    });
  });
}

export function getOwner(block: {blockId: number}): Promise<number> {
  return new Promise(resolve => {
    const con = dbConnect();
    const query = `SELECT * FROM TB_IDEABLOCKS_BLOCKS WHERE ID_BLOCK = ${block.blockId}`;
    con.query(query, (err, result) => {
      if (err) throw err;
      if (result.length > 0) resolve(result[0].ID_OWNER_BLOCK);
      else throw 'This block does not exist.';
    });
  });
}
