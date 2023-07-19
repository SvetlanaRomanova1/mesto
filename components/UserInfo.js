export default class UserInfo {
    constructor({ name, job }) {
        this._nameElement = document.querySelector(name);
        this._jobElement = document.querySelector(job);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        };
    }

    setUserInfo({ name, job }) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = job;
    }
}