const fs = require('fs');

let css = fs.readFileSync('src/App.css', 'utf8');

// Replace dark gray variables
css = css.replace(/--soft-ink:\s*#[0-9A-Fa-f]+;/g, '--soft-ink: rgba(255, 255, 255, 0.85);');
css = css.replace(/--muted:\s*#[0-9A-Fa-f]+;/g, '--muted: rgba(255, 255, 255, 0.7);');

// Replace unreadable oklch opacities with solid RGBA values
css = css.replace(/oklch\(96%\s+0\.008\s+126\s+\/\s+0\.66\)/g, 'rgba(255, 255, 255, 0.7)');
css = css.replace(/oklch\(96%\s+0\.008\s+126\s+\/\s+0\.76\)/g, 'rgba(255, 255, 255, 0.85)');
css = css.replace(/oklch\(96%\s+0\.008\s+126\s+\/\s+0\.64\)/g, 'rgba(255, 255, 255, 0.7)');
css = css.replace(/oklch\(96%\s+0\.008\s+126\s+\/\s+0\.68\)/g, 'rgba(255, 255, 255, 0.75)');
css = css.replace(/oklch\(96%\s+0\.008\s+126\s+\/\s+0\.78\)/g, 'rgba(255, 255, 255, 0.85)');

// Also replace background okclh using same syntax just in case
css = css.replace(/oklch\(100%\s+0\.006\s+126\s+\/\s+0\.065\)/g, 'rgba(255, 255, 255, 0.1)');
css = css.replace(/oklch\(100%\s+0\.006\s+126\s+\/\s+0\.17\)/g, 'rgba(255, 255, 255, 0.2)');

fs.writeFileSync('src/App.css', css);
console.log("Colors fixed");
