import React, { Component } from 'react'

class SuTabItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDragging: props.isDragging,
            x: 0
        }
        this.defaultStyle = {
            padding: '10px 20px',
            display: 'inline-block',
            border: '1px solid grey',
            userSelect: 'none'
        }
        this.dragTab = this.dragTab.bind(this)
        this.dragTabMove = this.dragTabMove.bind(this)
        this.dragTabUp = this.dragTabUp.bind(this)
    }
    
        
    render() {
        let { tabClass, value, label  } = this.props
        if(tabClass) {
            return <div ref={tab => { this.self = tab }} className={tabClass} key={value} onMouseDown={this.dragTab} style={{
                left: this.state.x+'px',
                position: this.state.isDragging ? 'absolute' : 'initial'
            }}>{label}</div>
        } else {
            return <div style={this.defaultStyle} key={value}>{label}</div>
        }
    }

    componentDidMount() {
        document.body.addEventListener('mousemove', this.dragTabMove)
        document.body.addEventListener('mouseup', this.dragTabUp)
    }
    
    dragTab(e) {
        this.maxwidth = e.currentTarget.parentElement.offsetWidth
        this.minwidth = e.currentTarget.parentElement.offsetLeft
        this.setState({ isDragging: true, x: this.self.offsetLeft })
    }

    dragTabMove(e) {
        if(this.state.isDragging) {
            if(!(this.self.offsetLeft+this.self.offsetWidth >= this.maxwidth && e.movementX > 0) && !(this.self.offsetLeft <= this.minwidth && e.movementX < 0))
                    var deltaX = this.self.offsetLeft + e.movementX
                    this.setState({
                        x: deltaX
                    })
        }
    }

    dragTabUp(e) {
        this.setState({ isDragging: false, x: 0 })
    }
}


export default SuTabItem