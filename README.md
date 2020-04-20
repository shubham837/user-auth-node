# user-auth-node
### Brief
API Details are mentioned in following section:

Technologies Used in Application:<br/>
1) Docker<br/>
2) Programming Language: Nodejs using Express<br/>
3) Backend Database: Postgres<br/>
4) File Storage: S3<br/>

# Setup instructions
1) Prerequisites: You’ll need at least docker 1.10.<br/>

If you don’t already have it installed, follow the instructions for your OS:<br/>
a) On Mac OS X/Windows, you’ll need Docker Toolbox<br/>
b) On Linux, you’ll need docker-engine<br/>

2) Create the Machine:<br/>
a) docker-machine create --driver virtualbox default<br/>
b) eval $(docker-machine env default) # replace default with name of your docker machine<br/>

3) Build the Stack<br/>
a) docker-compose -f dev.yml build<br/>

4) Run the server<br/>
a) docker-compose -f dev.yml up<br/>

5) Check the ip where the server is running:<br/>
a) docker-machine ip default<br/>

# User APIs
1) API to create bulk users<br/>
```HTTP POST /v1/users/bulk-create```
2) API to create single user<br/>
```HTTP POST /v1/users```
3) API to fetch the logged in user detail<br/>
```HTTP GET /v1/user-detail```

# Authentication APIs
1) API to login <br/>
```HTTP POST /v1/login```
2) API to logout <br/>
```HTTP POST /v1/logout```

# Fetch upload metadata APIs
1) API to fetch list of uploaded metadatas<br/>
```HTTP GET /v1/user-upload```
