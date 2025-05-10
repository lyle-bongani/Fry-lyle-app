const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for prettier console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    red: '\x1b[31m'
};

/**
 * Execute shell command and print output
 * @param {string} command - The command to execute
 * @param {string} errorMessage - Message to show on error
 */
function executeCommand(command, errorMessage) {
    try {
        console.log(`${colors.cyan}Executing: ${colors.bright}${command}${colors.reset}`);
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        console.error(`${colors.red}${errorMessage}${colors.reset}`);
        console.error(error.message);
        return false;
    }
}

// Main deployment function
async function deploy() {
    console.log(`\n${colors.bright}${colors.cyan}=== Starting Fry Lyle App Deployment ===${colors.reset}\n`);

    // 1. Build the React app
    console.log(`\n${colors.yellow}Step 1: Building React application...${colors.reset}`);
    if (!executeCommand('npm run build', 'Failed to build the React app.')) {
        process.exit(1);
    }

    // 2. Deploy Firestore rules
    console.log(`\n${colors.yellow}Step 2: Deploying Firestore rules...${colors.reset}`);
    if (!executeCommand('firebase deploy --only firestore:rules', 'Failed to deploy Firestore rules.')) {
        process.exit(1);
    }

    // 3. Deploy Firestore indexes
    console.log(`\n${colors.yellow}Step 3: Deploying Firestore indexes...${colors.reset}`);
    if (!executeCommand('firebase deploy --only firestore:indexes', 'Failed to deploy Firestore indexes.')) {
        process.exit(1);
    }

    // 4. Deploy to Firebase hosting
    console.log(`\n${colors.yellow}Step 4: Deploying to Firebase hosting...${colors.reset}`);
    if (!executeCommand('firebase deploy --only hosting', 'Failed to deploy to Firebase hosting.')) {
        process.exit(1);
    }

    console.log(`\n${colors.green}${colors.bright}✓ Deployment completed successfully!${colors.reset}`);
    console.log(`${colors.cyan}You can view your application at:${colors.reset} https://fry-lyle.web.app`);
}

// Run the deployment
deploy().catch(error => {
    console.error(`${colors.red}Deployment failed:${colors.reset}`, error);
    process.exit(1);
}); 