import React from 'react'
import IComponent from 'IETemplateComponents/IEVideo/IComponent'
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import './index.css'

class Component extends IComponent {
    player = undefined;
    ele = undefined;

    state = {
        height: undefined
    }

    componentDidMount(){
        let setting = this.getCurrentSetting();

        if(setting.loopPlay == 'true'){
            this.player.subscribeToStateChange((state, prevState)=>{
                if(state.ended){
                    this.player.play();
                }
            })
        }

        if(setting.customizeHeight == 'true'){
            setTimeout(()=>{
                this.setState({height: this.ele.clientHeight});
            }, 0);
        }
    }

    render() {
        let data = this.getCurrentData();
        let setting = this.getCurrentSetting();

        return <div ref={e=>{this.ele = e}} style={{overflow: 'hidden', height: '100%'}} className={setting.hiddenTool == 'true' && 'ievideo-control-hidden'}>
            <Player
                ref={c => {
                    this.player = c;
                }}
                autoPlay={setting.autoPlay == 'true'}
                poster={data.img}
                fluid={setting.customizeHeight == 'false'}
                height={this.state.height}
            >
                <source src={data.url} />
                <source src={data.url2} />
            </Player>
        </div>
    }
}

export default Component;
