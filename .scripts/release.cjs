const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const semver = require("semver");

// Specify the path to the package.json file
const packageJsonPath = path.join(
  __dirname,
  "..",
  "packages",
  "auto-story-generator",
  "package.json"
);

try {
  // Create a new branch and push it to origin
  console.group("Create a new branch and push it to origin");
  console.info("Creating a new branch and pushing it to origin");

  const branchName = `release/${new Date()
    .toISOString()
    .replace(/[-:.]/g, "")}`;
  execSync(`git switch -c ${branchName}`);
  execSync(`git push --set-upstream origin ${branchName}`);

  console.log("[Result] Branch name:", branchName);
  console.groupEnd();

  // Read the package.json file
  console.group("Read the package.json file");
  console.info("Reading the package.json file");

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

  console.log("[Result] Package name:", packageJson.name);
  console.groupEnd();

  // Get the current version of the package on npm
  console.group("Get the current version of the package on npm");
  console.info("Getting the current version of the package on npm");

  const npmVersion = execSync(`npm show ${packageJson.name} version`, {
    encoding: "utf8",
  }).trim();

  const hasBeta = () => {
    // process.argv[0] is the node executable
    // process.argv[1] is the path of the script being run
    // process.argv[2] and onwards are the command line arguments
    const arg = process.argv[3];

    // Check if the argument is "beta"
    if (arg === "beta") {
      return true;
    }

    return false;
  };

  const isBeta = hasBeta();

  console.log("[Result] Current version on npm:", npmVersion);
  console.log("[Result] Is beta:", isBeta);
  console.groupEnd();

  // Increment the version number based on the release type
  console.group("Increment the version number based on the release type");
  console.info("Incrementing the version number based on the release type");

  const newVersion = semver.inc(
    npmVersion,
    process.argv[2],
    isBeta ? "beta" : undefined
  );

  // Update the version in the package.json file
  packageJson.version = newVersion;

  console.log("[Result] New version:", newVersion);
  console.groupEnd();

  // Write the updated package.json back to file
  console.group("Write the updated package.json back to file");
  console.info("Writing the updated package.json back to file");

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log("[Result] Updated package.json file");
  console.groupEnd();

  // Build the package
  console.group("Build the package");
  console.info("Building the package");

  execSync("pnpm asg build", { stdio: "inherit" });

  console.log("[Result] Package built successfully");
  console.groupEnd();

  // Commit and push the changes
  console.group("Commit and push the changes");
  console.info("Committing and pushing the changes");

  execSync(`git add ${packageJsonPath}`);
  execSync(`git commit -m "Release version ${newVersion}"`);
  execSync(`git push origin ${branchName}`);

  console.log("[Result] Changes committed and pushed");
  console.groupEnd();

  // Publish the package
  console.group("Publish the package");
  console.info("Publishing the package");

  execSync(
    `pnpm publish --filter ${packageJson.name} --no-git-checks --provenance`,
    {
      stdio: "inherit",
    }
  );

  console.log("[Result] Package published successfully");

  // Output the branch name
  console.log(branchName);
  /**
   * branch_name=$(node release.js major)
   * echo "The release was made on branch: $branch_name"
   */
} catch (error) {
  console.error("Error during release process:", error);
}
