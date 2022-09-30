.PHONY: pull-lang


pull-lang:
	lokalise2 file download \
		-t ${LOKALIZE_TOKEN} \
		--project-id 58575815604edd28bc69a1.20347040 \
		--bundle-structure ./src/translations/%LANG_ISO%/%LANG_NS%.json \
		--original-filenames=false \
		--format json

upload-lang:
	lokalise2 file upload \
		-t ${LOKALIZE_TOKEN} \
		--project-id 58575815604edd28bc69a1.20347040 \
		--apply-tm \
		--detect-icu-plurals \
		--lang-iso en \
		--replace-modified \
		--file "./src/translations/en/*.json"
