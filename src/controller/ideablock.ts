import {Request, Response} from 'express';
import {newBlockText} from './ideablockstext';
import * as dbBlockIdeas from '../database/ideablocks';

export const newBlock = async (req: Request, res: Response) => {
  const {
    blockTitle,
    blockDescription,
  }: {blockTitle: string; blockDescription: string} = req.body;
  if (blockTitle && blockDescription) {
    const textBlockId = await newBlockText();
    const ownerId = req.body.author.user.ID_USER;
    await dbBlockIdeas.newBlockIdea({
      blockTitle,
      blockDescription,
      ownerId,
      textBlockId,
    });
    res.status(200).json('You new block ' + blockTitle + ' has been created!');
  } else throw 'You need to inform all required fields.';
};

export const editBlock = async (req: Request, res: Response) => {
  const {
    blockId,
    blockTitle,
    blockDescription,
  }: {blockId: number; blockTitle: string; blockDescription: string} = req.body;
  if (String(blockId) && blockTitle && blockDescription) {
    await dbBlockIdeas.renameBlockIdea({blockId, blockTitle, blockDescription});
    res.status(200).json('You renamed ' + blockTitle + '!');
  } else throw 'You need to inform all required fields.';
};

export const getBlocks = async (req: Request, res: Response) => {
  const userId = req.body.author.user.ID_USER;
  const ideaBlocks = await dbBlockIdeas.getBlockIdeas({userId});
  res.status(200).json(ideaBlocks);
};

export const deleteBlock = async (req: Request, res: Response) => {
  const {blockId, blockTitle}: {blockId: number; blockTitle: string} = req.body;
  if (String(blockId) && blockTitle) {
    await dbBlockIdeas.deleteBlockIdea({blockId});
    res.status(200).json('You deleted ' + blockTitle + '!');
  } else throw 'You need to inform all required fields.';
};
