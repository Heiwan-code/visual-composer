import React, { Component } from 'react'
import { gsap } from 'gsap';
import dummyData from './assets/data/data_01.json'

export default class List extends Component {



  

  
  constructor(props) {
    super(props)

    const listItems = []
    console.log(dummyData.data.length)
    dummyData.data.forEach((dataItem,index) => {
      const rows = [];
      Object.keys(dataItem).forEach((key) => {
        if (props.infoToRender.includes(key)) {
          let element;
          let CustomTag = dataItem[key].htmlTag
          const customAttrs = dataItem[key].attributes
          const customClass = `list-item__${dataItem[key].className}`
          const customContent = dataItem[key].content
          if (dataItem[key].hasOwnProperty('singleTag') && dataItem[key].singleTag == true) {
            element = <CustomTag {...customAttrs}
            className={customClass}/>
          } else {
            element = <CustomTag {...customAttrs}
            className={customClass}>{customContent}</CustomTag>
          }
          rows.push(element)
        }
      })
      let gsapTimeline = gsap.timeline({ paused: false })
      gsapTimeline.reversed(true);
      let id = index * 100
      listItems.push({
        id:id,
        show: true,
        gsapTimeline: gsapTimeline,
        html: rows
        })
    })
    console.log(listItems)
    this.state = {
      listItemsAll: listItems
    }
  }
  togglePost(id) {
    const post = this.state.listItemsAll.find(obj => obj.id === id);
    if (!post.show) {
      post.gsapTimeline.reverse().then(() => {
        post.show = !post.show
        let newState = this.state.listItemsAll
        console.log(newState)
        this.setState({listItemsAll: newState})
      })
    } else {
      post.show = !post.show
      let newState = this.state.listItemsAll
      console.log(newState)
      this.setState({listItemsAll: newState})
      post.gsapTimeline.to(`#post-${post.id} .list-item__indicator`, {
        width: '100%',
        opacity: 0.8,
        duration: 0.55,
        ease: 'Linear.easeNone'
      }).then(() => {
        post.gsapTimeline.to(`#post-checked-${post.id}`, {
          width: 'fit-content',
          opacity: 1,
          duration: 0.55,
          marginRight: '3px',
          ease: 'Linear.easeNone'
        })
        post.gsapTimeline.to(`#post-${post.id}`, 
        {
          height: '1px',
          duration: 0.6,
          ease: 'Linear.easeNone'
        })
      })
      post.gsapTimeline.reversed(!post.gsapTimeline.reversed());
    }
  }
  render() {
    return (
      <div className='main-wrap'>
        <div className='list list--secondary'>
          <div className='list--secondary__wrapper'>

            {this.state.listItemsAll.map((listItem) => {
              const  item = 
              <div className={`list-item ${!listItem.show ? 'show' : ''}`} id={`post-checked-${listItem.id}`} onClick={() => this.togglePost(listItem.id)}>
                <p className='list-item__post-nr text--medium'>{listItem.id}</p>
              </div>
              return item
            })}

          </div>
        </div>
        <div className='list list--primary' >
          {this.state.listItemsAll.map((listItem) => {
            const item = 
            <div className={`list-item ${listItem.show ? 'show' : ''}`} id={`post-${listItem.id}`} onClick={() => this.togglePost(listItem.id)}>
              <div className='list-item__indicator'> <p>{listItem.show}</p></div>
              <div className='list-item__container'>
                
                {listItem.html}
              </div>
            </div>
            return item
          })}
        </div>
      </div>
    )
  }
}
