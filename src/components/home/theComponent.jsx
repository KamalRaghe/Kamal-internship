import Skeleton from "../UI/Skeleton";
import { Link } from "react-router-dom";

function ShortCut({author, time , length, nft, title, likes, price, Id, nftId}){
  return (
    <>
        <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${Id}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                {length > 0  ? <img className="lazy" src={ author} alt="" />:<Skeleton width={'50px'} height={'50px'} borderRadius={'50%'}></Skeleton>}
                {length > 0 && <i className="fa fa-check"></i>}
              </Link>
            </div>
            {!(time === null) && length > 0 && <div className="de_countdown">{Math.floor((time - Date.now())/1000/60/60)}h {Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            {!(length > 0) && <div className="clock"> <Skeleton width={'110px'} height={'30px'} borderRadius={'30px'}></Skeleton></div>}   
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
              { length  > 0 ?<Link to={`/item-details/${nftId}`}>
                <img src={nft} className="lazy nft__item_preview" alt="" />
              </Link>: <Skeleton width={'250px'} height={'250px'} borderRadius={'14px'}></Skeleton> }
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                {length  > 0 ? <h4>{title}</h4>: <Skeleton  height={'20px'} width={'100px'}></Skeleton> }
              </Link>
              { length  > 0 ?<div className="nft__item_price">{price} ETH</div>:<div className="nft__item_price"><Skeleton  height={'20px'} width={'80px'}></Skeleton></div> }
              <div className="nft__item_like">
                { length  > 0 && <i className="fa fa-heart"></i>}
                { length  > 0 ? <span>{likes}</span>: <Skeleton height={'20px'} width={'50px'}></Skeleton>}
              </div>
            </div>
          </div>
    </>
  );
};

export default ShortCut;