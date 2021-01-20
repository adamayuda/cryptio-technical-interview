import Joi from 'joi';
import { config as envConfig } from 'dotenv';

export let config: Record<keyof typeof envSchema, string>;

const envSchema = {
  PORT: Joi.string().required(),
};

export const generateConfig = (): void => {
  if (config) return;

  const env = envConfig();
  if (env.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

  const environmentSchema = Joi.object(envSchema);

  const { error, value: envVars } = environmentSchema.validate(env.parsed);
  if (error) throw new Error(`⚠️ ${error.message} in .env file  ⚠️`);

  config = envVars;

  return;
};
