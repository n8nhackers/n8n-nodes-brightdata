

npm install n8n -g

# In your node directory
npm run build
npm link

# In the nodes directory ~/.n8n/custom/ within your n8n installation
# node-package-name is the name from the package.json
# If there is no ~/.n8n/custom/ run
# mkdir custom 
# cd custom 
# npm init

npm link n8n-nodes-brightdata

n8n start

