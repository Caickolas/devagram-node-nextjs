import type { NextApiRequest, NextApiResponse } from "next";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';
import type { CadastroRequisicao } from '../../types/CadastroRequisicao';
import { UsuarioModel} from '../../models/Usuariomodel'

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

            // salvar banco de dados
            await UsuarioModel.create(usuario)
            return res.status(200).json({msg: 'Usuario feito com sucesso!'});
        }

        return res.status(405).json({ erro: 'Metodo informado não é valido' });
    };

    export default endpointCadastro;