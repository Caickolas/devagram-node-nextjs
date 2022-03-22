import type {NextApiResponse} from "next";
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import {upload, uploadImagemCosmic} from '../../services/uploadImagemCosmic'
import nc from 'next-connect';
import {conectarMongoDB} from '../../middlewares/conectarMongoDB'
import {validarTokenJWT} from '../../middlewares/validarTokenJWT'
import {PublicacaoModel} from '../../models/PublicacaoModel'
import {UsuarioModel} from '../../models/UsuarioModel'


const handler = nc()
    .use(upload.single('file'))
    .post(async (req: any, res: NextApiResponse<RespostaPadraoMsg>) => {
        try{       
            const {userID} = req.query;
            const usuario = await UsuarioModel.findById(userID)
            if(!usuario){
                return res.status(400).json({ erro: 'usuario não encontrado' }) 
            }



            const { descricao, file } = req?.body;

            if (!req || !req.body){
                return res.status(400).json({ erro: 'Parametro de entrada não informado' })
            }

            if (!descricao || descricao.length < 2) {
                return res.status(400).json({ erro: 'Descricao não é valida' })
            }

            if (!req.file) {
                return res.status(400).json({ erro: 'Imagem é obrigatoria' })
            }

            const image = await uploadImagemCosmic(req);
            const publicacao = {
                idUsuario : usuario._id,
                descricao,
                foto : image.media.url,
                data : new Date()
            };

            return res.status(200).json({ msg: 'Publicacao feita com sucesso!' })     
        }catch(e){
            console.log(e);
            return res.status(500).json({ msg: 'erro ao cadastrar publicacao' });
        };
    });
    export const config = {
        api: {
            bodyParser: false
        }
    }
    
export default validarTokenJWT(conectarMongoDB(handler));
