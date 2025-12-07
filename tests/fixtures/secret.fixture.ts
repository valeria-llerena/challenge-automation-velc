import crypto from 'crypto';
import 'dotenv/config';

export function logSecretHash(): void {
    // Se obtiene ambiente
    const env = (process.env.ENV || 'QA').toUpperCase();

    let secret: string | undefined;

    // Se selecciona la clave de acuerto a ambiente
    if (env === 'QA') {
        secret = process.env.SECRET_KEY_QA;
    } else if (env === 'CERT') {
        secret = process.env.SECRET_KEY_CERT;
    } else {
        throw new Error(`Ambiente no soportado: ${env}. Configura ENV como 'QA' o 'CERT'.`);
    }

    // Si no hay clave
    if (!secret) {
        throw new Error(`No se existe la clave secreta (${env}) en el archivo .env.`);
    }

    // Se encripta 
    const hash = crypto
        .createHash('sha256')
        .update(secret)
        .digest('hex');

    console.log(`Clave hash sha256 (${env}):`, hash);
}