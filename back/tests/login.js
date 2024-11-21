/* Instanciamos la variable para realizar las consultas*/
const request = require('supertest');

/* Importamos el conjunto de endpoints que vamos a probar*/ 
const app = require('../src/config/app');

describe('Probaremos el acceso al sistema', () => {

    test('Debería permitir el ingreso del usuario al sistema', async () => {
        const usuarioLogueo = {
            numIdentificacion: '71388303',
            contrasegna: 'afm8303adm'
        }

        const usuarioRespuesta = {
            tipoIdentificacion: "cedula ciudadanía",
            numIdentificacion: "71388303",
            nombres: "Andres Felipe",
            apellidos: "Marulanda Patiño",
            rol: "Administrador",
            contrasegna: "afm8303adm"
        }
        
        const response = await request (app)
        .post('/login')
        .send(usuarioLogueo);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(usuarioRespuesta);

        
    } )


    test('Debería negar el ingreso del usuario al sistema', async () => {
        const usuarioLogueo = {
            numIdentificacion: '1012345678',
            contrasegna: 'abc5678efg'
        }
        
        const response = await request (app)
        .post('/login')
        .send(usuarioLogueo);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ logueado : true });

        
    } )
})

