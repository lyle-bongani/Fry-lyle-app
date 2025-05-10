const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure firebase.storage.rules file exists
const rulesFilePath = path.join(__dirname, 'firebase.storage.rules');
if (!fs.existsSync(rulesFilePath)) {
    console.error('Error: firebase.storage.rules file not found');
    process.exit(1);
}

// Create storage.rules file in the format expected by Firebase CLI
const storageRulesContent = fs.readFileSync(rulesFilePath, 'utf8');
fs.writeFileSync(path.join(__dirname, 'storage.rules'), storageRulesContent);

console.log('📦 Deploying Firebase Storage rules...');

try {
    // Check if user is logged in to Firebase
    execSync('firebase projects:list', { stdio: 'inherit' });

    // Deploy storage rules
    execSync('firebase deploy --only storage', { stdio: 'inherit' });

    console.log('✅ Firebase Storage rules deployed successfully!');
    console.log('🖼️ Profile image uploads should now work correctly.');
    console.log('👤 Users can upload profile images to their own user directory.');

    // Clean up - remove temporary storage.rules file
    fs.unlinkSync(path.join(__dirname, 'storage.rules'));
} catch (error) {
    console.error('❌ Error deploying Firebase Storage rules:', error.message);
    console.log('Please make sure you are logged in to Firebase CLI and have the correct permissions.');
    process.exit(1);
} 