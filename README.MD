# Node WebUI

> NOTE: Issues should be created in [node](https://github.com/mysteriumnetwork/node/issues) repo

## Release

1. Start a Draft release from https://github.com/mysteriumnetwork/dvpn-web/releases  
Set appropriate release version (i.e. 0.1.6 at the time of writing)

2. Generate a changelog:
   ```shell
   github_changelog_generator --user mysteriumnetwork --project dvpn-web -t $GITHUB_TOKEN --since-tag 0.1.5
   ```


Use generate changelog for release notes.

3. Wait until builds pass:  
    - https://gitlab.com/mysteriumnetwork/dvpn-web/-/pipelines
    - https://gitlab.com/mysteriumnetwork/go-dvpn-web/-/pipelines

4. On the node side you will need to update the `go-dvpn-web` bundler dependency. 
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

