import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

const ItemDetails = () => {
  const {id}=useParams()
  const [user, setUser] = useState([])
  const [user1, setUser1] = useState([])
  
  async function fetchUsers(){
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
    setUser(data)
    setUser1([0,data])
  }
  useEffect(() => {
    fetchUsers()
    AOS.init()
  },[])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content" data-aos="fade-up" data-aos-duration="3000">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
              {user1.length > 0 ? <img
                  src={user?.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />: <Skeleton width={'550px'} height={'500px'}></Skeleton>}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                { user1.length > 0 ? <h2>{user?.title} #{user?.tag}</h2>: <Skeleton width={'400px'} height={'40px'}></Skeleton>}

                  <div className="item_info_counts">
                  { user1.length > 0 ? <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {user?.views}
                    </div>: <Skeleton width={'50px'} height={'40px'}></Skeleton>}
                    { user1.length > 0 ? <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {user?.likes}
                    </div> : <Skeleton width={'50px'} height={'40px'}></Skeleton>}
                  </div>
                  { user1.length > 0 ? <p>
                  {user?.description}
                  </p>: <Skeleton width={'450px'} height={'100px'}></Skeleton>}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${user?.ownerId}`}>
                          { user1.length > 0 ? <img className="lazy" src={user?.ownerImage} alt="" />: <Skeleton width={'50px'} height={'50px'} borderRadius={'50%'}></Skeleton>}
                          { user1.length > 0 && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to= {`/author/${user?.ownerId}`}>{user1.length > 0 ? user?.ownerName : <Skeleton width= {'100px'} height={'20px'}></Skeleton>}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${user?.creatorId}`}>
                          { user1.length > 0 ? <img className="lazy" src={user?.creatorImage} alt="" />: <Skeleton width={'50px'} height={'50px'} borderRadius={'50%'}></Skeleton>}
                            { user1.length > 0 && <i className="fa fa-check"></i>}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${user?.creatorId}`}>{user1.length > 0 ? user?.creatorName : <Skeleton width= {'100px'} height={'20px'}></Skeleton>}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                    { user1.length > 0 && <img src={EthImage} alt="" />}
                      {user1.length > 0 ? <span>{user?.price}</span> :<Skeleton width= {'100px'} height={'35px'}></Skeleton>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
