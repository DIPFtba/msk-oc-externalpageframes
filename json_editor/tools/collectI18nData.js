//
// node.js Script to collect all I18N keys and contexts from the JSON config files
// in all subdirectories of the given path and write them to a single JSON file.
//
// Usage:
// node collectI18nData.js <path>
//
// Example:
// node collectI18nData.js /path/to/json_editor/tools
//
// This will collect all I18N keys and contexts from the JSON config files in
// all subdirectories of /path/to/json_editor/tools and write them to a single
// JSON file named i18nData.json in the current working directory.
//

const fs = require('fs');
const path = require('path');
import { getI18nDescr } from '../common';

const i18nData = {};

function collectI18nData (dir) {

	fs.readdirSync(dir).forEach(file => {

		const lastSubdir = path.basename(dir);
		const fullPath = path.join(dir, file);

		if ( fs.statSync(fullPath).isDirectory() &&
			!file.startsWith('.') &&
			!file.startsWith('node_modules')
		) {

			// subDir
			collectI18nData(fullPath);

		} else if (file.endsWith('.json')) {

			// JSON file
			const json = JSON.parse(fs.readFileSync(fullPath));
			i18nData[fullPath] = getI18nDescr( json, () => lastSubdir );

		}
	})
}

collectI18nData(process.argv[2]);

fs.writeFileSync('i18nData.json', JSON.stringify(i18nData, null, 4));
