const childProcess = require('child_process');
const mergeDeep = require('merge-deep');
const path = require('path');
const fs = require('fs');

// test wrapper script sets this
const packageName = process.env.PACKAGE_NAME;

let packages = [];
if (packageName) {
    // we just have a single package to do
    packages = [packageName];
} else {
    // use lerna to expand the list of packages
    const lernaJson = childProcess.execSync('lerna ls --all --json --loglevel=silent').toString();
    // filter out packages without tests, turn entry into just the package name
    const packagesPrefix = path.resolve(__dirname, 'packages');
    packages = JSON.parse(lernaJson)
        .map((entry) => entry.location)
        .filter((location) => fs.existsSync(path.join(location, 'tst')))
        .map((location) => location.substr(packagesPrefix.length + 1));
}

// create a map to store package specific Jest configuration for easier lookup
const perPackageJestConfigMap = packages.reduce((acc, cur) => {
    const config = require(`./packages/${cur}/package.json`).jest;
    if (config) {
        acc[cur] = config;
    }
    return acc;
}, {});

// load all the configs and merge them together
// for an example how to use this, see "packages/cdk/package.json"
let packageJestConfigs = Object.keys(perPackageJestConfigMap).reduce(
    (acc, cur) => mergeDeep(perPackageJestConfigMap[cur], acc),
    {},
);

const jestConfig = mergeDeep(
    {
        notify: false,
        transform: {
            '\\.ts$': 'ts-jest',
        },
        testMatch: packages.map((pkg) => `<rootDir>/packages/${pkg}/tst/**/*.test.ts`),
        coveragePathIgnorePatterns: packages.map((pkg) => `<rootDir>/packages/${pkg}/src/index.ts`),
        collectCoverageFrom: packages.reduce((acc, pkg) => {
            // Only need to add a wildcard coverage rule if there are no overrides in the package,
            // otherwise they will be merged-in later
            if (!perPackageJestConfigMap[pkg] || !perPackageJestConfigMap[pkg].collectCoverageFrom) {
                acc.push(`<rootDir>/packages/${pkg}/src/**/*.ts`);
            }
            return acc;
        }, []),
        coverageThreshold: {
            global: {
                statements: 71,
                branches: 65,
                functions: 74,
                lines: 71,
            },
        },
    },
    packageJestConfigs,
);

module.exports = jestConfig;
