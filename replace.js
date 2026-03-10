const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'app'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/purple/g, 'orange');
    content = content.replace(/indigo/g, 'amber');
    content = content.replace(/fuchsia/g, 'yellow');
    content = content.replace(/168,85,247/g, '249,115,22');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});
