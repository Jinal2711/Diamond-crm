import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
export default class Carousel extends Component {
  render() {
    const params = {
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      autoplay: {
        delay: 3000,
      },
      spaceBetween: 30,
      loop: true
    }
    return (
      <div>
        <Swiper {...params}>
          <div className="swiperImg" style={{ backgroundImage: `url(${require("../assets/d1.jpg")})` }}></div>
          <div className="swiperImg" style={{ backgroundImage: `url(${require("../assets/d2.jpg")})` }}></div>
          <div className="swiperImg" style={{ backgroundImage: `url(${require("../assets/d3.jpg")})` }}></div>
          <div className="swiperImg" style={{ backgroundImage: `url(${require("../assets/d5.jpg")})` }}></div>
        </Swiper>
      </div>
    )
  }
}