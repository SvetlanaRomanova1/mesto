export default class UserInfo {
    constructor({ name, job, avatar }) {
        this._nameElement = document.querySelector(name);
        this._jobElement = document.querySelector(job);
        this._avatar = document.querySelector(avatar);
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

    setAvatar({avatar}) {
        this._avatar.src = avatar;
    }
}