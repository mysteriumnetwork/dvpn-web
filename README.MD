# Node WebUI

> NOTE: Issues should be created in [node](https://github.com/mysteriumnetwork/node/issues) repo  
> 
[![pipeline status](https://gitlab.com/mysteriumnetwork/dvpn-web/badges/master/pipeline.svg)](https://gitlab.com/mysteriumneam/dvpn-web/-/commits/master)  
[link to pipelines](https://gitlab.com/mysteriumnetwork/dvpn-web/-/pipelines)

## Running

### Prerequisites
  - NodeJS >= 16.0.0 (advise using [NVM tool](https://github.com/nvm-sh/nvm))
    ```shell
    nvm install 16 && nvm use 16
    ```
  - Yarn 
    ```shell 
    npm install -g yarn
    ```

### Quick Start
To run app in development mode:
```shell
yarn && yarn dev
```
This will start app on port 3000 and should automatically open browser and navigate to the webUI.

## Release

1. Start a Draft release from https://github.com/mysteriumnetwork/dvpn-web/releases  
Set appropriate release version (i.e. 0.1.6 at the time of writing)

2. Creating release:
    * Generate a changelog: 
   ```shell
   github_changelog_generator --user mysteriumnetwork --project dvpn-web -t $GITHUB_TOKEN --since-tag 0.1.5
   ```
    * Use generated changelog as release description
    * Enter appropriate `tag` and `version` names, they usually are same values (i.e. 0.1.6) 
  
3. Wait until builds pass:  
    - https://gitlab.com/mysteriumnetwork/dvpn-web/-/pipelines
    - https://gitlab.com/mysteriumnetwork/go-dvpn-web/-/pipelines

4. In [node go.mod](https://github.com/mysteriumnetwork/node/blob/master/go.mod) you need to update the `go-dvpn-web` bundler dependency. 
    ```shell
    go get github.com/mysteriumnetwork/go-dvpn-web@v0.1.6
    ```
    
    Also, it is a good practice to do a test run. You can spin up Node by:  
    ```shell
    mage daemon
    ```
    
    or 
    
    ```shell
    go run mage.go daemon
    ```

5. Create a pull request similar to [this one](https://github.com/mysteriumnetwork/node/pull/2720). 

