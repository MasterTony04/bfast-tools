/**
 * manage initiation or project structure
 */

class ResourceController {
    constructor() {
        this._fse = require('fs-extra');
        this._fs = require('fs');
        this._path = require('path');
        this._checkIfFileExist = (projectDir) => {
            return this._fs.existsSync(projectDir);
        }
    }

    createProjectFolder(projectDir) {
        if (this._checkIfFileExist(projectDir)) throw Error('project folder already exist at: ' + projectDir);
        this._fse.copySync(this._path.join(__dirname, `/../res`), projectDir);
        return `done create project folder, now "cd ${projectDir}" to start hacking`;
    }

    async getProjectIdFromBfastFJSON(projectDir) {
        try {
            return require(this._path.join(projectDir, '/bfast.json'));
        } catch (e) {
            return 'This is not a bfast project folder "bfast.json" not found';
        }
    }

    /**
     *
     * @param projectId {string}
     * @param projectDir {string} current project directory path
     * @returns {Promise<string>}
     */
    async saveProjectIdInBFastJSON({projectId, projectDir}) {
        try {
            let bfastJson = require(this._path.join(projectDir, '/bfast.json'));
            bfastJson = JSON.parse(JSON.stringify(bfastJson));
            bfastJson.projectId = projectId;
            this._fs.writeFileSync(this._path.join(projectDir, '/bfast.json'), JSON.stringify(bfastJson));
            return 'Ok';
        } catch (e) {
            return 'Fails to save project id in bfast.json file'
        }
    }


}

module.exports = ResourceController;
