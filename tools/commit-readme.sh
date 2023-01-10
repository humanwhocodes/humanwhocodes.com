#!/bin/bash

#------------------------------------------------------------------------------
# Commits the data files if any have changed
#------------------------------------------------------------------------------

if [ -z "$(git status --porcelain)" ]; then 
	echo "Data did not change."
else
	echo "Data changed!"

	# commit the result
	git add .
	git commit -m "build: Rebuild website"

	# push back to source control
	git push origin HEAD  
fi
