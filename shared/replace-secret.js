import dotenv from 'dotenv';
import replace from 'replace-in-file';

dotenv.config();

const replaceEnvVariables = async () => {
  try {
    const options = {
      files: 'build/**/*.js',
      from: /process\.env\.(\w+)/g,
      to: (match, envVariable) => `'${process.env[envVariable]}'`,
    };

    await replace(options);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

replaceEnvVariables();
