import { NotificationManager } from "react-notifications";
import axios from "axios";
import config from "../config";
import store from "../store";

axios.defaults.baseURL = config.BackendURI;

// User Auth
const register = async (signData) => {
    try {
        const res = await axios.post("/api/registry", signData);

        if (!res.data.success) {
            NotificationManager.error(res.data.msg, "", 3000);
            return;
        }

        NotificationManager.success(res.data.msg, "", 3000);
    } catch (err) {
        console.log(err);
        NotificationManager.error("Community Error", "", 3000);
    }
};

const login = async (signData) => {
    try {
        const res = await axios.post("/api/login", signData);

        if (!res.data.success) {
            NotificationManager.error(res.data.msg, "", 3000);
            return;
        }

        store.dispatch({
            type: "SET_AUTH",
            payload: res.data.username,
        });

        NotificationManager.success(res.data.msg, "", 3000);
    } catch (err) {
        console.log(err);
        NotificationManager.error("Community Error", "", 3000);
    }
};

// Export Functions
const Action = {
    // User Auth
    register,
    login,
};

export default Action;
