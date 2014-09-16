# DocPad Configuration File
# http://docpad.org/docs/config

# Define the DocPad Configuration
docpadConfig = {

	# Template Data
    # Use to define your own template data and helpers that will be accessible to your templates
    # Complete listing of default values can be found here: http://docpad.org/docs/template-data
	templateData:
		site:
			title: "CodeCuts (dev)",
			url: 'localhost:9778',
			description: """
			CodeCuts is a creative digital collective.""",
			keywords: """
			Javscript, PHP, Ruby, NodeJS, AngularJS, CodeCuts, JS, programming, coding, berlin, agency, web applications,
			websites, web 2.0, concepts, design, problem solving, projects"""

	collections:
		projects: ->
			@getCollection("html").findAllLive({relativeOutDirPath: 'projects'}).on "add", (model) ->
				model.setMetaDefaults({layout:'project'})

	environments:
		static: 
			templateData:
				site:
					title: "CodeCuts",
					url: "http://staging.code-cuts.com"

}

# Export the DocPad Configuration
module.exports = docpadConfig