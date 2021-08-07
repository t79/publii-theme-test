
var generateThemeVariables = function(customConfig) {
	
	return `
		:root {
			--background-color: ${customConfig.backgroundColor};
			--background-image-opacity: ${customConfig.backgroundPictureOpacity};
		}
	`;
	
};

module.exports = generateThemeVariables;