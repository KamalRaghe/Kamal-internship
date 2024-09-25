import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

const HotCollections = () => {
  const [user,setUser] = useState([])
  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow ></SampleNextArrow>,
    prevArrow: <SamplePrevArrow></SamplePrevArrow>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
    

  function SampleNextArrow(props) {
    const { className, style , onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style ,border:"1px solid black",borderRadius:"50%",color:"black",width:"50px", height:"50px",display:"flex",justifyContent:"center",alignItems:"center"}}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style,  onClick} = props;
    return (
      <div
        className={className}
        style={{ ...style ,borderBottom: '10px solid grey', borderLeft: '10px solid grey',rotate: '45deg', width:'30px',height: '30px' }}
        onClick={onClick}
      />
    );
  }

  async function fetchUsers(){
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
    setUser(data)
  }
  useEffect(() => {
    fetchUsers()
    AOS.init()
  },[])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        <div>
      </div>
            <Slider {...settings} >
              {new Array(6).fill(0).map((_, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" data-aos="fade-up" data-aos-duration="3000"  key={index}>
                    <div className="big">
                        <div className="nft_wrap">
                            <Link to={`/item-details/${user[index]?.nftId}`}>
                              {user.length > 0 ? <img src={user[index].nftImage} className="lazy img-fluid" alt="" />: <Skeleton width={"250px"} height={"250px"}></Skeleton>}
                            </Link>
                          </div>
                          <div className="nft_coll_pp">
                            <Link to={`/author/${user[index]?.authorId}`}>
                              {user.length > 0 ? <img className="lazy pp-coll" src={user[index].authorImage} alt="" />: <Skeleton width={"50px"} height={"50px"} borderRadius={'50%'}></Skeleton>}
                            </Link>
                            {user.length > 0 && <i className="fa fa-check"></i>}
                          </div>
                          <div className="nft_coll_info rect-big">
                            <Link to="/explore">
                              {user.length > 0 ? <h4 className="center">{user[index].title}</h4>:<div><Skeleton width={"100px"} height={"20px"}></Skeleton></div>}
                            </Link>
                            {user.length > 0 ? <div className="center">ERC-{user[index].code}</div>: <Skeleton width={"80px"} height={"20px"}></Skeleton>}
                          </div>
                    </div>
                  </div>
              ))} 
            </Slider>      
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
