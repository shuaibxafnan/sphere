import "./Posts.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const PostContent = ({ post }) => {

    const PF = "http://localhost:5000/images/";
    return (
        <div className="postCard">
            <div className="postImg">
                {post.photo && (<img src={PF + post.photo} className="ImgPosts" alt="Post Image" />)}
            </div>
            <div className="postBx">
                <div className="stamps">
                    {post.categories.map((c) => (
                        <div className="things">
                            <span className="stamp">{c}</span>
                            <span className="stamp">{post.username}</span>
                        </div>
                    ))}
                    <img src={PF + post.userimg} className="postUserimg" alt="" />
                </div>
                <div className="details">
                    <Link to={`/post/${post._id}`}>
                        <h4 className="blogTitle">{post.title}</h4>
                    </Link>
                    <p>{post.description}</p>
                </div>
            </div>
        </div>
    );
}

export default PostContent;