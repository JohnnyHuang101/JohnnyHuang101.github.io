>>testing
npm install
npm start

>>prod
npm run build
commit changes
npm run deploy

>>Workaround
If dont wokr then just push build folder manually
Code of Website portfolio for Johnny

/build

npm run build
git add build -f
git commit -m "Temporary deploy commit"
git subtree split --prefix build -b gh-deploy-temp
git push origin gh-deploy-temp:gh-pages --force

clean up:

git branch -D gh-deploy-temp
git reset HEAD~1


