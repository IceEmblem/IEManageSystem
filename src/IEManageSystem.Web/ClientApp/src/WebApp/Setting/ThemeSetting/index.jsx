import React from 'react'
import { Button } from 'antd'
import {Theme} from 'ice-common'

import red from './red.png'
import volcano from './volcano.png'
import orange from './orange.png'
import gold from './gold.png'
import yellow from './yellow.png'
import lime from './lime.png'
import green from './green.png'
import cyan from './cyan.png'
import blue from './blue.png'
import geekblue from './geekblue.png'
import purple from './purple.png'
import magenta from './magenta.png'
import defaultColor from './default.png'

const dataList = [
    { img: red, onClick: Theme.applyRed },
    { img: volcano, onClick: Theme.applyVolcano },
    { img: orange, onClick: Theme.applyOrange },
    { img: gold, onClick: Theme.applyGold },
    { img: yellow, onClick: Theme.applyYellow },
    { img: lime, onClick: Theme.applyLime },
    { img: green, onClick: Theme.applyGreen },
    { img: cyan, onClick: Theme.applyCyan },
    { img: blue, onClick: Theme.applyBlue },
    { img: geekblue, onClick: Theme.applyGeekBlue },
    { img: purple, onClick: Theme.applyPurple },
    { img: magenta, onClick: Theme.applyMagenta },
]

export default class ThemeSetting extends React.Component {
    render() {
        return <div className='d-flex flex-wrap bg-white pt-3 pb-3' style={{ overflow: 'hidden' }}>
            {
                dataList.map(item => (
                    <div className='col-md-3'>
                        <img width='100%' src={item.img} alt="" />
                        <div className='mt-1'>
                            <Button type='primary' onClick={() => {
                                item.onClick();
                                document.location.reload()
                            }} >应用主题</Button>
                        </div>
                    </div>
                ))
            }
            <div className='col-md-9 mt-3'>
                <img width='100%' src={defaultColor} alt="" />
                <div className='mt-1'>
                    <Button type='primary' onClick={() => {
                        Theme.applyDefault();
                        document.location.reload()
                    }} >应用默认主题（跟随系统）</Button>
                </div>
            </div>
        </div>
    }
}