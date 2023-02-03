import { NextApiRequest, NextApiResponse } from "next";
import { phraeResolver } from "../../util/api";

type queryData = {
    slug:string
}

export default async function (req:NextApiRequest, res:NextApiResponse){
    const {slug} = req.query as {slug:string};
    try{
        const phrase = await phraeResolver(slug);
        res.json({phrase});
    }
    catch(err){
        res.status(400).json({error: (err as Error).message})
    }
    
}