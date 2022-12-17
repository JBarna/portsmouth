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
