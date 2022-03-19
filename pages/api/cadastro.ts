import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { CadastroRequisicao } from '../../types/CadastroRequisicao';
import {UsuarioModel} from '../../models/UsuarioModel'
import {conectarMongoDB} from '../../middlewares/conectarMongoDB'
import md5 from "md5";

const endpointCadastro =
    async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg> ) => {
        
        if(req.method === 'POST'){
            const usuario = req.body as CadastroRequisicao;

            if(!usuario.nome || usuario.nome.length < 2){   
                return res.status(400).json({erro : 'Nome invalido'});

            }

            if (!usuario.email || usuario.email.length < 4
                ||!usuario.email.includes('@')
                || !usuario.email.includes('.')) {
                return res.status(400).json({ erro: 'Email invalido' });

                }
            
            if (!usuario.senha || usuario.senha.length < 4) {
                return res.status(400).json({ erro: 'Senha invalida' });

            }
            //validacao se ja existe usuario com o mesmo email
            const usuarioComMesmoEmail = await UsuarioModel.find({email: usuario.email});
            if(usuarioComMesmoEmail && usuarioComMesmoEmail.length > 0){
                return res.status(400).json({erro : 'ja existe uma conta com o email informado!'})
            }

            // salvar banco de dados
            const usuarioASerSalvo = {
                nome : usuario.nome,
                email : usuario.email,
                senha: md5(usuario.senha),
            }
            await UsuarioModel.create(usuarioASerSalvo);
            return res.status(200).json({msg: 'Usuario feito com sucesso!'});
        }

        return res.status(405).json({ erro: 'Metodo informado não é valido' });
    };

export default conectarMongoDB(endpointCadastro);