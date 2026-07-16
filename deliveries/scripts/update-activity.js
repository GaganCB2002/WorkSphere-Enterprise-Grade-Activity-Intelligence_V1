const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', 'activity.log');
const date = new Date().toISOString();

try {
  fs.appendFileSync(logPath, `Activity updated at ${date}\n`);
  console.log('Activity log updated successfully.');
} catch (error) {
  console.error('Failed to update activity log:', error);
}
