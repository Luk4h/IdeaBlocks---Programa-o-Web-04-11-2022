import {Request, Response} from 'express';
import * as dbBlockTexts from '../database/blocktexts';

export const newBlockText = async (): Promise<number> => {
  const textBlockId = await dbBlockTexts.newTextBlock();
  return textBlockId;
};

export const getBlockText = async (req: Request, res: Response) => {
  const {textId}: {textId: number} = req.body;
  if (String(textId)) {
    const blockText = await dbBlockTexts.viewTextBlock({textId});
    res.status(200).json({blockText: blockText});
  } else throw 'You need to inform all required fields.';
};

export const editBlockText = async (req: Request, res: Response) => {
  const {textId, textBody}: {textId: number; textBody: string} = req.body;
  if (String(textId) && textBody) {
    const result = await dbBlockTexts.editTextBlock({textId, textBody});
    result && res.status(200).json('Changes saved!');
  } else throw 'You need to inform all required fields.';
};

export const deleteBlockText = async (req: Request, res: Response) => {
  const {
    blockId,
    blockName,
    blockText,
  }: {blockId: number; blockName: string; blockText: string} = req.body;
  if (String(blockId) && blockName && blockText) {
    const result = await dbBlockTexts.deleteTextBlock({blockId});
    result &&
      res.status(200).json('The block ' + blockName + ' has been deleted!');
  } else throw 'You need to inform all required fields.';
};
