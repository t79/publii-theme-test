
module.exports = function (Handlebars) {
		return {
	
	// Helper that generates breadcrumb based on the tags.	
	breadcrumb: function(post) {
			
		let jsonLDObjectArray = [];
		
		// breadcrumb header
		let breadcrumbObject = {};
		breadcrumbObject['@context'] = 'https://schema.org';
		breadcrumbObject['@type'] = 'BreadcrumbList';
		breadcrumbObject['itemListElement'] = [];
		
		// this, the post page
		let thisPage = {};
		thisPage['@type'] = 'ListItem';
		thisPage['position'] = 2;
		thisPage['name'] = post.title;
		thisPage['item'] = post.url;
		
		if (post.tags.length > 0) {
		
			// generate one breadcrumb for each tag
			for (tagIndex in post.tags) {
				
				// the tag page
				let tagPage = {};
				tagPage['@type'] = 'ListItem';
				tagPage['position'] = 1;
				tagPage['name'] = post.tags[tagIndex].name;
				tagPage['item'] = post.tags[tagIndex].url;
				
				let breadcrumbObjectCopy = JSON.parse(JSON.stringify(breadcrumbObject));
				breadcrumbObjectCopy['itemListElement'].push(tagPage);
				breadcrumbObjectCopy['itemListElement'].push(thisPage);
				jsonLDObjectArray.push(breadcrumbObjectCopy);
				
			}
		
		} else {
			
			// if no tag put only this post in the breadcrumb.
			thisPage['position'] = 1;
			breadcrumbObject['itemListElement'].push(thisPage);
			jsonLDObjectArray.push(breadcrumbObject);
			
		}
		
		var output = "<script type='application/ld+json'>";
		output += JSON.stringify(jsonLDObjectArray);
		output += "</script>";
		
		return new Handlebars.SafeString(output);
 
	}
			
	};
};


