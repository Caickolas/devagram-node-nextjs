import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import {validarTokenJWT} from '../../middlewares/validarTokenJWT'
import {conectarMongoDB} from '../../middlewares/conectarMongoDB'
import { UsuarioModel } from "../../models/UsuarioModel";

const usuarioEndPoint = async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg | any>) => {
    try{
        const { userId } = req?.query;
        const usuario = await UsuarioModel.findById(userId);
        usuario.senha = null
        return res.status(200).json ({usuario})






        return res.status(200).json({ msg: 'Usuario autenticado com sucesso' });
    }catch(e){
        console.log(e);
    }
    return res.status(400).json({erro: 'Nao foi possivel obter dados do usuario'})
};

export default validarTokenJWT(conectarMongoDB(usuarioEndPoint));