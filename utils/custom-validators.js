import { getallCategories, getAllGenres, getStudio, getDirector } from '../models/content.js';
import { checkForExistingEmail, checkForExistingProfile, checkForExistingUser, getUser, getUserProfiles } from '../models/user.js'

/**
 * Validates if an email is unique
 * @param {string} email 
 */
export const validateEmailUnique = async (email = '') => {
    const emailExists = await checkForExistingEmail(email);
    if (emailExists) {
        throw new Error(`El email ${email} ya existe.`);
    }
}

/**
 * Validates if an user is unique
 * @param {string} user
 */
export const validateUserUnique = async (user = '') => {
    const userExists = await checkForExistingUser({ user });
    if (userExists) {
        throw new Error(`El usuario ${user} ya existe.`);
    }
}

/**
 * Validates if the user exists by user code
 * @param {*} userCode 
 */
export const validateUserExists = async (userCode) => {
    if (!isNaN(userCode)) {
        const userExists = await checkForExistingUser({ userCode });
        if (!userExists) {
            throw new Error(`El usuario ${userCode} no existe.`);
        }
    }
}

/**
 * Validates that the profile exists
 * @param {*} profileCode 
 */
export const validateProfileExists = async (profileCode) => {
    if (!isNaN(profileCode)) {
        const profileExists = await checkForExistingProfile({ profileCode });
        if (!profileExists) {
            throw new Error(`El perfil ${profileCode} no existe.`);
        }
    }
}


/**
 * Get the user code
 * @param {number} userCode 
 */
export const validateMaxProfiles = async (userCode) => {

    const user = await getUser(userCode);   // Get the user information

    if (!user) {
        throw new Error(`Este usuario no es valido para crear un perfil ${userCode}.`);
    }
    const profiles = await getUserProfiles(userCode);
    if (profiles.length >= user.plan.profileCount) {
        throw new Error('Se ha exedido el límite de perfiles para este plan.');
    }

}


/**
 * Validate that the genre exists
 * @param {string} genre 
 */
export const validateGenreExists = async (genre) => {
    const genres = await getAllGenres();
    if (!genres.includes(genre)) {
        throw new Error('El genero enviado no es válido');
    }
}


/**
 * Validates that a category exists
 * @param {string} category 
 */
export const validateCategoryExists = async (category) => {
    const categories = await getallCategories();
    if (!categories.includes(category)) {
        throw new Error('La categoría enviada no es válida.');
    }
}

/**
 * Check if a studio exists
 * @param {number} studioCode 
 */
export const validStudioCode = async (studioCode) => {
    const studio = await getStudio(studioCode);
    if (!studio) {
        throw new Error('El estudio enviado no existe.')
    }
}

/**
 * Check if a director exists
 * @param {number} studioCode 
 */
export const validDirectorCode = async (directorCode) => {
    const director = await getDirector(directorCode);
    if (!director) {
        throw new Error('El director enviado no existe.')
    }
}
