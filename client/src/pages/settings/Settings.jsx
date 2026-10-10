import "./Settings.css"
import TopBar from "../../components/topbar/TopBar";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios"
const SettingsSection = () => {

    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userdesc, setUserDescription] = useState("");
    const [success, setSuccess] = useState(false);
    const PF = "http://localhost:5000/images/";


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            email,
            userdesc,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
    }

    useEffect(() => {
        setUserDescription(user.userdesc);
        setEmail(user.email);
        setUsername(user.username);
    },[])

    return (
        <>
            <TopBar />
            <div className="settings">
                <div className="settingsWrapper">
                    <form className="settingsForm" onSubmit={handleSubmit}>
                        <div className="settingsPP">
                            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} className="profileImageMain" alt="" />
                            <div className="uploader">
                                <label htmlFor="fileInput">
                                    <i className="fa-regular fa-pen-to-square"></i>
                                </label>
                                <input type="file" name="" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                            </div>
                        </div>
                        <div className="optionsBx">
                            <label>Username</label>
                            <input type="text" name="username" id="" className="writeInputAlt settingsInput" value={user.username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Userdesc</label>
                            <input type="text" name="userdesc" id="" className="writeInputAlt settingsInput" value={user.userdesc} onChange={(e) => setUserDescription(e.target.value)} />
                            <label>Email</label>
                            <input type="email" name="" id="email" className="writeInputAlt settingsInput" value={user.email} onChange={(e) => setEmail(e.target.value)} />
                            <button className="FormSubmit" type="submit">
                                Update
                            </button>
                            {success && <span>Profile is Updated...</span>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SettingsSection;