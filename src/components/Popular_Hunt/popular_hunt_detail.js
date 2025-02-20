import React ,{useEffect,useState}from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow,faAnglesRight, faHeart, faShareAlt, faStar } from '@fortawesome/free-solid-svg-icons';
import DiscountMap  from '../Discounts_New_Hunt/discount_map';
import FooterComponent from '../Footer/footer'
import { Swiper, SwiperSlide } from "swiper/react";
import './popular_hunt_image.css'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import team1 from '../../components/assets/batura2.jpg';
import team2 from '../../components/assets/batura2.jpg';
import logo3 from '../../components/assets/batura2.jpg';
import logo4 from '../../components/assets/batura2.jpg'; 




import './popular_hunt_detail.css';

const PopularHuntDetail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const openGallery = (index) => {
        setActiveIndex(index);
        setIsOpen(true);
      };
    
      const closeGallery = () => setIsOpen(false);  

    const huntsImages = [
        {
          name: "Ibex Hunt",
          image: team1,
        },
        {
          name: "Marco Polo Hunt",
          image: team2,
        },
        {
          name: "Red Stag Hunt",
          image: logo3,
        },
        {
          name: "Wild Boar Hunt",
          image:logo4,
        },
        {
            name: "Red Stag Hunt",
            image: logo3,
          },
          {
            name: "Wild Boar Hunt",
            image:logo4,
          },
          {
            name: "Red Stag Hunt",
            image: logo3,
          },
          {
            name: "Wild Boar Hunt",
            image:logo4,
          },
      ];
