import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import { validarTokenJWT } from '../../middlewares/validarTokenJWT'
import { conectarMongoDB } from '../../middlewares/conectarMongoDB'
import { UsuarioModel } from "../../models/UsuarioModel";
import { PublicacaoModel } from "../../models/PublicacaoModel";

const comentarioEndpoint = async (req : NextApiRequest, res: NextApiResponse<RespostaPadraoMsg>) => {
    try{
        if(req.method === 'PUT'){
            if (req.method === 'PUT') {
                const { id } = req?.query;
                const publicacao = await PublicacaoModel.findById(id);
                if (!publicacao) {
                    return res.status(400).json({ erro: 'Publicação não existe' })
                };

                const { userId } = req?.query
                const usuarioLogado = await UsuarioModel.findById(userId)
                if (!usuarioLogado) {
                    return res.status(400).json({ erro: 'Usuario não encontrado' })
                };
                if (!req.body || !req.body.comentario || req.body.comentario.length < 2) {
                    return res.status(400).json({erro:'comentario invalido'})
                };
                const comentario = {
                    usuarioId : usuarioLogado._id,
                    avatar: usuarioLogado.avatar,
                    nome : usuarioLogado.nome,
                    comentario: req.body.comentario
                };
                 
                publicacao.comentarios.push(comentario);
                await PublicacaoModel.findByIdAndUpdate({_id : publicacao._id}, publicacao);
                return res.status(200).json({ msg: 'Comentario adicionado com sucesso' });
            };
        };
        return res.status(405).json({ erro: 'Metodo informado nao e valido' });
    }catch(e){
        console.log(e);
        return res.status(500).json({erro: 'Nao foi possivel comentar essa publicacao'});
    }
}

export default validarTokenJWT(conectarMongoDB(comentarioEndpoint));
