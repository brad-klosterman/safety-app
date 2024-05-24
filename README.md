               !
               ^
              / \
             /___\
            |=   =|
            |     |
            |  S  |
            |  A  |
            |  F  |
            |  E  |
            |  T  |
            |  Y  |
            |     |
            |  A  |
            |  P  |
            |  P  |
           /|     |\
          / |     | \
         /  |||||||  \
        |  / ^ ^ ^ \  |
        | /  ( | )  \ |
        |/   ( | )   \|
            ((   ))
           ((  :  ))
           ((  :  ))
            ((   ))
             (( ))
              ( )
               .
               .
               .

# NATIVE KEYS

EXPO MODULE API & CONFIG PLUGIN

Config plugins allow you to customize native Android and iOS projects when they are generated with npx expo prebuild

# Troubleshooting iOS simulator

It is not uncommon to run into issues trying to run the app on an iOS simulator. Here are some common issues and solutions.

## 1.) _unsupported Swift architecture_

The following error may occur after running `npm run ios`:

```
  527 |
  528 | #else
> 529 | #error unsupported Swift architecture
      |  ^ unsupported Swift architecture
  530 | #endif
  531 |
```

Then you are probably trying to run a simulator on an ARM architecture, but having issues with x86 packages. You are most likely on an apple silicon chip.

### How to Solve

Solving this means manually updating the Podfile and re-installing the Pods. This is hacky and annoying, but luckily should only have to be done during major package changes, so hopefully not often.

First, do a manual pre-build:

```bash
npm run prebuild
```

This will rebuild both the `./ios/` and `./android/` directories.

Then, go into the Podfile located at `./ios/Podfile` and add the following within the `post_install` hook:

```
installer.pods_project.build_configurations.each do |config|
  config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
end
```

Your Podfile should now look something like this:

```Podfile
post_install do |installer|
  react_native_post_install(
    installer,
    # Set `mac_catalyst_enabled` to `true` in order to apply patches
    # necessary for Mac Catalyst builds
    :mac_catalyst_enabled => false
  )
  __apply_Xcode_12_5_M1_post_install_workaround(installer)

  # This is necessary for Xcode 14, because it signs resource bundles by default
  # when building for devices.
  installer.target_installation_results.pod_target_installation_results
    .each do |pod_name, target_installation_result|
    target_installation_result.resource_bundle_targets.each do |resource_bundle_target|
      resource_bundle_target.build_configurations.each do |config|
        config.build_settings['CODE_SIGNING_ALLOWED'] = 'NO'
      end
    end
  end

  # BEGIN
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
  # END

end
```

Our additions are between the `# BEGIN` and `# END` tags.

Now, run the following command to re-install the Pods manually. **_Note_**: you may need to install the Cocoapod installer globally for this command to work.

```bash
( cd ios && pod install )
```

That's it! You should now be able to run the following and it should open up the application in an iOS simulator :)

```bash
npm run ios
```

# Environment Variables

Environment variables are injected via the `babel-plugin-transform-inline-environment-variables` package and in conjunction with eas build.

For more detailed info, pleae refer to: https://docs.expo.dev/build-reference/variables/

## Add Environment Variables for Build

To add environment variables that will be available upon release, you will need to edit the `eas.json` file. Within this file, you should edit each profile of the build section so that it's `env` section has the variable.

### Editing the EAS file

In the `eas.json` file:

```json
{
    "build": {
        "development": {
            "env": {
                "NEW_VAR": "dev value" // Dev Variable Value
            }
        },
        "production": {
            "env": {
                "NEW_VAR": "prod value" // Prod Variable Value
            }
        }
    }
}
```

### Using the variable in code

Using the variable in code is very simple, just use the `process.env.NEW_VAR` as you normally would in node.

```typescript
let my_awesome_variable: string | undefined = process.env.NEW_VAR ?? 'default_value'; // The default is important for local use
```

| ⚠️ **Note**: These variables will _always_ be undefined when running locally!!! Please use a default value in this case.

## Injecting Environment Variables Locally

To inject the variables locally, set the variable before running the dev command:

```zsh
NEW_VAR="locally set" npm run start:dev
```

## Pulling Variables Locally from a File

Setting each variable manually during the run command is tedious. If you want to have a file with variables preset, please use `direnv` (https://direnv.net/). Dotenv is not recommended due to it requiring more boilerplate and providing unexpected results with the eas build pipeline potentially.

Follow the `direnv` installation instructions here: https://direnv.net/ (**Note**: You will need to both install the program **_and_** have it be loaded automatically by your preferred shell (bash or zsh probably))

Once installed:

1. Create a `.envrc` file in the same directory as the `package.json` (upper most directory)
2. Populate the file as such:

```zsh
export TEST_VARIABLE="Local test var"
```

| ⚠️ **Note**: Changes made to the `.envrc` **WILL NOT** be reflected when running locally until you kill the local server, run the `direnv allow .` command (optional) and re-run with a clean cache `npm run start:dev:clear` (important)

| ⚠️ **Note**: You may need to `cd` out and back into the directory or manually allow access via the `direnv allow .` command

| ⚠️ **Note**: If you don't want to manually allow access every time you change the `.envrc` file, please follow the follow guide in respect to white listing specific directories: https://direnv.net/man/direnv.toml.1.html#whitelist
