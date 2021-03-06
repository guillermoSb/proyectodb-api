import { DatabaseManager } from "../database/manager.js";
import { generarJWT } from "../helpers/generar-jwt.js";
import { changeAdmin } from "../models/administration.js";
import { createUser, createProfile, authUser } from "../models/user.js";

/**
 * Register an user on the system
 * @param {*} req
 * @param {*} res
 */
export const registerUser = async (req, res) => {
  // Get all the parametters from the request body
  const { plan, role, user, email, password, name, lastName, active } =
    req.body;

  try {
    // Run everything using a transaction
    await changeAdmin('');
    await DatabaseManager.knex.transaction(async (transaction) => {
      // Call the database creation for user
      let createdUser = await createUser(
        plan,
        role,
        user,
        email,
        password,
        name,
        lastName,
        active,
        transaction
      );
      // Create default profile

      let createdProfile = await createProfile(
        createdUser.userCode,
        createdUser.user,
        transaction
      );
      // Return the response

      const token = await generarJWT(createdUser.userCode, createdUser.role);

      return res.status(201).send({
        ok: true,
        user: createdUser,
        profile: createdProfile,
        token,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      ok: false,
      errors: ["Error al crear usuario."],
    });
  }
};


/**
 * Simulate views on the movies table
 * @param {*} date 
 * @param {*} quantity 
 */
 export const generateUserSimulation = async (date, quantity) => {
    // Create random movie quantities
    try {
        await changeAdmin('');
        for (let i = 0; i < quantity; i++) {

            var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
            var string = '';
            for(var ii=0; ii<15; ii++){
                string += chars[Math.floor(Math.random() * chars.length)];
            }
            const user = string;
            const email = string + '@gmail.com'; 
            const password = string + 'password';
            const name = string;
            const lastName = string;
            const active = true;
            const plan = 'basic';
            const randomHour = Math.floor(Math.random() * 24);
            const createdAt = new Date(date);
            createdAt.setHours(randomHour);
            const role = 'user';
            
            await DatabaseManager.knex.transaction(async (transaction) => {
                

                let createdUser = await createUser(plan, role, user, email, password, name, lastName, active, transaction, createdAt);
                // Create default profile
            
                await createProfile(
                    createdUser.userCode,
                    createdUser.user,
                    transaction
                );
            });
        } 
    } catch (error) {
        console.log(error);

        }
}

/**
 * Login an user on the system
 * @param {*} req
 * @param {*} res
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let loginUser = await authUser(email, password);
    if (!loginUser) {
      return res.status(401).send({
        ok: false,
        errors: ["Credenciales incorrectas."],
      });
    }

    const token = await generarJWT(loginUser[0].userCode, loginUser[0].role);

    return res.status(200).send({
      ok: true,
      user: loginUser,
      token,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      errors: ["Error al intentar login."],
    });
  }
};
