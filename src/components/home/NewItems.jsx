import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import ShortCut from "./theComponent";
import AOS from "aos";
import 'aos/dist/aos.css';

function SampleNextArrow(props) {
  const { className, style , onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style , zIndex: 100 , borderTop: '10px solid grey', borderRight: '10px solid grey',rotate: '45deg', width:'30px',height: '30px', margin: '20px', marginTop : '0px' }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style,  onClick} = props;
  return (
    <div
      className={className}
      style={{ ...style , zIndex: 100 , borderBottom: '10px solid grey', borderLeft: '10px solid grey',rotate: '45deg', width:'30px',height: '30px' }}
      onClick={onClick}
    />
  );
}
const NewItems = () => {
  const [user, setUser] = useState([])
  const[date, setDate] = useState(Date.now())

  function update(){
    setDate(requestAnimationFrame(update))
  }

  async function fetchUsers(){
    const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
    setUser(data);
  }

  useEffect(() => {
    fetchUsers()
    update()
    AOS.init() 
  },[])

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
    
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {new Array(7).fill(0).map((_, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" data-aos="fade-up" data-aos-duration="3000" key={index}>
                 <div className="bigger">
                    <ShortCut nftId = {user[index]?.nftId} Id = {user[index]?.authorId} author = {user[index]?.authorImage} time = {user[index]?.expiryDate}  length = {user.length} nft = {user[index]?.nftImage} title = {user[index]?.title} likes = {user[index]?.likes} price = {user[index]?.price} />
                 </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
