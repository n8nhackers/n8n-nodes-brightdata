#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");

function sh(cmd) {
	return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "inherit"] }).trim();
}

function getTags() {
	// List tags in ascending order (oldest first)
	return sh("git tag --sort=version:refname")
		.split("\n")
		.filter(Boolean);
}

function getRootCommit() {
	// Get the first commit of the repository
	return sh("git rev-list --max-parents=0 HEAD");
}

function getTagDate(tag) {
	// Get the tag creation date (using the tag commit)
	return sh(`git log -1 --format=%ad --date=short ${tag}`);
}

function getChangelogBetween(oldRev, newRev) {
	// Get commit logs between revisions with a compact format
	const logRaw = sh(`git log ${oldRev}..${newRev} --pretty=format:"- %s (%h, %ad)" --date=short`);
	return logRaw;
}

function generateChangelog() {
	const tags = getTags();
	let changelog = "# Changelog\n\n";
	// Start from the very first commit if tags exist
	let prev = getRootCommit();

	for (const tag of tags) {
		const date = getTagDate(tag);
		let section = `## ${tag} - ${date}\n\n`;
		const commits = getChangelogBetween(prev, tag);
		section += commits ? commits + "\n\n" : "No changes.\n\n";
		changelog += section;
		prev = tag;
	}
	return changelog;
}

// Generate changelog and write it to CHANGELOG.md
const changelogContent = generateChangelog();
fs.writeFileSync("CHANGELOG.md", changelogContent, "utf8");
console.log("CHANGELOG.md generated successfully.");
