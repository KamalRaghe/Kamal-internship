import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShortCut from "../home/theComponent";
import AOS from "aos";
import 'aos/dist/aos.css';

const ExploreItems = () => {
  const [user, setUser] = useState([])
  const[date, setDate] = useState(Date.now())
  const [Load, setLoad] = useState(false)
  const [LoadOut, setLoadOut] = useState(true)
  const [ amount, setAmount] = useState(8)
  const[value, setValue] = useState('')

  function load(){
    if(Load === false){
      setLoad(true)
      setAmount(12)
    }else{
      setAmount(16)
      setLoadOut(false)
    }
  }

  function Filter(stuff){
    setValue(stuff)
  }

  function update(){
    setDate(requestAnimationFrame(update))
  }

  async function fetchUsers(){
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`)
    setUser(data)
  }

  useEffect(() => {
    fetchUsers()
    AOS.init()
    update()  
  },[value])
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => Filter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {new Array(amount).fill(0).map((_, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          data-aos="fade-up" data-aos-duration="3000"
        >
          <ShortCut nftId = {user[index]?.nftId} Id = {user[index]?.authorId} author = {user[index]?.authorImage} time = {user[index]?.expiryDate}  length = {user.length} nft = {user[index]?.nftImage} title = {user[index]?.title} likes = {user[index]?.likes} price = {user[index]?.price} />
        </div>
      ))}
      {LoadOut &&  <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" data-aos="fade-up" data-aos-duration="3000" onClick={load}>
          Load more
        </Link>
      </div>}
    </>
  );
};

export default ExploreItems;
