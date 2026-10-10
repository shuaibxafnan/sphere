import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Context } from "../../context/Context";
import "./SingleBlog.css";
import TopBar from "../topbar/TopBar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SingleBlogPage = () => {

    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [story, setStory] = useState("");
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [updateMode, setUpdateMode] = useState(false);

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title,
                description,
                story
            },
            );
            window.location.reload();
            setUpdateMode(false)
        } catch (err) {
        }
    }

    const handleDelete = () => {
        axios.delete(`/posts/${post._id}`)
            .then(result => {
                console.log(result)
                window.location.reload('/')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data);
            setTitle(res.data.title);
            setStory(res.data.story);
            setDescription(res.data.description);
        };
        getPost();
    }, [path]);

    const quillData = (value) => {
        setStory(value)
    }

    return (
        <>
            <TopBar />
            <div className="blogWrapper">
                <div className="blogStamps">
                    <div className="blogStampBx">
                        <h5>{post.categories}</h5>
                        <div className="line-wobble"></div>
                        <h5>{new Date(post.createdAt).toDateString()}</h5>
                    </div>

                    {updateMode ? (<input type="text" value={title} className="writeInputAlt writeInputAltAlt" onChange={(e) => setTitle(e.target.value)} />) : <h3>{title}</h3>}

                </div>
                <div className="blogImage">
                    {post.photo && (<img src={PF + post.photo} alt="" />)}
                    {post.username === user?.username && (
                        <div className="blogButtons">
                            <button onClick={() => setUpdateMode(true)}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    )}

                </div>
                <div className="blogSDesc">
                    <h6>Description</h6>
                    {updateMode ? (<input type="text" value={description} className="writeInputAlt writeInputAltAlt" onChange={(e) => setDescription(e.target.value)} />) : <h4>{description}</h4>}
                </div>
                <div className="blogSUser">
                    <div className="userCard">
                        <div className="userCardTxt">
                            <div className="userAbout">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#000000" viewBox="0 0 256 256"><path d="M100,56H40A16,16,0,0,0,24,72v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,100,56Zm0,80H40V72h60ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Zm0,80H156V72h60Z"></path></svg>
                                <p>{post.userdesc}</p>
                                <div className="userSocial">
                                    <a href="/"><i class="fa-brands fa-instagram"></i></a>
                                    <a href="/"><i class="fa-brands fa-facebook"></i></a>
                                    <a href="/"><i class="fa-brands fa-dribbble"></i></a>
                                    <a href="/"><i class="fa-brands fa-twitter"></i></a>
                                </div>
                            </div>
                            <div className="userSpan">
                                <img src={PF + post.userimg} alt="" />
                                <div className="userSpanBx">
                                    <h5>{post.username}</h5>
                                    <Link to={`/?user=${post.username}`}>
                                        <p>{`More By - ${post.username}`}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="userCardImg">
                            <img src={PF + post.userimg} alt="" />
                        </div>
                    </div>
                </div>
                <div className="blogSStory">
                    {updateMode ? <ReactQuill value={story} onChange={quillData} /> : <p dangerouslySetInnerHTML={{ __html: story }} />}
                    {updateMode && (
                        <button className="blogBtn" onClick={handleUpdate}>Update</button>
                    )}
                </div>

            </div>
        </>

    );
}

export default SingleBlogPage;