const phoneNumber='3554329249'
const email = 'faizanquba1@gmail.com'
    const handleWhatsAppClick = () => {
        const whatsappUrl = `https://wa.me/+92${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
      };
    
      const handleEmailClick = () => {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
        window.open(gmailUrl, '_blank');
      };
      const goNext = () => {
        if (activeIndex < huntsImages.length - 1) {
          setActiveIndex(activeIndex + 1);
        }
      };
    
      const goPrev = () => {
        if (activeIndex > 0) {
          setActiveIndex(activeIndex - 1);
        }
      };

    const location = useLocation();
    const { item } = location.state;

    const destination = {
        lat: item?.latitude,  // Ensure the latitude is properly fetched
        lng: item?.longitude, // Ensure the longitude is properly fetched
      };

      useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    console.log('destination',destination)
    // You can replace 'Alaska' with dynamic location coordinates if necessary.
    const googleMapsUrl = "https://earth.google.com/web/search/Alaska";

    return (
        <div className='discount_detail_main_container'>
            <div className="discount_detail_container">
                <div className='discount_detail_main_container_content'>
                    <div>
                        <h2 className='discount_detail_main_container_heading'>{item.description}</h2>
                        <div className='discount_detail_main_container_content_one'>
                            <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px' }} icon={faLocationArrow} fontSize={'20px'} />

                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='discount_detail_main_container_para'
                            >
                               {item.hunterlocation}
                            </a>
                        </div>
                    </div>

                    <div className="icon-container">
                        <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px', display: 'block', marginBottom: '20px', marginTop: '18px' }} icon={faHeart} fontSize={'20px'} />
                        <FontAwesomeIcon color='#dbb127' style={{ marginLeft: '10px', display: 'block' }} icon={faShareAlt} fontSize={'20px'} />
                    </div>

                    <div className="vertical-line"></div>

                    <div>
                        <p className='discount_detail_main_container_content_two_paragraph'>Package price</p>
                        <div className='discount_detail_main_container_content_two'>
                            <h2 className='discount_detail_main_container_content_two_head'>{'$'+item.newPrice}</h2>
                        </div>
                        <p className='discount_detail_main_container_content_two_para_two previous-price'>{'$'+item.priceOld}</p>

                    </div>
                </div>
            </div>

            {/* image container */}

            <div className='discount_detail_image_main_container'>
                <div className='discount_detail_image_main_container_one'>
                    <img className='discount_detail_image_main_container_one_iamge' src={item.ibexphotos[0].cloudinary_url} alt='sa' />
                </div>

                <div className='discount_detail_image_main_container_two'>
                    <div className='discount_detail_image_main_container_one_iamge_round_flex'>
                        <img className='discount_detail_image_main_container_one_iamge_round' src={item.ibexphotos[0].cloudinary_url} alt='sa' />
                        <div>
                            <p className='discount_detail_image_main_container_one_iamge_round_para_one'>{item.guideName} operation(Guide)</p>
                            <p className='discount_detail_image_main_container_one_iamge_round_para_two'>passu gojal</p>
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <p className='discount_detail_image_main_container_one_iamge_round_para_three'> response rate:2.4</p>
                        </div>


                    </div>

                    <div className='discount_detail_image_main_container_one_iamge_round_para_three_container'>
                        <h2 className='discount_detail_image_main_container_one_iamge_round_para_three_container_head'>More about us</h2>
                        <div className='discount_detail_scrollable_content'>
                            <p className='discount_detail_image_main_container_one_iamge_round_para_three_container_para'>
                                {item.guideName}
                                {item.hunterlocation}
                                9.4
                                Response rate: {item.rate}
                                Response time: within a day
                                Contact outfitter
                                <br />
                                <br />
                                More about us
                                Our company was established in 2011 and operates in 3 territories.
                                Located in Southern NM, we have been around since 2011 and our experience shows. Our goal is for you to have a good time with honest hard working people who know the country and will work hard to get you that trophy. We hunt for everything here in NM and have some of the best accommodations in the areas we hunt. Your hunt is an investment and we know that, from lodging to food to your guide we will exceed your expectations. Whether you get your trophy or not you will have a great time with us!
                            </p>
                        </div>
                    </div>


                </div>
            </div>
            {/* dolar */}

            <div className='discount_detail_dolar_main_container'>
                <div className='discount_detail_dolar_main_container_one'>
                    <h2 className='discount_detail_dolar_main_container_one_heading'>About this hunt</h2>
                    <p className='discount_detail_dolar_main_container_one_para'>Unit 34 Cow elk hunt, with 100% success. This is a great youth hunt or hunt to fill that freezer. Good food, accommodations and great guides, what more can you ask for! Weather during these hunts are also mild making it a really comfortable cow elk hunt.<br /> <br />
                        Hunt price is for 2 hunters with 1 guide. You will be able to harvest a cow each.<br />  <br />
                        Hunt Dates for 2024 -2025 season, Jan 25-27, 2025<br /> <br />
                        Guide and field care provided, Pack outs are team effort. <br /> <br />
                        Non hunter add $175.00 a day
                        <br /> <br />

                        Hunting season: 25 Jan 2025 - 27 Jan 2025
                    </p>

                </div>

                <div className='discount_detail_dolar_main_container_two'>

                    <div className='discount_detail_dolar_main_container_two_dolar_head'>
                        <h2 className='discount_detail_dolar_main_container_two_dolar_head_heading'>{'$'+item.newPrice}</h2>
                        <p className='discount_detail_dolar_main_container_two_dolar_head_para previous-price'>{'$'+item.priceOld}</p>
                    </div>

                    <div className='discount_detail_dolar_main_container_two_dolar_button_head'>
                        <button className='discount_detail_dolar_main_container_two_dolar_instant_button'  onClick={handleEmailClick} 
            style={{ cursor: 'pointer' }}>Instant booking via Gmail</button>
                        <button className='discount_detail_dolar_main_container_two_dolar_whatsapp_button'  onClick={handleWhatsAppClick} 
            style={{ cursor: 'pointer' }}>Contact via whatsapp</button>
                    </div>


                    <div className='discount_detail_dolar_main_container_two_dolar_button_head_content'>
                        <div >
                            <p>This price include</p>
                            <hr />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', width: '44%', justifyContent: 'space-between' }}>

                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <p style={{ marginBottom: '0px', marginTop: '4px' }}>Daily rate for 3 days</p>
                        </div>
                        <hr />

                        <div style={{ display: 'flex', alignItems: 'center', width: '24%', justifyContent: 'space-between' }}>
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <p style={{ marginBottom: '0px', marginTop: '4px' }}>2 Hunters</p>
                        </div>
                        <hr />

                        <div style={{ display: 'flex', alignItems: 'center', width: '14%', justifyContent: 'space-between' }}>
                            <FontAwesomeIcon icon={faStar} color='#dbb127' />
                            <p style={{ marginBottom: '4px', marginTop: '4px' }}>Eik</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="gallery-container">
                <h2>Images for this Hunt</h2>
      {/* Image Grid */}
      <div className="image-grid">
  {huntsImages.slice(0, 4).map((hunt, index) => (
    <div key={index} className="grid-item" onClick={() => openGallery(index)}>
      <img src={hunt.image} alt={hunt.name} className="grid-image" />
    </div>
  ))}
</div>


      {/* Fullscreen Slider Gallery */}
      {isOpen && (
        <div className="fullscreen-gallery">
          <button className="close-btn" onClick={closeGallery}>&times;</button>
          <Swiper
            modules={[Navigation]}
            navigation
            initialSlide={activeIndex}
            loop
            className="gallery-swiper"
          >
            {huntsImages.map((hunt, index) => (
              <SwiperSlide key={index}>
                <img src={hunt.image} alt={hunt.name} className="fullscreen-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
            <div className='discount_detail_dolar_main_container_map'>
                <h2 className='discount_detail_dolar_main_container_map_head'>Trip on the Map</h2>
            <DiscountMap destination={destination} />
            </div>
            <FooterComponent />
            
        </div>
    );
};

export default PopularHuntDetail;
