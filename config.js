import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';


/**
 * Config object prototype
 */
const config = (function () {
    function AppConfig() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        dotenv.config({
            path: path.resolve(__dirname + '/.env')
        });

        /**
         * Get a value from the environment
         * @param {string} key Value to be searched on the environment
         * @returns {string}
         */
        function getValue(key) {
            // eslint-disable-next-line no-undef
            if (!(key in process.env)) {
                throw `${key} is not on the environment settings, please add it.`;
            }
            // eslint-disable-next-line no-undef
            return process.env[key]
        }
        try {
            this.databaseHost = getValue('DATABASE_HOST');
            this.databaseName = getValue('DATABASE_NAME');
            this.databasePassword = getValue('DATABASE_PASSWORD');
            this.databaseUser = getValue('DATABASE_USER');
            this.databasePort = getValue('DATABASE_PORT');
            this.secretprivatekey = getValue('SECRETORPRIVATEKEY')

        } catch (error) {
            console.log(error);
            // eslint-disable-next-line no-undef
            process.exit(1);    // Stop the application
        }

    }
    /**
     * @type {{databaseName: string, databaseHost: string, databasePassword:string, databaseUser: string}}
     */
    let instance;
    return {
        getConfig: function () {
            if (!instance) {
                instance = new AppConfig();
                instance.constructor = null;
            }
            return instance;
        }
    }
})();


export default config.getConfig();  // Export configuration object