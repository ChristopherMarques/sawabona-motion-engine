const { execSync } = require('child_process');
try {
    console.log('Running npx create-next-app...');
    const res = execSync('npx create-next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes', {
        stdio: 'inherit',
        cwd: process.cwd()
    });
    console.log('Finished create-next-app');
} catch (e) {
    console.error('Error running command:', e.message);
}
