import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

const AuthorItems = () => {
  const { id } = useParams()
  const [user, setUser] = useState([])
  const [user1,setUser1] = useState([])
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
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" data-aos="fade-up" data-aos-duration="3000" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                {user1.length > 0 ?<Link to="">
                    <img className="lazy" src={user.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>: <Skeleton width={'50px'} height={'50px'} borderRadius={'50%'}></Skeleton>}
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${user1[index]?.nftId}`}>
                    {user1.length > 0 ?<img
                      src={user1[index].nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />: <Skeleton width={'170px'} height={'200px'} borderRadius={'10px'}></Skeleton>}
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item-details/${user1[index]?.nftId}`}>
                    {user1.length > 0 ? <h4>{user1[index].title}</h4>: <Skeleton width={'100px'} height={'20px'} ></Skeleton>}
                  </Link>
                  <div className="nft__item_price">{ user1.length > 0 ? user1[index].price : <Skeleton width={'60px'} height={'20px'}></Skeleton>}</div>
                  <div className="nft__item_like">
                    { user1.length > 0 && <i className="fa fa-heart"></i>}
                    <span>{ user1.length > 0 ? user1[index]?.likes : <Skeleton width={'35px'} height={'20px'}></Skeleton>}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
