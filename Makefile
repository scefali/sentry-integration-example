SENTRY_URL=https://scefali.ngrok.io
SENTRY_ORG=sentry
SENTRY_PROJECT=react

# SENTRY_URL=https://sentry.io
# SENTRY_ORG=sentry-test
# SENTRY_PROJECT=test-steve

VERSION=`sentry-cli --url $(SENTRY_URL) releases propose-version`
PREFIX=static/js


setup_release: create_release associate_commits upload_sourcemaps

create_release:
	sentry-cli --url $(SENTRY_URL) releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	sentry-cli --url $(SENTRY_URL) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --auto $(VERSION)

upload_sourcemaps:
	sentry-cli  --url $(SENTRY_URL) releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files $(VERSION) \
		upload-sourcemaps --url-prefix "~/$(PREFIX)" --validate build/$(PREFIX)
