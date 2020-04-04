#!/bin/sh

# MIT License
# Copyright (c) 2017-2020 Imre Tabur <imre.tabur@eesti.ee>

NAME=servedjs-test
RELEASE=1.0.5-SNAPSHOT
VERSION_TAG=version-${RELEASE}

npm install
npm audit fix
npm ci
npm run build
npm run test
npm run unit
git add ./dist package.json package-lock.json release.sh
git commit -m "${VERSION_TAG}"
git push
git checkout master
git merge develop
git tag -a ${VERSION_TAG} -m "${VERSION_TAG}"
git push origin ${VERSION_TAG}
git push
npm publish

exit 0
