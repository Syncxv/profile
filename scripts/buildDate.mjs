import fs from 'fs';
import path from 'path';

// Get the current date and time
const now = new Date();

// Format the date and time as a string
const dateString = now.toISOString();

// Get the path to the .env file
const envFilePath = path.join(process.cwd(), '.env');

// Check if the .env file exists
if (fs.existsSync(envFilePath)) {
	// Update the value of the VITE_BUILD_DATE environment variable in the existing .env file
	const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
	const updatedEnvFileContent = envFileContent.replace(
		/^VITE_BUILD_DATE=.*$/m,
		`VITE_BUILD_DATE=${dateString}`
	);
	fs.writeFileSync(envFilePath, updatedEnvFileContent);
} else {
	// Create a new .env file with the VITE_BUILD_DATE environment variable
	fs.writeFileSync(envFilePath, `VITE_BUILD_DATE=${dateString}\n`);
}
