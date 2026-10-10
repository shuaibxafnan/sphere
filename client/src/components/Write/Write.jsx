import "./Write.css";
import TopBar from "../topbar/TopBar";
import { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const WriteSection = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [story, setStory] = useState("")
    const [file, setFile] = useState(null)
    const [categories, setCategories] = useState("")
    const {user} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            description,
            story,
            categories,
            username : user.username,
            userimg : user.profilePic,
            userdesc : user.userdesc,
            twitter : user.userTwitter,
            linkedin : user.userLinkedin,
            fb : user.userFacebook,
            insta : user.userInstagram,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                
            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) {
            console.log(err);
        }
    }

    const quillData = (value) => {
        setStory(value)
    }

    return (
        <>
            <TopBar />
            <section className="writer">
                {file && (<img src={URL.createObjectURL(file)} className="BlogImage" alt="" />)}
                <form className="writeform" onSubmit={handleSubmit} >
                    <div className="writeFormGroup">
                        <label htmlFor="fileInput">
                            <i class="fa-solid fa-plus"></i>
                        </label>
                        <input type="file" name="" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                        <input type="text" name="" id="" placeholder="Blog Title" className="writeInput" onChange={e => setTitle(e.target.value)} autoFocus={true} />
                    </div>
                    <div className="blogContents">
                        <input placeholder="Category" type="text" className="writeInputAlt" onChange={e => setCategories(e.target.value)} />
                    </div>
                    <div className="writeFormGroup">
                        <input placeholder="Blog Description" className="writeInputAlt" type="text" onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="writeFormGroup">
                        <ReactQuill onChange={quillData} />
                        <button className="submitForm" type="submit">
                            <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                                    </svg>
                                </div>
                            </div>
                            <span>Publish</span>
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default WriteSection;