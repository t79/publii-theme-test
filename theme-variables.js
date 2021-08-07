
var generateThemeVariables = function(customConfig) {
	
	return `
		:root {
			--background-color: ${customConfig.backgroundColor};
			--background-image-opacity: ${customConfig.backgroundPictureOpacity};
			
			--base-font-size: ${customConfig.baseFontSize}em;
			--base-text-color: ${customConfig.textColor};
		}
	`;
	
};

module.exports = generateThemeVariables;