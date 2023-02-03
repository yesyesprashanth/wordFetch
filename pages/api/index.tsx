import {NextApiRequest, NextApiResponse} from 'next';
import { phraeResolver } from '../../util/api';

export default async function (req:NextApiRequest, res:NextApiResponse){
    const data = req.body as {query:string};
    try{
        const Phrase = await phraeResolver(data.query);
        res.json({Phrase});
    }
    catch(e){
        res.status(400).json({error:(e as Error).message});
    }
    
}