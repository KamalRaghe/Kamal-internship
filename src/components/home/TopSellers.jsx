import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

const TopSellers = () => {
  const [user, setUser] = useState([])
  async function fetchUsers(){
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
    setUser(data)
  }

  useEffect(() => {
    fetchUsers()
    AOS.init()
  },[])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {new Array(12).fill(0).map((_, index) => (
                <li key={index} data-aos="fade-up" data-aos-duration="3000">
                  <div className="author_list_pp">
                  {user.length > 0 ? <Link to={`/author/${user[index]?.authorId}`}>
                       <img
                        className="lazy pp-author"
                        src={user[index].authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>: <Skeleton width={'50px'} height={'50px'} borderRadius={'50%'} ></Skeleton>}
                  </div>
                  <div className="author_list_info">
                  {user.length > 0 ? <Link to="/author">{user[index]?.authorName}</Link>: <Skeleton width={'100px'} height={'20px'}></Skeleton>}
                  {user.length > 0 ? <div>{user[index]?.price} ETH</div>: <div><Skeleton width={'40px'} height={'20px'}></Skeleton></div>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
