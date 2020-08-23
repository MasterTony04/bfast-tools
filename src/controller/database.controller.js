const axios = require('axios');
const Utils = require('./utils');
const LocalStorage = require('./local-storage.controller');
const BFastJs = require("../bfast.cli");
const _storage = new LocalStorage();
const {open} = require('out-url');

class DatabaseController {

    /**
     * switch on/off database dashboard
     * @param projectId {string}
     * @param mode {number}
     * @param force {boolean}
     * @returns {Promise<>}
     * @deprecated
     */
    async switchDashboard(projectId, mode, force = false) {
        try {
            const user = await _storage.getUser();
            console.log(`\nCurrent linked bfast project ( projectId: ${projectId})`);
            console.log(`Start switching dashboard ${mode === 0 ? 'off' : 'on'}`);
            const response = await axios.post(`${await BFastJs.clusterApiUrl()}/dashboard/${projectId}/switch/${mode}?force=${force}`,
                {},
                {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${user.token}`
                    },
                }
            );
            return response.data;
        } catch (reason) {
            if (reason && reason.response) {
                throw reason.response.data;
            } else {
                throw reason;
            }
        }
    }

    async openUi(port) {
        const url = 'https://bfast-playground.web.app/';
        await open(url);
        return 'BFast::Database playground listening at ' + url + ' in your browser';
    }

    /**
     *
     * @param {string} name - docker image to be used
     * @return {Promise}
     */
    async image(name){

    }

    /**
     * update liveQuery classes to listen to
     * @param projectDir {string}
     * @param classes {string[]}
     * @param force {boolean}
     * @returns {Promise<>}
     * @deprecated
     */
    async addClassesToLiveQuery(projectDir, classes, force) {
        try {
            if (!Array.isArray(classes)) {
                throw "classes must be an array of string"
            }
            const user = await _storage.getUser();
            await Utils.isBFastProject(projectDir);
            const project = await _storage.getCurrentProject(projectDir);
            console.log(`\nCurrent linked bfast project ( projectId: ${project.projectId})`);
            const response = await axios.post(`${await BFastJs.clusterApiUrl()}/database/${project.projectId}/liveQuery?force=${force}`,
                {
                    classNames: classes
                },
                {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${user.token}`
                    },
                }
            );
            return response.data;
        } catch (reason) {
            if (reason && reason.response) {
                throw reason.response.data;
            } else {
                throw reason;
            }
        }
    }
}

module.exports = {DatabaseController};
