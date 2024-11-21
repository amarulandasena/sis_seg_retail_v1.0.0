/* Instanciamos la variable para realizar las consultas*/
const request = require('supertest');

/* Importamos el conjunto de endpoints que vamos a probar*/ 
const app = require('../src/config/app');


describe('Probaremos el CRUD para el módulo de usuarios', () => {

    /* Crear usuario inexistente */
    test('Debería permitir crear un nuevo un usuario', async() => {

        const crearUsuario = {
            tipoIdentificacion: "cedula ciudadanía",
            numIdentificacion: "22039862",
            nombres: "María Mayer",
            apellidos: "Patiño",
            rol: "Gerente",
            contrasegna: "mmp9862ger"
        }

        const response = await request (app)
        .post('/usuario/')
        .send(crearUsuario);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'Usuario creado correctamente.'});
    })

    /* Crear usuario que ya existe */
    test('Debería impedir crear un nuevo un usuario', async() => {

        const crearUsuario = {
            tipoIdentificacion: "cedula ciudadanía",
            numIdentificacion: "22039862",
            nombres: "María Mayer",
            apellidos: "Patiño",
            rol: "Gerente",
            contrasegna: "mmp9862ger"
        }

        const response = await request (app)
        .post('/usuario/')
        .send(crearUsuario);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Usuario ya existe."});
    })

    /* Modificar usuario existente */
    test('Debería permitir modificar la información de un usuario', async() => {

        const modificarUsuario = {
            tipoIdentificacion: "cedula ciudadanía",
            nombres: "María Mayer",
            apellidos: "Patiño Cardona",
            rol: "Gerente retail",
            contrasegna: "mmp9862ger"
        }

        const response = await request (app)
        .put('/usuario/22039862')
        .send(modificarUsuario);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Usuario actualizado correctamente."});
    })

    /* Modificar usuario inexistente */
    test('No debería permitir modificar la información de un usuario, ya que no existe', async() => {

        const modificarUsuario = {
            tipoIdentificacion: "cedula ciudadanía",
            nombres: "Ana Maria",
            apellidos: "Perez Perez",
            rol: "Auxiliar de operaciones",
            contrasegna: "abc5678efg"
        }

        const response = await request (app)
        .put('/usuario/1012345678')
        .send(modificarUsuario);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({message : "Usuario no encontrado."});
    })

    /* Consultar usuario */
    test('Debería permitir consultar el usuario', async() => {

        const consultarUsuario = {
            tipoIdentificacion: "cedula ciudadanía",
            numIdentificacion: "22039862",
            nombres: "Maria Mayer",
            apellidos: "Patiño Cardona",
            rol: "Gerente retail",
            contrasegna: "mmp9862ger"	
        }

            const response = await request (app).get('/usuario/22039862');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(consultarUsuario);
    })

    /* Consultar usuario que no existe */
    test('Debería indicar que no se encontró el usuario', async() => {

        const response = await request (app).get('/usuario/1012345678');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Usuario no registrado.' });
    })

    /* Eliminar usuario */
    test('No Debería permitir eliminar un usuario', async() => {

        const response = await request (app).delete('/usuario/22039862');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Usuario eliminado.' });
    })

    /* Eliminar usuario que no existe */
    test('No Debería permitir eliminar un usuario', async() => {

        const response = await request (app).delete('/usuario/1012345678');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Usuario no encontrado.' });
    })

})



