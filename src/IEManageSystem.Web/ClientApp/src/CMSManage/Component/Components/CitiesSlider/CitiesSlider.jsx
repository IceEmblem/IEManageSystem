import React from 'react'
import { BaseField, BaseStaticComponent, BasePreview, ComponentSettingConfig, ComponentDataConfig } from '../BaseStaticComponent'

import './CitiesSlider.css'

import SliderDefault1 from './slider-default1.jpg'
import SliderDefault2 from './slider-default2.jpg'
import SliderDefault3 from './slider-default3.jpg'


// 幻灯片
class CitiesSlider extends BaseStaticComponent {
    constructor(props) {
        super(props);

        this.sliders = [];

        // 将图片分为4个部分
        this.IMAGE_PARTS = 4;

        this.changeTO = null;
        this.AUTOCHANGE_TIME = 4000;

        this.state = { activeSlide: 0, prevSlide: -1 };
    }
    
    componentWillMount() {
        this.updateSliders(this.props);
    }

    // 父组件发生render的时候子组件就会调用
    componentWillReceiveProps(nextProps){
        this.updateSliders(nextProps);
    }

    // 补全数据
    completionData(data){
        if(!data.title){
            data.title = "请输入标题";
        }

        if(data.content){
            data.content = "请输入文本内容";
        }

        if(data.imgSrc){
            data.imgSrc = SliderDefault1;
        }

        return data;
    }

    updateSliders(props){
        let sliders = [];
        let pageComponentSetting = props.pageComponentSettings.find(item=>item.name == "pic");
        if(!pageComponentSetting){
            this.sliders = defaultSlides;
            return;
        }

        if(pageComponentSetting.field1){
            sliders.push(this.completionData(JSON.parse(pageComponentSetting.field1)));
        }

        if(pageComponentSetting.field2){
            sliders.push(this.completionData(JSON.parse(pageComponentSetting.field2)));
        }

        if(pageComponentSetting.field3){
            sliders.push(this.completionData(JSON.parse(pageComponentSetting.field3)));
        }

        if(sliders.length == 0){
            this.sliders = defaultSlides;
            return;
        }

        this.sliders = sliders;
    }

    componentWillUnmount() {
        window.clearTimeout(this.changeTO);
    }

    componentDidMount() {
        this.changeTO = window.setInterval(()=>{
            this.changeSlides(1);
        }, this.AUTOCHANGE_TIME);
    }

    changeSlides(change) {
        const { length } = this.sliders;
        const prevSlide = this.state.activeSlide;
        let activeSlide = prevSlide + change;
        if (activeSlide < 0) activeSlide = length - 1;
        if (activeSlide >= length) activeSlide = 0;
        this.setState({ activeSlide, prevSlide });
    }

    render() {
        const { activeSlide, prevSlide } = this.state;
        return (
            <div className={"slider slider-ready"}>
                {/* <p className="slider__top-heading">Travelers</p> */}
                <div className="slider-slides">
                    {this.sliders.map((slide, index) => (
                        <div
                            className={'slider-slide' + (activeSlide === index ? ' slider-active' : (prevSlide === index ? ' s--prev' : ""))}
                            key={slide.title}
                        >
                            <div className="slider-slide-content">
                                <h3 className="slider-slide-subheading">{slide.content || slide.title}</h3>
                                <h2 className="slider-slide-heading">
                                    {slide.title.split('').map((l, charIndex) => <span key={charIndex}>{l}</span>)}
                                </h2>
                                <p className="slider-slide-readmore">阅读文章</p>
                            </div>
                            <div className="slider-slide-parts">
                                {[...Array(this.IMAGE_PARTS).fill()].map((x, i) => (
                                    <div className="slider-slide-part" key={i}>
                                        <div className="slider-slide-part-inner" style={{ backgroundImage: `url(${slide.imgSrc})` }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider-control" onClick={() => this.changeSlides(-1)} />
                <div className="slider-control slider-control-right" onClick={() => this.changeSlides(1)} />
            </div>
        );
    }
}

const defaultSlides = [
    {
        title: 'Paris',
        content: 'France',
        imgSrc: SliderDefault1,
    },
    {
        title: 'Singapore',
        imgSrc: SliderDefault2,
    },
    {
        title: 'Prague',
        content: 'Czech Republic',
        imgSrc: SliderDefault3,
    }
];

CitiesSlider.defaultProps = {
}

export default CitiesSlider;