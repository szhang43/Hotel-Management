# CS422 Project 2: Duck's Nest


## Description
This repository contains the front-end and back-end for Duck's Nest, a web app for hotel management and reservations.

## Authors
Luke Scribner, Sophie Zhang, Julian Albert, Cynthia Cervon, Reza Kamali

# Software Dependencies

Required software: (installation instructions below)
* NodeJS 18.16.0
* npm 9.5.1 

Required packages:
* listed in package.json in project's root directory (automatically installed using npm, instructions below)



# Installing NodeJS and git

## Linux instructions (tested on Ubuntu 22.04.2)
Open terminal

Install curl with: `sudo apt install curl`

Install git with: `sudo apt install git`

Install nvm with: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`

Close and reopen terminal

Verify installation with `nvm -v`, you should see a version number

Install nodejs and npm with: `nvm install --lts`

Verify nodejs has been installed with: `node -v`, you should see: v18.16.0

Verify npm has been installed with: `npm -v`, you should see: 9.5.1



## Mac instructions (tested on Ventura 13.2.1)
Install Nodejs from [here](https://nodejs.org/en/download) (get the LTS version) 

Open terminal

Verify git is installed with: `git --version`
 

Verify nodejs has been installed with: `node -v`, you should see: v18.16.0

Verify npm has been installed with: `npm -v`, you should see: 9.5.1


## Windows instructions (tested on Windows 10)
If you dont already have git install it from [here](https://git-scm.com/download/win)

Install Nodejs from [here](https://nodejs.org/en/download) (get the LTS version)  

Open terminal

Verify nodejs has been installed with: `node -v`, you should see: v18.16.0

Verify npm has been installed with: `npm -v`, you should see: 9.5.1

# Clone the github repo
Open terminal

Clone project to your machine with: `git clone https://github.com/szhang43/cs422_proj2.git`

# Get the .env file

Included with the project submission is a file named ".env". This file contains sensitive information such as API keys so it is excluded from the github repo. This file MUST be placed in the root directory of the project to be able to run it locally.

Additionally, sometimes downloading the env file causes it to be renamed. THE FILE MUST BE NAMED ".env" FOR IT TO WORK. DOUBLE CHECK THE FILENAME IS CORRECT AND THAT IT'S LOCATED IN THE "cs422_proj2/" FOLDER IF YOU ENCOUNTER ANY ISSUES.



# Running the project locally
### NodeJS must be installed and the ".env" file must be in the "cs422_proj2/" folder first. Refer to the steps above.

Once that is complete, open a terminal in the project's root directory and run: `npm install`

Finally run `npm run dev` in root folder and open the url displayed in your terminal in a web browser (most likely [http://localhost:3000/](http://localhost:3000/))



# Directory Structure
## components
Contains React components that are included in various pages to provide additional functionality

## firebase
Contains "initFirebase.js" which loads the project's Firestore database and Firebase authentication for user account creation/management.

Also includes "firebaseUtils.js" which contains all the functions for communicating with the Firestore database

## pages
Contains all pages for the project, as well as the api/ folder which is used for api endpoints

## public/img
Contains all images used across the pages and components

## styles
Contains all css files used across the pages and components

