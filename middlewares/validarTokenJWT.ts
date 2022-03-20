import type { NextApiRequest, NextApiResponse, NextApiHandler} from "next";
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { decode } from "punycode";

export const validarTokenJWT = (handler : NextApiHandler) =>
    (req : NextApiRequest, res : NextApiResponse) => {

        try{

            
            

        const { MINHA_CHAVE_JWT } = process.env;
        if(!MINHA_CHAVE_JWT){
            return res.status(500).json({erro : 'ENV chave JWT nao informada na execucao do programa'});
            
        }

        if(!req || !req.headers){
            return res.status(401).json({erro : 'Nao foi possivel validar o token de acesso'});
        }
        
        if(req.method !== 'OPTIONS'){
            const authorization = req.headers['authorization']
            if(!authorization){
                return res.status(401).json({ erro: 'Nao foi possivel validar o token de acesso' });
            }

            const token = authorization.substring(7)
            if(!token){
                return res.status(401).json({ erro: 'Nao foi possivel validar o token de acesso' });
            }
            const decoded = jwt.verify(token, MINHA_CHAVE_JWT) as JwtPayload;
            if(!decoded){
                return res.status(401).json({ erro: 'Nao foi possivel validar o token de acesso' });
            }
            
            if(!req.query){
                req.query = {};
            }

            req.query.userId = decoded._id;
        }
    }catch(e : Error){
        console.log(e);
        return res.status(401).json({ erro: 'Nao foi possivel validar o token de acesso' });
    
    }
        return handler(req, res);
        
    }