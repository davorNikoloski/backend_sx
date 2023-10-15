echo "Switching to branch master"
git checkout master

echo "Building App...."
npm run build

echo "Deploying files to server..."
scp -r build/* root@143.198.153.179:/var/www/143.198.153.179/

echo "Done!"