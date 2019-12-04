import React from 'react'
import { BaseField, LeafComponent, BasePreview, ComponentSettingConfig, ComponentDataConfig } from '../BaseLeafComponent'

import './CitiesSlider.css'

import SliderDefault1 from './slider-default1.jpg'
import SliderDefault2 from './slider-default2.jpg'
import SliderDefault3 from './slider-default3.jpg'


// 幻灯片
class CitiesSlider extends LeafComponent {
    constructor(props) {
        super(props);

        this.IMAGE_PARTS = 4;

        this.changeTO = null;
        this.AUTOCHANGE_TIME = 4000;

        this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
    }

    componentWillUnmount() {
        window.clearTimeout(this.changeTO);
    }

    componentDidMount() {
        this.runAutochangeTO();
        setTimeout(() => {
            this.setState({ activeSlide: 0, sliderReady: true });
        }, 0);
    }

    runAutochangeTO() {
        this.changeTO = setTimeout(() => {
            this.changeSlides(1);
            this.runAutochangeTO();
        }, this.AUTOCHANGE_TIME);
    }

    changeSlides(change) {
        window.clearTimeout(this.changeTO);
        const { length } = this.props.slides;
        const prevSlide = this.state.activeSlide;
        let activeSlide = prevSlide + change;
        if (activeSlide < 0) activeSlide = length - 1;
        if (activeSlide >= length) activeSlide = 0;
        this.setState({ activeSlide, prevSlide });
    }

    render() {
        const { activeSlide, prevSlide, sliderReady } = this.state;
        return (
            <div className={"slider" + (sliderReady && " s--ready")}>
                {/* <p className="slider__top-heading">Travelers</p> */}
                <div className="slider__slides">
                    {this.props.slides.map((slide, index) => (
                        <div
                            className={'slider__slide' + (activeSlide === index ? ' s--active' : (prevSlide === index ? ' s--prev' : ""))}
                            key={slide.city}
                        >
                            <div className="slider__slide-content">
                                <h3 className="slider__slide-subheading">{slide.country || slide.city}</h3>
                                <h2 className="slider__slide-heading">
                                    {slide.city.split('').map((l, charIndex) => <span key={charIndex}>{l}</span>)}
                                </h2>
                                <p className="slider__slide-readmore">read more</p>
                            </div>
                            <div className="slider__slide-parts">
                                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                                    <div className="slider__slide-part" key={i}>
                                        <div className="slider__slide-part-inner" style={{ backgroundImage: `url(${slide.img})` }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider__control" onClick={() => this.changeSlides(-1)} />
                <div className="slider__control slider__control--right" onClick={() => this.changeSlides(1)} />
            </div>
        );
    }
}

const slides = [
    {
        city: 'Paris',
        country: 'France',
        img: SliderDefault1,
    },
    {
        city: 'Singapore',
        img: SliderDefault2,
    },
    {
        city: 'Prague',
        country: 'Czech Republic',
        img: SliderDefault3,
    }
];

CitiesSlider.defaultProps = {
    slides: slides
}

export default CitiesSlider;