# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {

	# Template Data
    # Use to define your own template data and helpers that will be accessible to your templates
    # Complete listing of default values can be found here: http://docpad.org/docs/template-data
	templateData:
		site:
			title: "Code Cuts",
			url: 'http://localhost:9778'

	collections:
		projects: ->
			@getCollection("html").findAllLive({relativeOutDirPath: 'projects'}).on "add", (model) ->
				model.setMetaDefaults({layout:'project'})

	watchOptions: preferredMethods: ['watchFile','watchFile']

}

# Export the DocPad Configuration
module.exports = docpadConfig