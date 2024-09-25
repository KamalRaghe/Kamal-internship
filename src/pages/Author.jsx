import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

const Author = () => {
  const { id }=useParams()
  const [user, setUser] = useState([])
  const [user1, setUser1] = useState([])
  const [follow, setFollow] = useState(true)
  const [count, setCount] = useState(0)

  function Follow(){
    if (follow){
      setFollow(!follow)
      setCount(1) 
    }
      else{
        setFollow(true)
        setCount(0) 
    }
  }
  
  async function fetchUsers(){
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
    setUser(data)
    setUser1(data.nftCollection)
  }
  useEffect(() => {
    fetchUsers()
    AOS.init()
  },[])
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content" data-aos="fade-up" data-aos-duration="3000">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {user1.length > 0 ? <img src={user.authorImage} alt="" />: <Skeleton width = {'150px'} height={'150px'} borderRadius={'50%'}></Skeleton>}

                      {user1.length > 0 && <i className="fa fa-check"></i>}
                      <div className="profile_name">
                        <div>
                          {user1.length > 0 ? user.authorName: <Skeleton width = {'100px'} height={'20px'}></Skeleton>}
                          {user1.length > 0 ?  <span className="profile_username">@{user.tag}</span>: <span className="profile_username"><Skeleton width = {'60px'} height={'20px'}></Skeleton></span>}
                          <span id="wallet" className="profile_wallet">
                            {user1.length > 0 ? user.address: <Skeleton width = {'200px'} height={'20px'}></Skeleton>}
                          </span>
                          {user1.length > 0 && <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{user1.length > 0 ? user.followers+count: <Skeleton width = {'100px'} height={'20px'}></Skeleton>}{user1.length > 0 && ' followers'}</div>
                      { user1.length > 0 ? <Link to="#" className="btn-main" onClick={Follow}>
                        {follow ? "Follow" : "Unfollow"}
                      </Link>: <Skeleton width = {'120px'} height={'35px'}></Skeleton>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
