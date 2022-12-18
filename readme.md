# Site

## Extra gem file must be added
`gem "webrick"`

## Building the site
```
docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  -it jekyll/jekyll:latest \
  jekyll build
```

## Serving the site (locally)
```
docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --publish 4000:4000 \
  jekyll/jekyll \
  jekyll serve
```

## Random Helpful Links
Push to github from google app script => https://gist.github.com/pamelafox/ea0474daa137f035b489bf78cc5797ea
Accessing Google Photos via Google App Script
- https://github.com/tanaikech/GPhotoApp
- https://developers.google.com/photos/library/reference/rest

Jekyll docker container => https://hub.docker.com/r/jekyll/jekyll/tags
Jekyll docs => https://jekyllrb.com/
Setting up github actions => https://jekyllrb.com/docs/continuous-integration/github-actions/
