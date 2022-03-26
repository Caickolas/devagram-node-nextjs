import type { NextApiRequest, NextApiResponse } from "next";
import { conectarMongoDB } from "../../middlewares/conectarMongoDB";
import { validarTokenJWT } from "../../middlewares/validarTokenJWT";
import type { RespostaPadraoMsg } from '../../types/RespostaPadraoMsg';

const endpointSeguir = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | any>) => {
    try{

        if(req.method === 'PUT'){

            if(req?.query?.userId){

            }
        
            if(req?.query?.id){
                
            }


        }
        return res.status(405).json({ erro: 'Metodo informado nao e valido' });


    }catch(e){
        console.log(e);
        return res.status(500).json({erro: 'Nao foi possivel seguir/deseguir o usuario informado'});
    }
}

export default validarTokenJWT(conectarMongoDB(endpointSeguir));