/* eslint-disable max-len */
const fs = require('fs');
const path = require('path');
const configPlugins = require('@expo/config-plugins');
const generateCode = require('@expo/config-plugins/build/utils/generateCode');

const code = `
  $static_library = [
    'React',
    'Google-Maps-iOS-Utils',
    'GoogleMaps',
    'react-native-maps',
    'react-native-google-maps',
    'React-hermes',
    'react-native-skia'
  ]

  pre_install do |installer|
    Pod::Installer::Xcode::TargetValidator.send(
      :define_method, 
      :verify_no_static_framework_transitive_dependencies
    ) {}

    installer.pod_targets.each do |pod|
      bt = pod.send(:build_type)

      if $static_library.include?(pod.name)
        puts "Overriding the build_type to static_library from static_framework for #{pod.name}"

        def pod.build_type;
          Pod::BuildType.static_library
        end
      end
    end

    installer.pod_targets.each do |pod|
      bt = pod.send(:build_type)
      puts "#{pod.name} (#{bt})"
      puts "  linkage: #{bt.send(:linkage)} packaging: #{bt.send(:packaging)}"
    end
  end
`;

/**
 * iOS only ––
 *
 * Modifier plugin which acts as a bundler for packages that need to be force linked.
 * This manually alters the Podfile, which is dangerous. It also manually adds the `pre_install`
 * hook to the Podfile. There can only be one of these hooks, so this could potentially create
 * an error in the future.
 *
 * Refer to the following for more info:
 * https://github.com/react-native-maps/react-native-maps/issues/4502#issuecomment-1304599405
 *
 * @function withForcedNativePackageLinks
 * @param {import("@expo/config").ExpoConfig} config - Current Expo configuration.
 * @returns {import("@expo/config").ExpoConfig}
 *   A dangerously modified version of the 'App.json' configuration.
 */
const withForcedNativePackageLinks = (config) => {
    return configPlugins.withDangerousMod(config, [
        'ios',
        (config) => {
            const filePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');

            const contents = fs.readFileSync(filePath, 'utf-8');

            const newCode = generateCode.mergeContents({
                tag: 'withForcedNativePackageLinks',
                src: contents,
                newSrc: code,
                anchor: /\s*get_default_flags\(\)/i,
                offset: 2,
                comment: '#',
            });

            if (!newCode.didMerge) {
                // eslint-disable-next-line no-console
                console.error(
                    "ERROR: Cannot add `withForcedNativePackageLinks` to the project's " +
                        "ios/Podfile because it's malformed."
                );

                return config;
            }

            fs.writeFileSync(filePath, newCode.contents);

            return config;
        },
    ]);
};

module.exports = withForcedNativePackageLinks;
