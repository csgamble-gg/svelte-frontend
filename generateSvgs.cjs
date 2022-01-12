const { generateFromFolder } = require('svg-to-svelte');

(async () => {
	await generateFromFolder('./src/svgs/', './src/icons/svgs', {
		clean: true
	});
	// reads all SVG files from the path "node_modules/gestalt/src/icons"
	// generates a Svelte component per SVG file in the "lib" output folder
})();
